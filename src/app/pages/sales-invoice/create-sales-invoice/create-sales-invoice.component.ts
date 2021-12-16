import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  OwerpAutoCompleteDataModel,
  OwerpEnumDataModel,
  OwerpFormFieldSize,
  OwerpFormFieldType,
  OwerpFormModel
} from '../../../@control/form/owerp-form.model';
import {NbDialogService, NbStepperComponent} from '@nebular/theme';
import {CustomerTypeService} from '../../customer-type/customer-type.service';
import {ApiResponse} from '../../../model/api-model';
import {PaymentTermsService} from '../../master-data/payment-terms/payment-terms.service';
import {CostCenterService} from '../../master-data/cost-center/cost-center.service';
import {CustomerService} from '../../customer/customer.service';
import {OwerpFormHelper} from '../../../@control/form/owerp-form-helper';
import {OwerpSelectionMode, OwerpTableColumns, OwerpTableColumnType} from '../../../@control/table/owerp-table.model';
import {AddItemComponent} from './add-item/add-item.component';
import {filter} from 'rxjs/operators';
import {CreateSalesInvoiceService} from './create-sales-invoice.service';
import {SalesInvoiceItem} from './sales-invoice.model';
import {SalesInvoiceService} from '../sales-invoice.service';
import {OwerpActionModel} from '../../../@control/action/owerp-action.model';
import {UserMessageService} from '../../../services/user-message.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-owerp-create-sales-invoice',
  templateUrl: './create-sales-invoice.component.html',
  styleUrls: ['./create-sales-invoice.component.css']
})
export class CreateSalesInvoiceComponent implements OnInit {

  @ViewChild('createSaleInvoiceStepper')
  public stepper: NbStepperComponent;


  //region Customer (Step 1)
  public customerFields: OwerpFormModel[] = [
    {
      name: 'customerType',
      type: OwerpFormFieldType.AUTOCOMPLETE,
      label: 'Customer Type',
      required: true,
      canEdit: true,
      valueChange: this.loadInvoiceNo.bind(this)
    },
    {
      name: 'customer',
      type: OwerpFormFieldType.AUTOCOMPLETE,
      label: 'Customer',
      required: true,
      canEdit: true,
      autoComplete: 'id'
    },
    {name: 'invoiceNumber', type: OwerpFormFieldType.TEXT, label: 'Invoice No', required: true, canEdit: true},
    {name: 'invoiceDate', type: OwerpFormFieldType.DATE, label: 'Invoice Date', required: true, canEdit: true},
    {name: 'poNumber', type: OwerpFormFieldType.TEXT, label: 'P.O No', required: true, canEdit: true},
    {
      name: 'paymentTerms',
      type: OwerpFormFieldType.AUTOCOMPLETE,
      label: 'Payment Terms',
      required: true,
      canEdit: true
    },
    {
      name: 'invoiceAddress',
      type: OwerpFormFieldType.TEXT,
      label: 'Invoice Address',
      required: true,
      canEdit: true,
      size: OwerpFormFieldSize.MEDIUM
    },
    {name: 'memo', type: OwerpFormFieldType.TEXT, label: 'Memo', required: true, canEdit: true},
    {name: 'costCenter', type: OwerpFormFieldType.AUTOCOMPLETE, label: 'Cost Center', required: true, canEdit: true},
    {
      name: 'invoiceType', type: OwerpFormFieldType.RADIO, label: 'Invoice Type', canEdit: true, required: true
    }
  ];
  public stepOneAutocompleteData: OwerpAutoCompleteDataModel = {};
  public stepOneEnumData: OwerpEnumDataModel = {
    invoiceType: [{value: 'COMMERCIAL', label: 'Commercial'}, {value: 'TAX', label: 'Tax'}, {
      value: 'SVAT',
      label: 'SVAT'
    }, {value: 'NORMAL', label: 'Normal'}]
  };

