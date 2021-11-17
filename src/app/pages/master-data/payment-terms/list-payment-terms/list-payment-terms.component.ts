import {Component, OnInit} from '@angular/core';
import {
  OwerpTableColumns,
  OwerpTableColumnType,
  OwerpTableSelectionMode
} from '../../../../@control/table/owerp-table.model';
import {OwerpActionModel} from '../../../../@control/action/owerp-action.model';
import {Router} from '@angular/router';
import {ApiResponse} from '../../../../model/api-model';
import {PaymentTermsService} from '../payment-terms.service';

@Component({
  selector: 'ngx-owerp-list-payment-terms',
  templateUrl: './list-payment-terms.component.html',
  styleUrls: ['./list-payment-terms.component.css']
})
export class ListPaymentTermsComponent implements OnInit {

  public columns: OwerpTableColumns = {
    id: {title: 'Id', type: OwerpTableColumnType.TEXT},
    term: {title: 'Term (Days)', type: OwerpTableColumnType.TEXT},
    description: {title: 'Description', type: OwerpTableColumnType.TEXT},
    discount: {title: 'Discount (%)', type: OwerpTableColumnType.TEXT},
    discountDatesBefore: {title: 'Discount if paid within (Days)', type: OwerpTableColumnType.TEXT},
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

  constructor(private service: PaymentTermsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  private viewDetails(data: any[]): void {
    const id: string = data[0]['id'];
    this.router.navigateByUrl('/pages/master-data/payment-terms/' + id);
  }

  private loadData(): void {
    this.service.fetchAll().subscribe(
      (res: ApiResponse) => {
        this.data = res.data;
      }
    );
  }

  public createMethod(): void {
    this.router.navigateByUrl('/pages/master-data/payment-terms/create');
  }

}
