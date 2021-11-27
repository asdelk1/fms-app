import {Component, OnInit} from '@angular/core';
import {
  OwerpTableColumns,
  OwerpTableColumnType,
  OwerpSelectionMode
} from '../../../../@control/table/owerp-table.model';
import {OwerpActionModel} from '../../../../@control/action/owerp-action.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiResponse} from '../../../../model/api-model';
import {SupplierItemService} from '../../supplier-item.service';

@Component({
  selector: 'ngx-owerp-list-supplier-item',
  templateUrl: './list-supplier-item.component.html',
  styleUrls: ['./list-supplier-item.component.css']
})
export class ListSupplierItemComponent implements OnInit {

  public cols: OwerpTableColumns = {
    name: {title: 'Name', type: OwerpTableColumnType.TEXT},
    description: {title: 'Description', type: OwerpTableColumnType.TEXT},
    status: {title: 'Code', type: OwerpTableColumnType.BOOLEAN}
  };
  public selectionMode: OwerpSelectionMode = OwerpSelectionMode.SINGLE;
  public actions: OwerpActionModel[] = [
    {
      name: 'viewSupplierTypeDetails',
      mode: OwerpSelectionMode.SINGLE,
      label: 'Details',
      execute: this.viewDetails.bind(this)
    }
  ];
  public data: any[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: SupplierItemService) {
  }

  ngOnInit(): void {
    this.service.fetchAll().subscribe(
      (res: ApiResponse) => {
        this.data = res.data;
      }
    );
  }

  public onCreate(): void {
    this.router.navigateByUrl('/pages/suppliers/items/create');
  }

  public viewDetails(rows: any | any[]): void {
    const id: string = rows[0]['id'];
    this.router.navigate([id], {relativeTo: this.route});
  }

}
