import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../account.service';
import {
  OwerpSelectionMode,
  OwerpTableColumns,
  OwerpTableColumnType
} from '../../../../@control/table/owerp-table.model';
import {ApiResponse} from '../../../../model/api-model';
import {OwerpActionModel} from '../../../../@control/action/owerp-action.model';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-owerp-list-journal-entries',
  templateUrl: './list-journal-entries.component.html',
  styleUrls: ['./list-journal-entries.component.css']
})
export class ListJournalEntriesComponent implements OnInit {

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
      execute: this.checkJournalEntry.bind(this)
    },
    {
      name: 'approveJournalEntry',
      label: 'Approve Journal Entry',
      mode: OwerpSelectionMode.NONE,
      execute: this.checkJournalEntry.bind(this)
    },
    {
      name: 'checkJournalEntry',
      label: 'Check Journal Entry',
      mode: OwerpSelectionMode.NONE,
      execute: this.checkJournalEntry.bind(this)
    }
  ];

  constructor(private service: AccountService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.service.fetchJournalEntries().subscribe(
      (res: ApiResponse) => {
        this.data = res.data.map((entry: any) => {
          return {
            entryNumber: entry['entryNumber'],
            entryDate: entry['entryDate'],
            note: entry['note']
          };
        });
      }
    );
  }

  private checkJournalEntry(rows: any[]): void {
    return;
  }

  private approveJournalEntry(rows: any[]): void {
    return;
  }

  private standingJournalEntry(rows: any[]): void {
    return;
  }

  public createJournalEntry(): void {
    this.router.navigateByUrl('/pages/accounts/journal-entries/create');
  }

}
