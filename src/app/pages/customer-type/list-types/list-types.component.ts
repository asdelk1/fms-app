import {Component, OnInit} from '@angular/core';
import {CustomerTypeService} from '../customer-type.service';
import {
  OwerpTableColumns,
  OwerpTableColumnType,
  OwerpTableSelectionMode
} from '../../../@control/table/owerp-table.model';
import {ApiResponse} from '../../../model/api-model';
import {ActivatedRoute, Router} from '@angular/router';
import {OwerpActionModel} from '../../../@control/action/owerp-action.model';

@Component({
  selector: 'ngx-owerp-list-types',
  templateUrl: './list-types.component.html',
  styleUrls: ['./list-types.component.css']
})
export class ListTypesComponent implements OnInit {

  public columns: OwerpTableColumns = {
    typeCode: {
      title: 'Code',
      type: OwerpTableColumnType.TEXT
    },
    typeName: {
      title: 'Name',
      type: OwerpTableColumnType.TEXT
    },
    remarks: {
      title: 'Remarks',
      type: OwerpTableColumnType.TEXT
    },
    status: {
      title: 'Active',
      type: OwerpTableColumnType.BOOLEAN
    }
  };

  public actions: OwerpActionModel[] = [
    {
      name: 'customerTypeDetails',
      label: 'Details',
      mode: OwerpTableSelectionMode.SINGLE,
      execute: this.viewDetails.bind(this)
    }
  ];
  public selectionType: OwerpTableSelectionMode = OwerpTableSelectionMode.SINGLE;
  public data: any[];

  constructor(private service: CustomerTypeService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.service.getAll().subscribe(
      (res: ApiResponse) => {
        this.data = res.data;
      }
    );
  }

  public createCustomerType(): void {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

  public viewDetails(data: any | any[]) {
    const id: string = data[0]['id'];
    this.router.navigate([id], {relativeTo: this.route});
  }

}
