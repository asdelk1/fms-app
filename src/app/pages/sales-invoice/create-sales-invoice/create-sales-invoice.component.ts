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
import {OwerpTableColumns, OwerpTableColumnType} from '../../../@control/table/owerp-table.model';
import {AddItemComponent} from './add-item/add-item.component';
import {filter} from 'rxjs/operators';
import {CreateSalesInvoiceService} from './create-sales-invoice.service';

@Component({
  selector: 'ngx-owerp-create-sales-invoice',
  templateUrl: './create-sales-invoice.component.html',
  styleUrls: ['./create-sales-invoice.component.css']
})
export class CreateSalesInvoiceComponent implements OnInit {

  public customerFields: OwerpFormModel[] = [
    {
      name: 'customerType',
      type: OwerpFormFieldType.AUTOCOMPLETE,
      label: 'Customer Type',
      required: false,
      canEdit: true
    },
    {
      name: 'customer',
      type: OwerpFormFieldType.AUTOCOMPLETE,
      label: 'Customer',
      required: false,
      canEdit: true,
      autoComplete: 'id'
    },
    {name: 'invoiceNo', type: OwerpFormFieldType.TEXT, label: 'Invoice No', required: false, canEdit: true},
    {name: 'invoiceDate', type: OwerpFormFieldType.DATE, label: 'Invoice Date', required: false, canEdit: true},
    {name: 'poNo', type: OwerpFormFieldType.TEXT, label: 'P.O No', required: false, canEdit: true},
    {
      name: 'paymentTerms',
      type: OwerpFormFieldType.AUTOCOMPLETE,
      label: 'Payment Terms',
      required: false,
      canEdit: true
    },
    {
      name: 'invoiceAddress',
      type: OwerpFormFieldType.TEXT,
      label: 'Invoice Address',
      required: false,
      canEdit: true,
      size: OwerpFormFieldSize.MEDIUM
    },
    {name: 'memo', type: OwerpFormFieldType.TEXT, label: 'Memo', required: false, canEdit: true},
    {name: 'costCenter', type: OwerpFormFieldType.AUTOCOMPLETE, label: 'Cost Center', required: false, canEdit: true},
    {
      name: 'invoiceType', type: OwerpFormFieldType.RADIO, label: 'Invoice Type', canEdit: true, required: false
    }
  ];


  public stepOneAutocompleteData: OwerpAutoCompleteDataModel = {};
  public stepOneEnumData: OwerpEnumDataModel = {
    invoiceType: [{value: 'COMMERCIAL', label: 'Commercial'}, {value: 'TAX', label: 'Tax'}, {
      value: 'SVAT',
      label: 'SVAT'
    }, {value: 'NORMAL', label: 'Normal'}]
  };

  public data: any = {};

  @ViewChild('createSaleInvoiceStepper')
  public stepper: NbStepperComponent;

  secondForm: FormGroup;
  thirdForm: FormGroup;

  public itemTableCols: OwerpTableColumns = {
    item: {title: 'Item', type: OwerpTableColumnType.TEXT},
    description: {title: 'Description', type: OwerpTableColumnType.TEXT},
    unitAmount: {title: 'Unit Amount', type: OwerpTableColumnType.TEXT},
    tax: {title: 'Tax', type: OwerpTableColumnType.TEXT},
    taxAmount: {title: 'Tax  Amount', type: OwerpTableColumnType.TEXT},
    costCenter: {title: 'Cost Center', type: OwerpTableColumnType.TEXT}
  };

  public itemSummaryFields: OwerpFormModel[] = [
    {name: 'totalWithoutTax', label: 'Total Amount Without Tax', canEdit: false, type: OwerpFormFieldType.TEXT},
    {name: 'total', label: 'Total Amount', canEdit: false, type: OwerpFormFieldType.TEXT}
  ];

  public items: any[] = [];
  public itemSummaryData: any = {};


  constructor(private fb: FormBuilder,
              private customerTypeService: CustomerTypeService,
              private customerService: CustomerService,
              private paymentTermService: PaymentTermsService,
              private costCenterService: CostCenterService,
              private nbDialogService: NbDialogService,
              private service: CreateSalesInvoiceService) {
  }

  ngOnInit() {

    this.thirdForm = this.fb.group({
      thirdCtrl: ['', Validators.required]
    });

    this.loadCustomerTypeData();
    this.loadCustomerData();
    this.loadPaymentTermsData();
    this.loadCostCenterData();

    this.service.refreshData();
  }


  onThirdSubmit() {
    this.thirdForm.markAsDirty();
  }

  public addCustomer(data: any): void {
    this.service.loadItems(data['customerType']['id']);
    this.stepper.next();
  }

  public loadCustomerTypeData(): void {
    this.customerTypeService.getAllActive().subscribe(
      (res: ApiResponse) => {
        this.stepOneAutocompleteData['customerType'] = this.customerTypeService.getAutoCompleteData(res.data);
        this.stepOneAutocompleteData = Object.assign({}, this.stepOneAutocompleteData);
      }
    );
  }

  public loadCustomerData(): void {
    this.customerService.fetchAllActive().subscribe(
      (res: ApiResponse) => {
        OwerpFormHelper.updateAutoCompleteDataModel(
          'customer',
          this.customerService.getAutoCompleteData(res.data),
          this.stepOneAutocompleteData);
      }
    );
  }

  public loadPaymentTermsData(): void {
    this.paymentTermService.fetchAllActive().subscribe(
      (res: ApiResponse) => {
        OwerpFormHelper.updateAutoCompleteDataModel(
          'paymentTerms',
          this.paymentTermService.getAutoCompleteData(res.data),
          this.stepOneAutocompleteData);
      }
    );
  }

  public loadCostCenterData(): void {
    this.costCenterService.fetchActive().subscribe(
      (res: ApiResponse) => {
        this.stepOneAutocompleteData['costCenter'] = this.costCenterService.getAutoCompleteData(res.data);
        this.stepOneAutocompleteData = Object.assign({}, this.stepOneAutocompleteData);
      }
    );
  }

  public addItem(): void {
    this.nbDialogService.open(AddItemComponent).onClose.pipe(filter((data: any) => data !== undefined)).subscribe(
      (data: any) => {
        console.log(data);
      }
    );
  }

}
