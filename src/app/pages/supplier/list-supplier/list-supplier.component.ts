import {Component, OnInit} from '@angular/core';
import {
  OwerpTableColumns,
  OwerpTableColumnType,
  OwerpSelectionMode
} from '../../../@control/table/owerp-table.model';
import {OwerpActionModel} from '../../../@control/action/owerp-action.model';
import {SupplierService} from '../supplier.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiResponse} from '../../../model/api-model';

@Component({
  selector: 'ngx-owerp-list-supplier',
  templateUrl: './list-supplier.component.html',
  styleUrls: ['./list-supplier.component.css']
})
export class ListSupplierComponent implements OnInit {

  public cols: OwerpTableColumns = {
    code: {title: 'Code', type: OwerpTableColumnType.TEXT},
    name: {title: 'Name', type: OwerpTableColumnType.TEXT},
    type: {title: 'Type', type: OwerpTableColumnType.TEXT},
    status: {title: 'Status', type: OwerpTableColumnType.BOOLEAN}
  };

  public selectionMode: OwerpSelectionMode = OwerpSelectionMode.SINGLE;
  public actions: OwerpActionModel[] = [
    {name: 'viewSupplierDetails', label: 'Details', execute: this.viewDetails.bind(this)}
  ];
  public data: any[] = [];

  constructor(private service: SupplierService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  public viewDetails(rows: any | any[]): void {
    const id = rows[0]['id'];
    this.router.navigate([id], {relativeTo: this.route});
  }

  public onCreateSupplier(): void {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

  private loadData(): void {
    this.service.fetchAll().subscribe(
      (res: ApiResponse) => {
        const data: any[] = res.data;
        if (data.length > 0) {
          this.data = data.map((record: any) => {
            return {
              id: record['id'],
              name: record['name'],
              code: record['code'],
              type: `${record['type']['typeName']}(${record['type']['typeCode']})`
            };
          });
        } else {
          this.data = [];
        }
      }
    );
  }

}