  public customerData: any = {};
  public patchData: any = {};
  //endregion

  //region Items (Step 2)
  public itemTableCols: OwerpTableColumns = {
    item: {title: 'Item', type: OwerpTableColumnType.TEXT},
    description: {title: 'Description', type: OwerpTableColumnType.TEXT},
    unitAmount: {title: 'Unit Amount', type: OwerpTableColumnType.TEXT},
    amount: {title: 'Amount', type: OwerpTableColumnType.TEXT},
    tax: {title: 'Tax', type: OwerpTableColumnType.TEXT},
    taxAmount: {title: 'Tax  Amount', type: OwerpTableColumnType.TEXT},
    costCenter: {title: 'Cost Center', type: OwerpTableColumnType.TEXT}
  };
  public itemTableSelectionMode: OwerpSelectionMode = OwerpSelectionMode.MULTI;
  public itemTableActions: OwerpActionModel[] = [
    {
      name: 'deleteItems',
      mode: OwerpSelectionMode.MULTI,
      status: 'danger',
      icon: 'trash-2-outline',
      execute: this.removeItems.bind(this)
    }
  ];
  public itemSummaryFields: OwerpFormModel[] = [
    {name: 'taxTotalAmount', label: 'Total Amount Without Tax', canEdit: false, type: OwerpFormFieldType.TEXT},
    {name: 'totalAmount', label: 'Total Amount', canEdit: false, type: OwerpFormFieldType.TEXT}
  ];

  public items: any[] = [];
  public presentationalItems: any[] = [];
  public itemSummaryData: any = {};
  private taxList: any[] = [];
  //endregion

  //region Summary (Step 3)
  public invoiceSummaryField: OwerpFormModel[] = [
    {
      name: 'message',
      type: OwerpFormFieldType.TEXT,
      label: 'Message On Invoice',
      canEdit: true,
      size: OwerpFormFieldSize.LARGE
    }
  ];
  public invoiceSummaryData: any = {};

  //endregion

  constructor(private fb: FormBuilder,
              private customerTypeService: CustomerTypeService,
              private customerService: CustomerService,
              private paymentTermService: PaymentTermsService,
              private costCenterService: CostCenterService,
              private nbDialogService: NbDialogService,
              private service: CreateSalesInvoiceService,
              private salesInvoiceService: SalesInvoiceService,
              private ums: UserMessageService,
              private router: Router) {
  }

  ngOnInit() {

    this.loadCustomerTypeData();
    this.loadCustomerData();
    this.loadPaymentTermsData();
    this.loadCostCenterData();

    this.service.refreshData();
  }

  public addCustomer(data: any): void {
    this.customerData = data;
    this.service.loadItems(data['customerType']['id']);
    this.stepper.next();
  }

  public addItem(): void {
    this.nbDialogService.open(AddItemComponent).onClose.pipe(filter((data: any) => data !== undefined)).subscribe(
      (data: SalesInvoiceItem) => {

        const invoiceItem: any = {
          customerItem: {id: data.item.value},
          itemDescription: data.description,
          unitValue: data.unitAmount,
          amount: data.amount,
          taxGroup: {id: data.tax.value},
          taxAmount: data.taxAmount,
          costCenter: {id: data.costCenter.value}
        };

        const obj: any = {
          salesInvoiceItem: invoiceItem,
          taxList: this.taxList
        };
        this.salesInvoiceService.fetchSalesItemDetailsAndTax(obj).subscribe(
          (res: ApiResponse) => {
            const item: SalesInvoiceItem = res.data['salesInvoiceItem'];
            this.items = this.items.concat(item);
            this.updateItemTable();
            this.taxList = res.data['taxList'];
          }
        );

      }
    );
  }

