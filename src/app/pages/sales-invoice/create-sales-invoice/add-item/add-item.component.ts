import {Component, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {
  OwerpAutoCompleteDataModel,
  OwerpFormFieldSize,
  OwerpFormFieldType,
  OwerpFormModel, OwerpLabelValueModel
} from '../../../../@control/form/owerp-form.model';
import {CreateSalesInvoiceService} from '../create-sales-invoice.service';
import {OwerpFormHelper} from '../../../../@control/form/owerp-form-helper';
import {SalesInvoiceItem} from '../sales-invoice.model';
import {SalesInvoiceService} from '../../sales-invoice.service';
import {ApiResponse} from '../../../../model/api-model';

@Component({
  selector: 'ngx-owerp-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  public fields: OwerpFormModel[] = [
    {
      name: 'item',
      label: 'Item',
      type: OwerpFormFieldType.AUTOCOMPLETE,
      required: true,
      autoComplete: 'id',
      canEdit: true,
      size: OwerpFormFieldSize.SMALL,
      valueChange: this.setItem.bind(this)
    },
    {
      name: 'description',
      label: 'Description',
      type: OwerpFormFieldType.TEXT,
      required: true,
      canEdit: true,
      size: OwerpFormFieldSize.MEDIUM
    },
    {
      name: 'unitAmount',
      label: 'Unit Amount',
      type: OwerpFormFieldType.NUMBER,
      required: true,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL,
      valueChange: this.setAmount.bind(this)
    },
    {
      name: 'amount',
      label: 'Amount',
      canEdit: false,
      type: OwerpFormFieldType.NUMBER
    },
    {
      name: 'tax',
      label: 'Tax',
      type: OwerpFormFieldType.AUTOCOMPLETE,
      required: true,
      autoComplete: 'id',
      canEdit: true,
      size: OwerpFormFieldSize.SMALL,
      valueChange: this.setTaxAmount.bind(this)

    },
    {
      name: 'taxAmount',
      label: 'Tax Amount',
      type: OwerpFormFieldType.TEXT,
      canEdit: false,
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'costCenter',
      label: 'Cost Center',
      type: OwerpFormFieldType.AUTOCOMPLETE,
      required: true,
      autoComplete: 'id',
      canEdit: true,
      size: OwerpFormFieldSize.SMALL
    }
  ];

  public data: any = {};
  public patchData: any;
  public autoCompleteData: OwerpAutoCompleteDataModel = {};

  private taxGroup: { id: number } = {id: 0};
  private unitAmount: number;

  private taxAmount: number;
  private amount: number;

  constructor(private ref: NbDialogRef<AddItemComponent>,
              private service: CreateSalesInvoiceService,
              private invoiceService: SalesInvoiceService) {
  }

  ngOnInit(): void {
    OwerpFormHelper.updateAutoCompleteDataModel('item', this.service.itemsData, this.autoCompleteData);
    OwerpFormHelper.updateAutoCompleteDataModel('tax', this.service.taxData, this.autoCompleteData);
    OwerpFormHelper.updateAutoCompleteDataModel('costCenter', this.service.costCenterData, this.autoCompleteData);
  }

  public cancel(): void {
    this.ref.close();
  }

  public addItem(data: any): void {
    if (data !== undefined) {
      const item: SalesInvoiceItem = {
        item: this.getValue('item', data['item']),
        costCenter: this.getValue('costCenter', data['costCenter']),
        tax: this.getValue('tax', data['tax']),
        description: data['description'],
        taxAmount: data['taxAmount'],
        amount: data['amount'],
        unitAmount: data['unitAmount']
      };
      this.ref.close(item);
    } else {
      this.ref.close(data);
    }
  }

  private getValue(name: string, obj: any): OwerpLabelValueModel {
    const id: string = obj['id'];
    const arr: OwerpLabelValueModel[] = this.autoCompleteData[name];
    return arr.find((m: OwerpLabelValueModel) => m.value === id);
  }

  private setItem(data: any, formData: any): void {
    // this.amount = data;
    this.fetchItemAmount(formData);
  }

  private setAmount(data: any, formData: any): void {
    this.amount = data;
    this.fetchItemAmount(formData);
  }

  private setTaxAmount(value: any, formData: any): void {
    this.taxGroup = {id: +value};
    this.fetchItemAmount(formData);
  }

  private fetchItemAmount(formData: any): void {

    const dto: any = {
      customerItem: {id: +formData['item']},
      amount: +formData['unitAmount'],
      taxGroup: this.taxGroup
    };
    this.invoiceService.fetchCustomerItemAmount(dto).subscribe(
      (res: ApiResponse) => {
        this.amount = res.data['amount'];
        this.taxAmount = res.data['taxAmount'];

        this.patchData = {
          amount: this.amount,
          taxAmount: this.taxAmount
        };
      }
    );

  }
}

