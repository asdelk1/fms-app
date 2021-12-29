import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../account.service';
import {
  OwerpSelectionMode,
  OwerpTableColumns,
  OwerpTableColumnType
} from '../../../../@control/table/owerp-table.model';
import {ApiResponse} from '../../../../model/api-model';
import {OwerpActionModel} from '../../../../@control/action/owerp-action.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ngx-owerp-list-journal-entries',
  templateUrl: './list-journal-entries.component.html',
  styleUrls: ['./list-journal-entries.component.css']
})
export class ListJournalEntriesComponent implements OnInit {

  public title: string = 'Journal Entry';
  public canCreate: boolean = true;
  public columns: OwerpTableColumns = {
    entryNumber: {title: 'Number', type: OwerpTableColumnType.TEXT},
    entryDate: {title: 'Date', type: OwerpTableColumnType.TEXT},
    note: {title: 'Details', type: OwerpTableColumnType.TEXT}
  };

  public data: any[] = [];
  public actions: OwerpActionModel[] = [
    {
      name: 'standingJournalEntry',
      label: 'Standing Journal Entry',
      mode: OwerpSelectionMode.NONE,
      execute: this.standingJournalEntry.bind(this),
      visible: this.isNavActionVisible()
    },
    {
      name: 'approveJournalEntry',
      label: 'Approve Journal Entry',
      mode: OwerpSelectionMode.NONE,
      execute: this.approveJournalEntry.bind(this),
      visible: this.isNavActionVisible()
    },
    {
      name: 'checkJournalEntry',
      label: 'Check Journal Entry',
      mode: OwerpSelectionMode.NONE,
      execute: this.checkJournalEntry.bind(this),
      visible: this.isNavActionVisible()
    },
    {
      name: 'viewDetails',
      label: 'Details',
      mode: OwerpSelectionMode.SINGLE,
      execute: this.viewDetails.bind(this)
    }
  ];
  private mode: string = 'normal';

  constructor(private service: AccountService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    const mode: string | undefined = this.route.snapshot.data && this.route.snapshot.data['mode'] ?
      this.route.snapshot.data['mode'] : undefined;
    if (!mode) {
      this.loadData();
      this.mode = 'normal';
    } else if (mode === 'to-check') {
      this.title = this.title + ' To Check';
      this.loadEntriesToCheck();
      this.mode = 'to-check';
    } else {
      this.title = this.title + ' To Approve';
      this.loadEntriesToApprove();
      this.mode = 'to-approve';
    }

    this.canCreate = this.mode === 'normal';
  }

  private loadData(): void {
    this.service.fetchJournalEntries().subscribe(
      (res: ApiResponse) => {
        this.data = res.data;
      }
    );
  }

  private loadEntriesToCheck(): void {
    this.service.fetchAllToCheck().subscribe((res: ApiResponse) => this.data = res.data);
  }

  private loadEntriesToApprove(): void {
    this.service.fetchAllToApprove().subscribe((res: ApiResponse) => this.data = res.data);
  }

  private checkJournalEntry(rows: any[]): void {
    this.router.navigateByUrl('/pages/accounts/journal-entries/to-check');
  }

  private approveJournalEntry(rows: any[]): void {
    this.router.navigateByUrl('/pages/accounts/journal-entries/to-approve');
  }

  private standingJournalEntry(rows: any[]): void {
    this.router.navigateByUrl('/pages/accounts/journal-entries/standing');
  }

  public createJournalEntry(): void {
    this.router.navigateByUrl('/pages/accounts/journal-entries/create');
  }

  private isNavActionVisible(): (data: any) => boolean {
    return (data: any) => this.mode === 'normal';
  }

  private viewDetails(data: any[]): void {
    const id: string = data[0]['id'];
    if (this.mode === 'to-check') {
      this.router.navigateByUrl('/pages/accounts/journal-entries/to-check/view/' + id);
    } else if (this.mode === 'to-approve') {
      this.router.navigateByUrl('/pages/accounts/journal-entries/to-approve/view/' + id);
    } else {
      this.router.navigateByUrl('/pages/accounts/journal-entries/view/' + id);
    }
  }

}
