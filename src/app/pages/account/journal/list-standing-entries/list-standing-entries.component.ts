import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../account.service';
import {ApiResponse} from '../../../../model/api-model';
import {
  OwerpSelectionMode,
  OwerpTableColumns,
  OwerpTableColumnType
} from '../../../../@control/table/owerp-table.model';
import {OwerpActionModel} from '../../../../@control/action/owerp-action.model';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-owerp-list-standing-entries',
  templateUrl: './list-standing-entries.component.html',
  styleUrls: ['./list-standing-entries.component.css']
})
export class ListStandingEntriesComponent implements OnInit {

  public columns: OwerpTableColumns = {
    index: {title: 'Number', type: OwerpTableColumnType.TEXT},
    note: {title: 'Note', type: OwerpTableColumnType.TEXT}
  };
  public actions: OwerpActionModel[] = [
    {name: 'viewEntry', execute: this.view.bind(this), mode: OwerpSelectionMode.SINGLE, label: 'View'}
  ];
  public data: any[] = [];
  public mode: OwerpSelectionMode = OwerpSelectionMode.SINGLE;

  constructor(private service: AccountService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.service.fetchAllStandingEntries().subscribe(
      (res: ApiResponse) => {
        this.data = res.data.map((d: any, i: number) => {
          return {
            id: d['id'],
            note: d['note'],
            index: i
          };
        });
      }
    );
  }

  private view(data: any[]): void {
    this.router.navigateByUrl('/pages/accounts/journal-entries/standing/view/' + data[0]['id']);
  }

}
