import {Component, OnInit} from '@angular/core';
import {
  OwerpSelectionMode,
  OwerpTableColumns,
  OwerpTableColumnType
} from '../../../../@control/table/owerp-table.model';
import {OwerpActionModel} from '../../../../@control/action/owerp-action.model';
import {CustomerItemService} from '../customer-item.service';
import {Router} from '@angular/router';
import {ApiResponse} from '../../../../model/api-model';

@Component({
  selector: 'ngx-owerp-list-customer-items',
  templateUrl: './list-customer-items.component.html',
  styleUrls: ['./list-customer-items.component.css']
})
export class ListCustomerItemsComponent implements OnInit {

  public cols: OwerpTableColumns = {
    customerType: {title: 'Customer Type', type: OwerpTableColumnType.TEXT},
    itemName: {title: 'Item Name', type: OwerpTableColumnType.TEXT},
    remarks: {title: 'Remarks', type: OwerpTableColumnType.TEXT},
    ledgerAccount: {title: 'Control Account', type: OwerpTableColumnType.TEXT},
    status: {title: 'Customer Type', type: OwerpTableColumnType.BOOLEAN}
  };

  public data: any[] = [];
  public actions: OwerpActionModel[] = [
    {
      name: 'viewDetails',
      mode: OwerpSelectionMode.SINGLE,
      execute: this.details.bind(this),
      status: 'warning',
      icon: 'brush-outline'
    }
  ];

  constructor(private service: CustomerItemService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  private details(data: any[]) {
    const id: string = data[0]['id'];
    this.router.navigateByUrl('/pages/customers/items/' + id);
  }

  public create(): void {
    this.router.navigateByUrl('/pages/customers/items/create');
  }

  private loadData(): void {
    this.service.fetchAll().subscribe(
      (res: ApiResponse) => {
        const rows: any[] = [];
        res.data.forEach(
          (d: any) => {
            const row: any = {};
            row['id'] = d['id'];
            row['customerType'] = d['customerType'] ? `${d['customerType']['typeName']}(${d['customerType']['typeCode']})` : '';
            row['itemName'] = d['itemName'];
            row['remarks'] = d['remarks'];
            row['status'] = d['status'];
            row['controlAccount'] = d['ledgerAccount'] ? `${d['ledgerAccount']['ledgerAccName']}(${d['ledgerAccount']['ledgerAccCode']})` : '';

            rows.push(row);
          });
        this.data = rows;
      }
    );
  }

}
