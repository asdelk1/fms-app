import {Component, OnInit} from '@angular/core';
import {OwerpSelectionMode, OwerpTableColumns, OwerpTableColumnType} from '../../../@control/table/owerp-table.model';
import {SalesInvoiceService} from '../sales-invoice.service';
import {ApiResponse} from '../../../model/api-model';
import {Router} from '@angular/router';
import {OwerpActionModel} from '../../../@control/action/owerp-action.model';

@Component({
  selector: 'ngx-owerp-list-sales-invoice',
  templateUrl: './list-sales-invoice.component.html',
  styleUrls: ['./list-sales-invoice.component.css']
})
export class ListSalesInvoiceComponent implements OnInit {

  public cols: OwerpTableColumns = {
    invoiceNumber: {title: 'Number', type: OwerpTableColumnType.TEXT},
    customer: {title: 'Customer', type: OwerpTableColumnType.TEXT},
    invoiceDate: {title: 'Invoice Date', type: OwerpTableColumnType.TEXT},
    totalAmount: {title: 'Amount', type: OwerpTableColumnType.TEXT}
  };

  public actions: OwerpActionModel[] = [
    {
      name: 'viewInvoiceDetails',
      label: 'Details',
      execute: this.viewInvoiceDetails.bind(this),
      mode: OwerpSelectionMode.SINGLE
    }
  ];

  public data: any[] = [];

  constructor(private service: SalesInvoiceService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.service.fetchAll().subscribe(
      (res: ApiResponse) => {
        const data: any[] = res.data;
        this.data = data.map((record: any) => {
          record['customer'] = record['customer']['customerName'];
          return record;
        });
      }
    );
  }

  public createNewSalesInvoice(): void {
    this.router.navigateByUrl('/pages/sales-invoices/create');
  }

  private viewInvoiceDetails(rows: any[]): void {
    const id: string = rows[0]['id'];
    this.router.navigateByUrl('/pages/sales-invoices/' + id);
  }

}
