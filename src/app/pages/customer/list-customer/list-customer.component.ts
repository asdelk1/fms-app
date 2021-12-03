import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../customer.service';
import {OwerpSelectionMode, OwerpTableColumns, OwerpTableColumnType} from '../../../@control/table/owerp-table.model';
import {ApiResponse} from '../../../model/api-model';
import {OwerpActionModel} from '../../../@control/action/owerp-action.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ngx-owerp-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {

  public columns: OwerpTableColumns = {
    customerType: {title: 'Type', type: OwerpTableColumnType.TEXT},
    customerCode: {title: 'Code', type: OwerpTableColumnType.TEXT},
    customerName: {title: 'Name', type: OwerpTableColumnType.TEXT},
    status: {title: 'Status', type: OwerpTableColumnType.BOOLEAN}
  };

  public data: any[] = [];
  public actions: OwerpActionModel[] = [
    {
      name: 'viewDetails',
      icon: 'brush-outline',
      status: 'warning',
      mode: OwerpSelectionMode.SINGLE,
      execute: this.details.bind(this)
    }
  ];

  constructor(private service: CustomerService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {
    this.service.fetchAll().subscribe(
      (res: ApiResponse) => {
        this.data = res.data.map((c: any) => {
          const row: any = c;
          row['customerType'] = `${c['customerType']['typeName']}(${c['customerType']['typeCode']})`;
          return row;
        });
      }
    );
  }

  private details(rows: any[]): void {
    const id: string = rows[0]['id'];
    this.router.navigateByUrl('/pages/customers/' + id + '/edit');
  }

  public createCustomer(): void {
    this.router.navigateByUrl('/pages/customers/create');
  }

}
