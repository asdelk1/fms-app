import {Component, OnInit, ViewChild} from '@angular/core';
import {OwerpFormFieldSize, OwerpFormFieldType, OwerpFormModel} from '../../../../@control/form/owerp-form.model';
import {NbDialogService, NbStepperComponent} from '@nebular/theme';
import {AccountService} from '../../account.service';
import {ApiResponse} from '../../../../model/api-model';
import {
  OwerpSelectionMode,
  OwerpTableColumns,
  OwerpTableColumnType
} from '../../../../@control/table/owerp-table.model';
import {AddAccountComponent} from './add-account/add-account.component';
import {filter} from 'rxjs/operators';
import {UserMessageService} from '../../../../services/user-message.service';
import {OwerpActionModel} from '../../../../@control/action/owerp-action.model';
import {Router} from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'ngx-owerp-create-journal-entry',
  templateUrl: './create-journal-entry.component.html',
  styleUrls: ['./create-journal-entry.component.css']
})
export class CreateJournalEntryComponent implements OnInit {

  @ViewChild('stepper')
  public stepper: NbStepperComponent;

  //region Entry Details (1st Step)
  public entryDetailFields: OwerpFormModel[] = [
    {
      name: 'entryNumber',
      label: 'Entry Number',
      type: OwerpFormFieldType.TEXT,
      canEdit: false,
      size: OwerpFormFieldSize.MEDIUM
    },
    {
      name: 'entryDate',
      label: 'Entry Date',
      type: OwerpFormFieldType.DATE,
      canEdit: true,
      required: true,
      size: OwerpFormFieldSize.MEDIUM
    },
    {
      name: 'note',
      label: 'Note',
      type: OwerpFormFieldType.TEXT,
      canEdit: true,
      size: OwerpFormFieldSize.LARGE
    }
  ];
  public detailData: any = {};
  //endregion

  //region Account Details (2nd Step)
  public accountColumns: OwerpTableColumns = {
    ledgerAccount: {title: 'Ledger Account', type: OwerpTableColumnType.TEXT},
    details: {title: 'Memo', type: OwerpTableColumnType.TEXT},
    debit: {title: 'Debit', type: OwerpTableColumnType.TEXT},
    credit: {title: 'Credit', type: OwerpTableColumnType.TEXT},
    person: {title: 'Person', type: OwerpTableColumnType.TEXT},
    costCenter: {title: 'Cost Center', type: OwerpTableColumnType.TEXT}
  };
  public accountTableActions: OwerpActionModel[] = [
    {
      name: 'removeAccount',
      icon: 'trash-2-outline',
      status: 'danger',
      mode: OwerpSelectionMode.SINGLE,
      execute: this.removeItem.bind(this)
    }
  ];
  public accountData: any[] = [];
  public accountTableData: any[] = [];
  private accountIndex: number = 0;

  public accountSummaryFields: OwerpFormModel[] = [
    {
      name: 'totalDebitAmount',
      type: OwerpFormFieldType.NUMBER,
      canEdit: false,
      required: true,
      label: 'Total Debit Amount'
    },
    {
      name: 'totalCreditAmount',
      type: OwerpFormFieldType.NUMBER,
      canEdit: false,
      required: true,
      label: 'Total Credit Amount'
    }
  ];
  public accountSummaryData: any = {
    totalDebitAmount: 0,
    totalCreditAmount: 0
  };
  public totalCreditAmount: number = 0;
  public totalDebitAmount: number = 0;
  //endregion

  //region Summary (3rd Step)
  public entrySummaryFields: OwerpFormModel[] = [
    {
      name: 'saveAsSje',
      label: 'Save as standing journal entry',
      type: OwerpFormFieldType.BOOLEAN,
      canEdit: true,
      required: false
    }
  ];
  public entrySummaryData: any = {};
  //endregion

  private entry: any = {};

  constructor(private service: AccountService,
              private dialogService: NbDialogService,
              private ums: UserMessageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.service.fetchJournalEntryNumber().subscribe(
      (res: ApiResponse) => this.detailData = {entryNumber: res.data['entryNumber']}
    );
  }

  public addDetails(data: any): void {

    const date: Date = new Date(data['entryDate']);
    const currentTime: Date = new Date(Date.now());
    date.setHours(currentTime.getHours(), currentTime.getMinutes());
    const entryDate: string = moment(date).format('YYYY-MM-DD HH:mm');


    this.entry = {};
    this.entry['entryNumber'] = data['entryNumber'];
    this.entry['entryDate'] = entryDate;
    this.entry['note'] = data['note'];
    this.stepper.next();
  }

  public addAccount(): void {
    this.accountIndex = this.accountTableData.length;
    this.dialogService.open(AddAccountComponent, {context: {id: this.accountIndex}}).onClose
      .pipe(
        filter((value: any) => value !== undefined && value !== null)
      ).subscribe(
      (value: any) => {
        const tableData: any = {
          ledgerAccount: value['ledgerAccount'].label,
          details: value['memo'],
          debit: value['debitAmount'],
          credit: value['creditAmount'],
          costCenter: value['costCenter'].label,
          person: value['person'] ? value['person'].label + ` ( ${value['personType'].value === 'CUSTOMER' ? 'Customer' : 'Supplier'})` : null,
          personType: value['personType'].label
        };

        this.accountTableData = this.accountTableData.concat([tableData]);

        const data: any = {
          ledgerAccount: {id: value['ledgerAccount'].value},
          costCenter: {id: value['costCenter'].value},
          details: value['memo']
        };

        if (value['debitAmount']) {
          data['amount'] = value['debitAmount'];
          data['entryType'] = 'DEBIT';
          this.totalDebitAmount += +data['amount'];
        } else if (value['creditAmount']) {
          data['amount'] = value['creditAmount'];
          data['entryType'] = 'CREDIT';
          this.totalCreditAmount += +data['amount'];
        }
        data['personType'] = value['personType'].value;
        if (data['personType'] === 'CUSTOMER') {
          data['customer'] = {id: value['person'].value};
        } else if (data['personType'] === 'SUPPLIER') {
          data['supplier'] = {id: value['person'].value};
        }
        this.accountData.push(data);
        this.accountSummaryData = {
          totalCreditAmount: this.totalCreditAmount,
          totalDebitAmount: this.totalDebitAmount
        };
      }
    );
  }

  public saveJournalEntry(summaryData: any): void {
    this.entry = Object.assign(this.entry, summaryData);
    this.entry['bookEntryDetails'] = this.accountData;

    this.service.createJournalEntry(this.entry).subscribe(
      (res: ApiResponse) => {
        this.ums.success('New Journal Entry Created Successfully.');
        this.router.navigateByUrl('/pages/accounts/journal-entries');
      }
    );
  }

  public cancelSummary(): void {
    this.stepper.previous();
  }

  public removeItem(data: any[]): void {
    const id: number = data[0].id;
    const index: number = this.accountTableData.findIndex((acc) => acc[id] === id);
    if (index === -1) {
      return;
    }

    this.accountTableData.splice(index, 1);
    this.accountTableData = this.accountTableData.slice();

    this.accountData.splice(index, 1);
  }


}
