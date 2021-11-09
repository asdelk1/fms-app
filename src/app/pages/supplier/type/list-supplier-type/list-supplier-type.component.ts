import {Component, OnInit} from '@angular/core';
import {
  OwerpTableColumns,
  OwerpTableColumnType,
  OwerpTableSelectionMode
} from '../../../../@control/table/owerp-table.model';
import {OwerpActionModel} from '../../../../@control/action/owerp-action.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiResponse} from '../../../../model/api-model';
import {SupplierTypeService} from '../../supplier-type.service';

@Component({
  selector: 'ngx-owerp-list-supplier-type',
  templateUrl: './list-supplier-type.component.html',
  styleUrls: ['./list-supplier-type.component.css']
})
export class ListSupplierTypeComponent implements OnInit {

  public cols: OwerpTableColumns = {
    typeCode: {title: 'Code', type: OwerpTableColumnType.TEXT},
    typeName: {title: 'Name', type: OwerpTableColumnType.TEXT},
    remarks: {title: 'Remarks', type: OwerpTableColumnType.TEXT},
    status: {title: 'Status', type: OwerpTableColumnType.BOOLEAN}
  };
  public selectionMode: OwerpTableSelectionMode = OwerpTableSelectionMode.SINGLE;
  public actions: OwerpActionModel[] = [
    {
      name: 'viewSupplierTypeDetails',
      mode: OwerpTableSelectionMode.SINGLE,
      label: 'Details',
      execute: this.viewDetails.bind(this)
    }
  ];
  public data: any[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: SupplierTypeService) {
  }

  ngOnInit(): void {
    this.service.getTypes().subscribe(
      (res: ApiResponse) => {
        this.data = res.data;
      }
    );
  }

  public onCreate(): void {
    this.router.navigateByUrl('/pages/suppliers/types/create');
  }

  public viewDetails(rows: any | any[]): void {
    const id: string = rows[0]['id'];
    this.router.navigate([id], {relativeTo: this.route});
  }

}
