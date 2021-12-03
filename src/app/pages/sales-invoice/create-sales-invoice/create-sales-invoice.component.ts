import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  OwerpAutoCompleteDataModel,
  OwerpEnumDataModel,
  OwerpFormFieldSize,
  OwerpFormFieldType,
  OwerpFormModel
} from '../../../@control/form/owerp-form.model';
import {NbStepperComponent} from '@nebular/theme';
import {CustomerTypeService} from '../../customer-type/customer-type.service';
import {ApiResponse} from '../../../model/api-model';
import {PaymentTermsService} from '../../master-data/payment-terms/payment-terms.service';
import {CostCenterService} from '../../master-data/cost-center/cost-center.service';

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
      required: true,
      canEdit: true
    },
    {name: 'customer', type: OwerpFormFieldType.TEXT, label: 'Customer', required: true, canEdit: true},
    {name: 'invoiceNo', type: OwerpFormFieldType.TEXT, label: 'Invoice No', required: true, canEdit: true},
    {name: 'invoiceDate', type: OwerpFormFieldType.DATE, label: 'Invoice Date', required: true, canEdit: true},
    {name: 'poNo', type: OwerpFormFieldType.TEXT, label: 'P.O No', required: true, canEdit: true},
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

  public data: any = {};

  @ViewChild('createSaleInvoiceStepper')
  public stepper: NbStepperComponent;

  secondForm: FormGroup;
  thirdForm: FormGroup;

  constructor(private fb: FormBuilder,
              private customerTypeService: CustomerTypeService,
              private paymentTermService: PaymentTermsService,
              private costCenterService: CostCenterService) {
  }

  ngOnInit() {

    this.secondForm = this.fb.group({
      secondCtrl: ['', Validators.required]
    });

    this.thirdForm = this.fb.group({
      thirdCtrl: ['', Validators.required]
    });

    this.loadCustomerTypeData();
    this.loadPaymentTermsData();
    this.loadCostCenterData();
  }


  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }

  onThirdSubmit() {
    this.thirdForm.markAsDirty();
  }

  public addCustomer(data: any): void {
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

  public loadPaymentTermsData(): void {
    this.paymentTermService.fetchAllActive().subscribe(
      (res: ApiResponse) => {
        this.stepOneAutocompleteData['paymentTerms'] = this.paymentTermService.getAutoCompleteData(res.data);
        this.stepOneAutocompleteData = Object.assign({}, this.stepOneAutocompleteData);
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

}
