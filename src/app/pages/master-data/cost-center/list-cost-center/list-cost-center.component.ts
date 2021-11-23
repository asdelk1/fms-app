import { Component, OnInit } from '@angular/core';
import {
  OwerpTableColumns,
  OwerpTableColumnType,
  OwerpTableSelectionMode
} from '../../../../@control/table/owerp-table.model';
import {OwerpActionModel} from '../../../../@control/action/owerp-action.model';
import {CurrencyTypeService} from '../../currency-type/currency-type.service';
import {Router} from '@angular/router';
import {ApiResponse} from '../../../../model/api-model';
import {CostCenterService} from '../cost-center.service';

@Component({
  selector: 'ngx-owerp-list-cost-center',
  templateUrl: './list-cost-center.component.html',
  styleUrls: ['./list-cost-center.component.css']
})
export class ListCostCenterComponent implements OnInit {

  public cols: OwerpTableColumns = {
    id: {title: 'ID', type: OwerpTableColumnType.TEXT},
    name: {title: 'Name', type: OwerpTableColumnType.TEXT},
    code: {title: 'Code', type: OwerpTableColumnType.TEXT},
    remarks: {title: 'Remarks', type: OwerpTableColumnType.TEXT},
    status: {title: 'Status', type: OwerpTableColumnType.BOOLEAN}
  };

  public actions: OwerpActionModel[] = [
    {
      name: 'viewCurrencyType',
      label: 'Details',
      execute: this.viewDetails.bind(this),
      mode: OwerpTableSelectionMode.SINGLE
    }
  ];

  public data: any[] = [];

  constructor(private service: CostCenterService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  public viewDetails(data: any[]): void {
    const id: string = data[0]['id'];
    this.router.navigateByUrl('/pages/master-data/cost-centers/' + id);
  }

  public createCostCenter(): void {
    this.router.navigateByUrl('/pages/master-data/cost-centers/create');
  }

  private loadData(): void {
    this.service.fetchAll().subscribe(
      (res: ApiResponse) => {
        this.data = res.data;
      }
    );
  }

}
