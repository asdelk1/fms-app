import {Component, OnInit} from '@angular/core';
import {
  OwerpTableColumns,
  OwerpTableColumnType,
  OwerpTableSelectionMode
} from '../../../../@control/table/owerp-table.model';
import {OwerpActionModel} from '../../../../@control/action/owerp-action.model';
import {CurrencyTypeService} from '../currency-type.service';
import {ApiResponse} from '../../../../model/api-model';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-owerp-list-currency-types',
  templateUrl: './list-currency-types.component.html',
  styleUrls: ['./list-currency-types.component.css']
})
export class ListCurrencyTypesComponent implements OnInit {

  public cols: OwerpTableColumns = {
    id: {title: 'ID', type: OwerpTableColumnType.TEXT},
    currency: {title: 'Currency', type: OwerpTableColumnType.TEXT},
    status: {title: 'Status', type: OwerpTableColumnType.BOOLEAN}
  };

  public actions: OwerpActionModel[] = [
    {
      name: 'viewCurrencyType',
      label: 'Details',
      execute: this.viewCurrencyType.bind(this),
      mode: OwerpTableSelectionMode.SINGLE
    }
  ];

  public data: any[] = [];

  constructor(private service: CurrencyTypeService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  public viewCurrencyType(data: any[]): void {
    const id: string = data[0]['id'];
    this.router.navigateByUrl('/pages/master-data/currency-types/' + id);
  }

  public createCurrencyType(): void {
    this.router.navigateByUrl('/pages/master-data/currency-types/create');
  }

  private loadData(): void {
    this.service.fetchAll().subscribe(
      (res: ApiResponse) => {
        this.data = res.data;
      }
    );
  }
}
