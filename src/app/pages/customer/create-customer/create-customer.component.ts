import {Component, OnInit} from '@angular/core';
import {
  OwerpAutoCompleteDataModel, OwerpEnumDataModel,
  OwerpFormFieldSize,
  OwerpFormFieldType,
  OwerpFormModel, OwerpLabelValueModel
} from '../../../@control/form/owerp-form.model';
import {CustomerService} from '../customer.service';
import {PaymentTermsService} from '../../master-data/payment-terms/payment-terms.service';
import {PaymentMethodService} from '../../master-data/payment-method/payment-method.service';
import {LedgerService} from '../../ledger/ledger.service';
import {CustomerTypeService} from '../../customer-type/customer-type.service';
import {ApiResponse} from '../../../model/api-model';
import {ActivatedRoute, Router} from '@angular/router';
import {UserMessageService} from '../../../services/user-message.service';

@Component({
  selector: 'ngx-owerp-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  public fields: OwerpFormModel[] = [
    {
      name: 'customerType',
      label: 'Type',
      type: OwerpFormFieldType.AUTOCOMPLETE,
      required: true,
      canEdit: true,
      valueChange: this.loadCustomerNumber.bind(this),
      autoComplete: {value: 'id', label: 'Name'}
    },
    {name: 'customerCode', label: 'Code', type: OwerpFormFieldType.TEXT, required: true, canEdit: true},
    {name: 'registerDate', label: 'Registered date', type: OwerpFormFieldType.DATE, required: true, canEdit: true},
    {name: 'status', label: 'Active', type: OwerpFormFieldType.BOOLEAN, required: true, canEdit: true},
    {
      name: 'customerName',
      label: 'Name',
      type: OwerpFormFieldType.TEXT,
      required: true,
      canEdit: true,
      size: OwerpFormFieldSize.MEDIUM
    },
    {
      name: 'nameOnInvoice',
      label: 'Name On Invoice',
      type: OwerpFormFieldType.TEXT,
      required: true,
      canEdit: true,
      size: OwerpFormFieldSize.MEDIUM
    },
    {
      name: 'address',
      label: 'Address',
      type: OwerpFormFieldType.TEXT,
      required: true,
      canEdit: true,
      size: OwerpFormFieldSize.LARGE
    },


    {
      name: 'cpName1',
      label: 'Name (PRINCIPLE OFFICER)',
      type: OwerpFormFieldType.TEXT,
      required: true,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'cpPhoneNo1',
      label: 'Phone No',
      type: OwerpFormFieldType.TEXT,
      required: true,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'cpMobileNo1',
      label: 'Mobile No',
      type: OwerpFormFieldType.TEXT,
      required: true,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'cpEmailNo1',
      label: 'E-Mail',
      type: OwerpFormFieldType.TEXT,
      required: true,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL
    },

    {
      name: 'cpName2',
      label: 'Name (OTHER OFFICER)',
      type: OwerpFormFieldType.TEXT,
      required: true,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'cpPhoneNo2',
      label: 'Phone No',
      type: OwerpFormFieldType.TEXT,
      required: true,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'cpMobileNo2',
      label: 'Mobile No',
      type: OwerpFormFieldType.TEXT,
      required: true,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'cpEmailNo2',
      label: 'E-Mail',
      type: OwerpFormFieldType.TEXT,
      required: true,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL
    },

    {
      name: 'vatNo',
      label: 'VAT Reg No.',
      type: OwerpFormFieldType.TEXT,
      required: false,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'svatNo',
      label: 'SVAT No.',
      type: OwerpFormFieldType.TEXT,
      required: false,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'businessRegNo',
      label: 'Business Reg No.',
      type: OwerpFormFieldType.TEXT,
      required: false,
      canEdit: true,
      size: OwerpFormFieldSize.MEDIUM
    },
    {
      name: 'paymentTerms',
      label: 'Payments Terms',
      type: OwerpFormFieldType.AUTOCOMPLETE,
      required: false,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL,
      autoComplete: {value: 'id', label: 'Name'}
    },
    {
      name: 'paymentMethod',
      label: 'Payments Methods',
      type: OwerpFormFieldType.AUTOCOMPLETE,
      required: false,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL,
      autoComplete: {value: 'id', label: 'Name'}
    },
    {
      name: 'controlAccount',
      label: 'Ledger control account',
      type: OwerpFormFieldType.AUTOCOMPLETE,
      required: false,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL,
      autoComplete: {value: 'id', label: 'Name'}
    },
    {
      name: 'invoiceType',
      label: 'Invoice Type',
      type: OwerpFormFieldType.RADIO,
      required: false,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL
    }

  ];

  private customerId: string | undefined = undefined;
  public data: any = {status: true};
  public patchData: any = {};
  public autoCompleteData: OwerpAutoCompleteDataModel = {};
  public enumDataModel: OwerpEnumDataModel = {
    invoiceType: [
      {
        value: 'COMMERCIAL',
        label: 'Commercial'
      },
      {
        value: 'TAX',
        label: 'Tax'
      },
      {
        value: 'SVAT',
        label: 'SVAT'
      },
      {
        value: 'NORMAL',
        label: 'Normal'
      }
    ]
  };

  public mode: string = 'create';

  constructor(private service: CustomerService,
              private customerTypeService: CustomerTypeService,
              private paymentTermsService: PaymentTermsService,
              private paymentMethodsService: PaymentMethodService,
              private ledgerService: LedgerService,
              private router: Router,
              private route: ActivatedRoute,
              private ums: UserMessageService) {
  }

  ngOnInit(): void {


    if (this.route.snapshot.data['mode']) {
      this.mode = this.route.snapshot.data['mode'];
    }

    if (this.mode === 'edit') {
      this.customerId = this.route.snapshot.paramMap.get('id');
      this.loadCustomerData(this.customerId);
    }


    this.loadCustomerTypeData();
    this.loadPaymentMethodsData();
    this.loadPaymentTermsData();
    this.loadLedgerData();
  }

  // <editor-fold desc="Load Auto Complete Data">
  public loadCustomerTypeData(): void {
    this.customerTypeService.getAllActive().subscribe(
      (res: ApiResponse) => {
        this.updateAutoCompleteDataModel('customerType', this.customerTypeService.getAutoCompleteData(res.data));
      }
    );
  }

  public loadPaymentTermsData(): void {
    this.paymentTermsService.fetchAllActive().subscribe(
      (res: ApiResponse) => {
        this.updateAutoCompleteDataModel('paymentTerms', this.paymentTermsService.getAutoCompleteData(res.data));
      }
    );
  }

  public loadPaymentMethodsData(): void {
    this.paymentMethodsService.fetchAllActive().subscribe(
      (res: ApiResponse) => {
        this.updateAutoCompleteDataModel('paymentMethod', this.paymentMethodsService.getAutoCompleteData(res.data));
      }
    );
  }

  public loadLedgerData(): void {
    this.ledgerService.fetchActive().subscribe(
      (res: ApiResponse) => {
        this.updateAutoCompleteDataModel(
          'controlAccount',
          this.ledgerService.getLedgerAccountAutoCompleteData(res.data));
      }
    );
  }

  private updateAutoCompleteDataModel(name: string, data: OwerpLabelValueModel[]): void {
    const model: OwerpAutoCompleteDataModel = this.autoCompleteData;
    model[name] = data;
    this.autoCompleteData = Object.assign({}, this.autoCompleteData);
  }

  // </editor-fold>

  public saveCustomer(data: any): void {

    if (this.mode === 'create') {
      this.service.create(data).subscribe(
        (res: ApiResponse) => {
          this.ums.success(`New Customer ${res.data['customerName']} created successfully.`);
          this.cancel();
        }
      );
    } else {
      this.service.update(this.customerId, data).subscribe(
        (res: ApiResponse) => {
          this.ums.success(`Customer ${res.data['customerName']} saved successfully.`);
          this.cancel();
        }
      );
    }
  }

  public cancel(): void {
    this.router.navigateByUrl('/pages/customers');
  }

  private loadCustomerNumber(data: any): void {
    const customerId: string = this.customerId !== undefined ? this.customerId : '0';
    this.service.fetchCustomerCode(customerId, data).subscribe(
      (res: ApiResponse) => {
        const formData: any = {};
        formData['customerCode'] = res.data['customerCode'];
        this.patchData = formData;
      }
    );
  }

  public loadCustomerData(customerId: string): void {
    this.service.fetch(customerId).subscribe(
      (res: ApiResponse) => {
        this.data = res.data;
      }
    );
  }


}
