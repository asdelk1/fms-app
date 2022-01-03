import {Component, OnInit} from '@angular/core';
import {
  OwerpSelectionMode,
  OwerpTableColumns,
  OwerpTableColumnType
} from '../../../../@control/table/owerp-table.model';
import {InvestmentTypesService} from '../../investment-types.service';
import {ApiResponse} from '../../../../model/api-model';
import {OwerpActionModel} from '../../../../@control/action/owerp-action.model';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-owerp-list-investment-types',
  templateUrl: './list-investment-types.component.html',
  styleUrls: ['./list-investment-types.component.css']
})
export class ListInvestmentTypesComponent implements OnInit {

  public columns: OwerpTableColumns = {
    code: {title: 'Code', type: OwerpTableColumnType.TEXT},
    name: {title: 'Name', type: OwerpTableColumnType.TEXT},
    active: {title: 'Active', type: OwerpTableColumnType.BOOLEAN}
  };

  public data: any[] = [];

  public actions: OwerpActionModel[] = [
    {name: 'viewDetails', label: 'Details', mode: OwerpSelectionMode.SINGLE, execute: this.viewDetails.bind(this)}
  ];

  constructor(private service: InvestmentTypesService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.service.fetchAll().subscribe(
      (res: ApiResponse) => {
        this.data = res.data;
      }
    );
  }

  private viewDetails(data: any[]): void {
    const id: string = data[0]['id'];
    this.router.navigateByUrl('/pages/investments/types/view/' + id);
  }

  public create(): void {
    this.router.navigateByUrl('/pages/investments/types/create');
  }

}
