import {Component, OnInit} from '@angular/core';
import {
  OwerpTableColumns,
  OwerpTableColumnType,
  OwerpSelectionMode
} from '../../../../@control/table/owerp-table.model';
import {OwerpActionModel} from '../../../../@control/action/owerp-action.model';
import {Router} from '@angular/router';
import {ApiResponse} from '../../../../model/api-model';
import {AccountingPeriodService} from '../accounting-period.service';

@Component({
  selector: 'ngx-owerp-list-accounting-period',
  templateUrl: './list-accounting-period.component.html',
  styleUrls: ['./list-accounting-period.component.css']
})
export class ListAccountingPeriodComponent implements OnInit {

  public cols: OwerpTableColumns = {
    id: {title: 'ID', type: OwerpTableColumnType.TEXT},
    startDate: {title: 'Start Date', type: OwerpTableColumnType.TEXT},
    endDate: {title: 'End Date', type: OwerpTableColumnType.TEXT},
    status: {title: 'Status', type: OwerpTableColumnType.BOOLEAN}
  };

  public actions: OwerpActionModel[] = [
    {
      name: 'viewAccountingPeriodDetails',
      label: 'Details',
      execute: this.viewDetails.bind(this),
      mode: OwerpSelectionMode.SINGLE
    }
  ];

  public data: any[] = [];

  constructor(private service: AccountingPeriodService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  public viewDetails(data: any[]): void {
    const id: string = data[0]['id'];
    this.router.navigateByUrl('/pages/master-data/accounting-periods/' + id);
  }

  public createPeriod(): void {
    this.router.navigateByUrl('/pages/master-data/accounting-periods/create');
  }

  private loadData(): void {
    this.service.fetchAll().subscribe(
      (res: ApiResponse) => {
        this.data = res.data;
      }
    );
  }

}
