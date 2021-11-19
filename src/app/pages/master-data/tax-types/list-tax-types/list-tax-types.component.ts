import {Component, OnInit} from '@angular/core';
import {
  OwerpTableColumns,
  OwerpTableColumnType,
  OwerpTableSelectionMode
} from '../../../../@control/table/owerp-table.model';
import {OwerpActionModel} from '../../../../@control/action/owerp-action.model';
import {Router} from '@angular/router';
import {ApiResponse} from '../../../../model/api-model';
import {TaxTypesService} from '../tax-types.service';

@Component({
  selector: 'ngx-owerp-list-tax-types',
  templateUrl: './list-tax-types.component.html',
  styleUrls: ['./list-tax-types.component.css']
})
export class ListTaxTypesComponent implements OnInit {

  public columns: OwerpTableColumns = {
    id: {title: 'Id', type: OwerpTableColumnType.TEXT},
    taxCode: {title: 'Tax Code', type: OwerpTableColumnType.TEXT},
    description: {title: 'Description', type: OwerpTableColumnType.TEXT},
    taxRate: {title: 'Rate (%)', type: OwerpTableColumnType.TEXT},
    controlAccount: {title: 'Control Account', type: OwerpTableColumnType.TEXT},
    status: {title: 'Status', type: OwerpTableColumnType.BOOLEAN}
  };

  public actions: OwerpActionModel[] = [
    {
      name: 'viewTaxTypeDetails',
      label: 'Details',
      execute: this.viewDetails.bind(this),
      mode: OwerpTableSelectionMode.SINGLE
    }
  ];

  public data: any[] = [];

  constructor(private service: TaxTypesService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  private viewDetails(data: any[]): void {
    const id: string = data[0]['id'];
    this.router.navigateByUrl('/pages/master-data/tax-types/' + id);
  }

  private loadData(): void {
    this.service.fetchAll().subscribe(
      (res: ApiResponse) => {
        this.data = res.data;
      }
    );
  }

  public createMethod(): void {
    this.router.navigateByUrl('/pages/master-data/tax-types/create');
  }

}
