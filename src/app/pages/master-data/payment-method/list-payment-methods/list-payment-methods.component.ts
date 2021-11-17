import {Component, OnInit} from '@angular/core';
import {
  OwerpTableColumns,
  OwerpTableColumnType,
  OwerpTableSelectionMode
} from '../../../../@control/table/owerp-table.model';
import {PaymentMethodService} from '../payment-method.service';
import {OwerpActionModel} from '../../../../@control/action/owerp-action.model';
import {Router} from '@angular/router';
import {ApiResponse} from '../../../../model/api-model';

@Component({
  selector: 'ngx-owerp-list-payment-methods',
  templateUrl: './list-payment-methods.component.html',
  styleUrls: ['./list-payment-methods.component.css']
})
export class ListPaymentMethodsComponent implements OnInit {

  public columns: OwerpTableColumns = {
    id: {title: 'Id', type: OwerpTableColumnType.TEXT},
    paymentMethod: {title: 'Method', type: OwerpTableColumnType.TEXT},
    description: {title: 'Description', type: OwerpTableColumnType.TEXT},
    status: {title: 'Status', type: OwerpTableColumnType.BOOLEAN}
  };

  public actions: OwerpActionModel[] = [
    {
      name: 'viewPaymentMethodDetails',
      label: 'Details',
      execute: this.viewDetails.bind(this),
      mode: OwerpTableSelectionMode.SINGLE
    }
  ];

  public data: any[] = [];

  constructor(private service: PaymentMethodService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  private viewDetails(data: any[]): void {
    const id: string = data[0]['id'];
    this.router.navigateByUrl('/pages/master-data/payment-methods/' + id);
  }

  private loadData(): void {
    this.service.fetchAll().subscribe(
      (res: ApiResponse) => {
        this.data = res.data;
      }
    );
  }

  public createMethod(): void {
    this.router.navigateByUrl('/pages/master-data/payment-methods/create');
  }

}
