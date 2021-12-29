import {Component, OnInit} from '@angular/core';
import {OwerpFormFieldSize, OwerpFormFieldType, OwerpFormModel} from '../../../../@control/form/owerp-form.model';
import {OwerpTableColumns, OwerpTableColumnType} from '../../../../@control/table/owerp-table.model';
import {AccountService} from '../../account.service';
import {ApiResponse} from '../../../../model/api-model';
import {ActivatedRoute, Router} from '@angular/router';
import {OwerpActionModel} from '../../../../@control/action/owerp-action.model';
import {NbDialogService} from '@nebular/theme';
import {UserMessageService} from '../../../../services/user-message.service';
import {JournalEntryOperationComponent} from '../journal-entry-operation/journal-entry-operation.component';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'ngx-owerp-view-journal-entry',
  templateUrl: './view-journal-entry.component.html',
  styleUrls: ['./view-journal-entry.component.css']
})
export class ViewJournalEntryComponent implements OnInit {

  //region Entry Details
  public entryDetailFields: OwerpFormModel[] = [
    {
      name: 'entryNumber',
      label: 'Entry Number',
      type: OwerpFormFieldType.TEXT,
      canEdit: false,
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'entryDate',
      label: 'Entry Date',
      type: OwerpFormFieldType.DATE,
      canEdit: true,
      required: true,
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'docApproveType',
      label: 'Status',
      type: OwerpFormFieldType.TEXT,
      canEdit: true,
      required: true,
      size: OwerpFormFieldSize.SMALL
    },

    {
      name: 'note',
      label: 'Note',
      type: OwerpFormFieldType.TEXT,
      canEdit: true,
      size: OwerpFormFieldSize.LARGE
    }
  ];
  public entryDetails: any = {};
  //endregion

  //region Account Details
  public accountColumns: OwerpTableColumns = {
    ledgerAccount: {title: 'Ledger Account', type: OwerpTableColumnType.TEXT},
    details: {title: 'Memo', type: OwerpTableColumnType.TEXT},
    debit: {title: 'Debit', type: OwerpTableColumnType.TEXT},
    credit: {title: 'Credit', type: OwerpTableColumnType.TEXT},
    person: {title: 'Person', type: OwerpTableColumnType.TEXT},
    costCenter: {title: 'Cost Center', type: OwerpTableColumnType.TEXT}
  };
  public accountData: any[] = [];

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

  //endregion

  //region Authorization
  public authFields: OwerpFormModel[] = [
    {
      name: 'enteredBy',
      label: 'Entered By',
      type: OwerpFormFieldType.TEXT,
      canEdit: false,
      required: false,
      size: OwerpFormFieldSize.MEDIUM
    },
    {
      name: 'enteredOn',
      label: 'Entered On',
      type: OwerpFormFieldType.TEXT,
      canEdit: false,
      required: false,
      size: OwerpFormFieldSize.MEDIUM
    },
    {
      name: 'checkedBy',
      label: 'Checked By',
      type: OwerpFormFieldType.TEXT,
      canEdit: false,
      required: false,
      size: OwerpFormFieldSize.MEDIUM
    },
    {
      name: 'checkedOn',
      label: 'Checked On',
      type: OwerpFormFieldType.TEXT,
      canEdit: false,
      required: false,
      size: OwerpFormFieldSize.MEDIUM
    },
    {
      name: 'checkerNote',
      label: 'Checker Note',
      type: OwerpFormFieldType.TEXT,
      canEdit: false,
      required: false,
      size: OwerpFormFieldSize.LARGE
    },
    {
      name: 'authorizedBy',
      label: 'Authorized By',
      type: OwerpFormFieldType.TEXT,
      canEdit: false,
      required: false,
      size: OwerpFormFieldSize.MEDIUM
    },
    {
      name: 'authorizedOn',
      label: 'Authorized On',
      type: OwerpFormFieldType.TEXT,
      canEdit: false,
      required: false,
      size: OwerpFormFieldSize.MEDIUM
    },
    {
      name: 'approverNote',
      label: 'Approver Note',
      type: OwerpFormFieldType.TEXT,
      canEdit: false,
      required: false,
      size: OwerpFormFieldSize.LARGE
    }
  ];
  public authData: any = {};
  //endregion

  //region Actions
  public actions: OwerpActionModel[] = [
    {
      name: 'check',
      label: 'Check',
      status: 'success',
      execute: this.checkEntry.bind(this),
      visible: this.isCheckActionsVisible.bind(this)
    },
    {
      name: 'reject',
      label: 'Reject',
      status: 'danger',
      execute: this.checkRejectEntry.bind(this),
      visible: this.isCheckActionsVisible.bind(this)
    },
    {
      name: 'approve',
      label: 'Approve',
      status: 'success',
      execute: this.approveEntry.bind(this),
      visible: this.isApproveActionsVisible.bind(this)
    },
    {
      name: 'approveReject',
      label: 'Reject',
      status: 'danger',
      execute: this.approveRejectEntry.bind(this),
      visible: this.isApproveActionsVisible.bind(this)
    }
  ];