  public removeItems(data: any[]): void {

    const obj: any = {
      salesInvoiceItem: this.items.find((item: any) => item.customerItem.id === data[0].itemId)
    };

    this.salesInvoiceService.removeSalesItemDetailsAndTax(obj).subscribe(
      (res: ApiResponse) => {
        const itemId: number = res.data['salesInvoiceItem']['id'];
        const index: number = this.items.findIndex((i: any) => i.itemId === itemId);
        this.items.splice(index, 1);
        this.updateItemTable();
        this.taxList = res.data['tax'];
      }
    );
  }

  public updateItemTable(): void {
    // let totalAmount: number = 0;
    // let totalTaxAmount: number = 0;

    this.presentationalItems = this.items.map((i: any) => {
      return {
        itemId: i.customerItem.id,
        item: i.customerItem.itemName,
        description: i.itemDescription,
        unitAmount: i.unitValue,
        tax: i.taxGroup.groupCode,
        taxAmount: i.taxAmount,
        costCenter: i.costCenter.name,
        amount: i.amount
      };
    });

    let totalAmount: number = 0;
    let totalTaxAmount: number = 0;

    this.items.forEach(
      (item: SalesInvoiceItem) => {
        totalAmount += (+item.amount);
        totalTaxAmount += (+item.taxAmount);
      }
    );

    // const taxAmount: number = this.taxList.reduce((total: number, tax: any) => total + tax['taxAmount'], 0);
    this.itemSummaryData = {
      totalAmount: totalAmount,
      taxTotalAmount: totalAmount + totalTaxAmount
    };
  }

  public createInvoice(data: any): void {
    this.itemSummaryData = data;
    const invoice: any = {...this.customerData, ...this.invoiceSummaryData, ...this.itemSummaryData};
    invoice['salesInvoiceItems'] = this.items;
    invoice['invoiceTaxDetails'] = this.taxList;

  this.salesInvoiceService.save(invoice).subscribe(
    (res: ApiResponse) => {
      this.ums.success(`New Sales Invoice(${res.data['invoiceNumber']}) Created Successfully.`);
      this.router.navigateByUrl('/pages/sales-invoices');
    }
  );
  }

  public cancelInvoiceSummary(): void {
    this.stepper.previous();
  }

  //region Auto Complete Data Loading
  private loadCustomerTypeData(): void {
    this.customerTypeService.getAllActive().subscribe(
      (res: ApiResponse) => {
        this.stepOneAutocompleteData['customerType'] = this.customerTypeService.getAutoCompleteData(res.data);
        this.stepOneAutocompleteData = Object.assign({}, this.stepOneAutocompleteData);
      }
    );
  }


  private loadCustomerData(): void {
    this.customerService.fetchAllActive().subscribe(
      (res: ApiResponse) => {
        OwerpFormHelper.updateAutoCompleteDataModel(
          'customer',
          this.customerService.getAutoCompleteData(res.data),
          this.stepOneAutocompleteData);
      }
    );
  }

  private loadPaymentTermsData(): void {
    this.paymentTermService.fetchAllActive().subscribe(
      (res: ApiResponse) => {
        OwerpFormHelper.updateAutoCompleteDataModel(
          'paymentTerms',
          this.paymentTermService.getAutoCompleteData(res.data),
          this.stepOneAutocompleteData);
      }
    );
  }

  private loadCostCenterData(): void {
    this.costCenterService.fetchActive().subscribe(
      (res: ApiResponse) => {
        this.stepOneAutocompleteData['costCenter'] = this.costCenterService.getAutoCompleteData(res.data);
        this.stepOneAutocompleteData = Object.assign({}, this.stepOneAutocompleteData);
      }
    );
  }

  private loadInvoiceNo(customerTypeId: string): void {
    this.salesInvoiceService.fetchInvoiceNo(customerTypeId, '0').subscribe(
      (res: ApiResponse) => {
        const newInvoiceNo: string = res.data['salesInvoiceNo'];
        this.patchData = {invoiceNumber: newInvoiceNo};
      }
    );
  }

  //endregion

}
