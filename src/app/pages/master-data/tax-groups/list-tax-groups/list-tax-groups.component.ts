import {Component, OnInit} from '@angular/core';
import {TaxGroupsService} from '../tax-groups.service';
import {
  OwerpTableColumns,
  OwerpTableColumnType,
  OwerpTableSelectionMode
} from '../../../../@control/table/owerp-table.model';
import {OwerpActionModel} from '../../../../@control/action/owerp-action.model';
import {Router} from '@angular/router';
import {ApiResponse} from '../../../../model/api-model';

@Component({
  selector: 'ngx-owerp-list-tax-groups',
  templateUrl: './list-tax-groups.component.html',
  styleUrls: ['./list-tax-groups.component.css']
})
export class ListTaxGroupsComponent implements OnInit {

  public columns: OwerpTableColumns = {
    id: {title: 'Id', type: OwerpTableColumnType.TEXT},
    groupCode: {title: 'Tax Code', type: OwerpTableColumnType.TEXT},
    description: {title: 'Description', type: OwerpTableColumnType.TEXT},
    status: {title: 'Status', type: OwerpTableColumnType.BOOLEAN}
  };

  public actions: OwerpActionModel[] = [
    {
      name: 'viewPaymentTermsDetails',
      label: 'Details',
      execute: this.viewDetails.bind(this),
      mode: OwerpTableSelectionMode.SINGLE
    }
  ];

  public data: any[] = [];

  constructor(private service: TaxGroupsService,
              private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  private viewDetails(data: any[]): void {
    const id: string = data[0]['id'];
    this.router.navigateByUrl('/pages/master-data/tax-groups/' + id);
  }

  private loadData(): void {
    this.service.fetchAll().subscribe(
      (res: ApiResponse) => {
        this.data = res.data;
      }
    );
  }

  public createMethod(): void {
    this.router.navigateByUrl('/pages/master-data/tax-groups/create');
  }

}