  //endregion

  private mode: string = 'normal';
  private id: string;

  constructor(private service: AccountService,
              private route: ActivatedRoute,
              private router: Router,
              private dialogService: NbDialogService,
              private messageService: UserMessageService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadData(this.id);

    this.mode = this.route.snapshot.data['mode'] ? this.route.snapshot.data['mode'] : 'normal';
  }

  private loadData(id: string): void {
    this.service.fetch(id).subscribe(
      (res: ApiResponse) => {
        const d: any = res.data;

        let totalCredit: number = 0;
        let totalDebit: number = 0;
        const accountData: any[] = [];

        // setting entry details
        this.entryDetails = {
          entryNumber: d['entryNumber'],
          entryDate: d['entryDate'],
          note: d['note'],
          docApproveType: d['docApproveType']
        };


        d['bookEntryDetails'].forEach(
          (detail: any) => {
            const tableData: any = {
              ledgerAccount: `${detail['ledgerAccount']['ledgerAccName']}(${detail['ledgerAccount']['ledgerAccCode']})`,
              details: detail['details'],
              costCenter: `${detail['costCenter']['name']}(${detail['costCenter']['code']})`
            };

            if (detail['entryType'] === 'CREDIT') {
              totalCredit += detail['amount'];
              tableData['credit'] = detail['amount'];
            } else {
              totalDebit += detail['amount'];
              tableData['debit'] = detail['amount'];
            }

            tableData['personType'] = detail['personType'];
            if (tableData['personType'] === 'CUSTOMER') {
              tableData['person'] = `${detail['customer']['customerName']} (Customer)`;
            } else if (tableData['personType'] === 'SUPPLIER') {
              tableData['person'] = `${detail['supplier']['name']} (Supplier)`;
            }
            accountData.push(tableData);
          }
        );
        this.accountData = accountData;
        this.accountSummaryData = {
          totalDebitAmount: totalDebit,
          totalCreditAmount: totalCredit
        };

        this.authData = {
          enteredBy: this.getUserText(d['enteredBy']),
          enteredOn: d['enteredOn'],
          checkedBy: this.getUserText(d['checkedBy']),
          checkedOn: d['checkedOn'],
          checkerNote: d['checkerNote'],
          authorizedBy: this.getUserText(d['authorizedBy']),
          authorizedOn: d['authorizedOn'],
          approverNote: d['approverNote']
        };

      }
    );
  }

  private getUserText(user: any | undefined): string {
    if (!user) {
      return '';
    }

    return `${user['firstName']} ${user['lastName']} (${user['username']})`;
  }

  public checkEntry(): void {
    this.dialogService.open(JournalEntryOperationComponent, {context: {title: 'Check Entry'}}).onClose
      .pipe(filter(value => value !== undefined && value !== null))
      .subscribe(
        (value: any) => {
          this.service.checkEntry(this.id, value['note'], false).subscribe(
            (res: ApiResponse) => this.postProcessEntryAfterOperation(res.data)
          );
        }
      );
  }

  public checkRejectEntry(): void {
    this.dialogService.open(JournalEntryOperationComponent, {context: {title: 'Reject Entry'}}).onClose
      .pipe(filter(value => value !== undefined && value !== null))
      .subscribe(
        (value: any) => {
          this.service.checkEntry(this.id, value['note'], true).subscribe(
            (res: ApiResponse) => this.postProcessEntryAfterOperation(res.data)
          );
        }
      );
  }

  public approveEntry(): void {
    this.dialogService.open(JournalEntryOperationComponent, {context: {title: 'Approve Entry'}}).onClose
      .pipe(filter(value => value !== undefined && value !== null))
      .subscribe(
        (value: any) => {
          this.service.approveEntry(this.id, value['note'], false).subscribe(
            (res: ApiResponse) => this.postProcessEntryAfterOperation(res.data)
          );
        }
      );
  }

  public approveRejectEntry(): void {
    this.dialogService.open(JournalEntryOperationComponent, {context: {title: 'Reject Entry'}}).onClose
      .pipe(filter(value => value !== undefined && value !== null))
      .subscribe(
        (value: any) => {
          this.service.approveEntry(this.id, value['note'], true).subscribe(
            (res: ApiResponse) => this.postProcessEntryAfterOperation(res.data)
          );
        }
      );
  }

  private isCheckActionsVisible(data: any): boolean {
    return this.mode === 'to-check';
  }

  private isApproveActionsVisible(data: any): boolean {
    return this.mode === 'to-approve' && this.entryDetails['docApproveType'] === 'CHECKED';
  }

  private postProcessEntryAfterOperation(data: any): void {
    this.messageService.success('Entry Saved Successfully.');
    this.router.navigateByUrl('/pages/accounts/journal-entries/view/' + data['id']);
  }

}
