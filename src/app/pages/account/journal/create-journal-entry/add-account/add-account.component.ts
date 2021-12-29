import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {
  OwerpAutoCompleteDataModel,
  OwerpEnumDataModel,
  OwerpFormFieldType,
  OwerpFormModel, OwerpLabelValueModel
} from '../../../../../@control/form/owerp-form.model';
import {ApiResponse} from '../../../../../model/api-model';
import {CostCenterService} from '../../../../master-data/cost-center/cost-center.service';
import {LedgerService} from '../../../../ledger/ledger.service';
import {CustomerService} from '../../../../customer/customer.service';
import {SupplierService} from '../../../../supplier/supplier.service';
import {JournalAccount} from '../../journal.model';
import {UserMessageService} from '../../../../../services/user-message.service';

@Component({
  selector: 'ngx-owerp-journal-entry-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {

  @Input()
  public id: number;

  public fields: OwerpFormModel[] = [
    {
      name: 'ledgerCategory',
      label: 'Ledger Category',
      required: true,
      canEdit: true,
      type: OwerpFormFieldType.AUTOCOMPLETE,
      autoComplete: 'id'
    },
    {
      name: 'ledgerAccount',
      label: 'Ledger Account',
      required: true,
      canEdit: true,
      type: OwerpFormFieldType.AUTOCOMPLETE,
      autoComplete: 'id'
    },
    {
      name: 'debitAmount',
      label: 'Debit Amount',
      required: false,
      canEdit: true,
      type: OwerpFormFieldType.NUMBER
    },
    {
      name: 'creditAmount',
      label: 'Credit Amount',
      required: false,
      canEdit: true,
      type: OwerpFormFieldType.NUMBER
    },
    {
      name: 'memo',
      label: 'Memo',
      required: false,
      canEdit: true,
      type: OwerpFormFieldType.TEXT
    },
    {
      name: 'costCenter',
      label: 'Cost Center',
      required: true,
      canEdit: true,
      type: OwerpFormFieldType.AUTOCOMPLETE,
      autoComplete: 'id'
    },
    {
      name: 'personType',
      label: 'Person Type',
      required: true,
      canEdit: true,
      type: OwerpFormFieldType.RADIO,
      valueChange: this.onPersonTypeChange.bind(this)
    },
    {
      name: 'person',
      label: 'Person',
      required: false,
      type: OwerpFormFieldType.AUTOCOMPLETE,
      canEdit: true
    }
  ];
  public data: any = {};
  public autoCompleteData: OwerpAutoCompleteDataModel = {};
  public personType: OwerpEnumDataModel = {
    personType: [
      {label: 'None', value: 'NONE'},
      {label: 'Customer', value: 'CUSTOMER'},
      {label: 'Supplier', value: 'SUPPLIER'}
    ]
  };

  public showPerson: boolean = false;

  constructor(private dialogRef: NbDialogRef<AddAccountComponent>,
              private costCenterService: CostCenterService,
              private ledgerService: LedgerService,
              private customerService: CustomerService,
              private supplierService: SupplierService,
              private userMessageService: UserMessageService) {
  }

  ngOnInit(): void {
    this.loadCostCenterData();
    this.loadActiveLedgerCategories();
    this.loadLedgerAccountData();
  }

  private loadCostCenterData(): void {
    this.costCenterService.fetchActive().subscribe(
      (res: ApiResponse) => {
        this.autoCompleteData['costCenter'] = this.costCenterService.getAutoCompleteData(res.data);
        this.autoCompleteData = Object.assign({}, this.autoCompleteData);
      }
    );
  }

  private loadLedgerAccountData(): void {
    this.ledgerService.fetchActive().subscribe(
      (res: ApiResponse) => {
        this.autoCompleteData['ledgerAccount'] = this.ledgerService.getLedgerAccountAutoCompleteData(res.data);
        this.autoCompleteData = Object.assign({}, this.autoCompleteData);
      }
    );
  }

  public loadActiveLedgerCategories(): void {
    this.ledgerService.fetchActiveLedgerCategories().subscribe(
      (res: ApiResponse) => {
        this.autoCompleteData['ledgerCategory'] = this.ledgerService.getLedgerAccountCategoryAutoCompleteData(res.data);
        this.autoCompleteData = Object.assign({}, this.autoCompleteData);
      }
    );
  }

  private onPersonTypeChange(data: any, state?: any): void {
    // this.showPerson = true;
    // if (data === 'CUSTOMER') {
    //   this.loadCustomers();
    // } else if (data === 'SUPPLIER') {
    //   this.loadSuppliers();
    // } else {
    //   this.showPerson = false;
    // }
  }

  private loadCustomers(): void {
    this.customerService.fetchAllActive().subscribe(
      (res: ApiResponse) => {
        this.autoCompleteData['person'] = this.customerService.getAutoCompleteData(res.data);
        this.autoCompleteData = Object.assign({}, this.autoCompleteData);
      }
    );
  }

  private loadSuppliers(): void {
    this.supplierService.fetchAllActive().subscribe(
      (res: ApiResponse) => {
        this.autoCompleteData['person'] = this.supplierService.getAutoCompleteData(res.data);
        this.autoCompleteData = Object.assign({}, this.autoCompleteData);
      }
    );
  }

  public onSave(data: any): void {

    if (!data['creditAmount'] && !data['debitAmount']) {
      this.userMessageService.warning('Either Credit Amount or Debit Amount Must Be Entered.');
      return;
    }

    const account: JournalAccount = {
      id: this.id,
      ledgerCategory: this.getAutoCompleteEntry('ledgerCategory', data['ledgerCategory']),
      ledgerAccount: this.getAutoCompleteEntry('ledgerAccount', data['ledgerAccount']),
      debitAmount: data['debitAmount'],
      creditAmount: data['creditAmount'],
      memo: data['memo'],
      costCenter: this.getAutoCompleteEntry('costCenter', data['costCenter']),
      personType: this.personType['personType'].find((v: OwerpLabelValueModel) => v.value === data['personType']),
      person: data['personType'] !== 'NONE' ? this.getAutoCompleteEntry('person', data['person']) : null
    };
    this.dialogRef.close(account);
  }

  private getAutoCompleteEntry(field: string, idObj: object): OwerpLabelValueModel {
    const values: OwerpLabelValueModel[] = this.autoCompleteData[field];
    return values.find((v: OwerpLabelValueModel) => v.value === idObj['id']);
  }

  public onCancel(): void {
    this.dialogRef.close();
  }


}
