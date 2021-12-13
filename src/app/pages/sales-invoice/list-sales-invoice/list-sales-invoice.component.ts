import {Component, OnInit} from '@angular/core';
import {OwerpSelectionMode, OwerpTableColumns, OwerpTableColumnType} from '../../../@control/table/owerp-table.model';
import {SalesInvoiceService} from '../sales-invoice.service';
import {ApiResponse} from '../../../model/api-model';
import {ActivatedRoute, Router} from '@angular/router';
import {OwerpActionModel} from '../../../@control/action/owerp-action.model';
import {CheckSalesInvoiceComponent} from '../check-sales-invoice/check-sales-invoice.component';
import {switchMap} from 'rxjs/operators';
import {NbDialogService} from '@nebular/theme';
import {UserMessageService} from '../../../services/user-message.service';

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
    },
    {
      name: 'viewInvoicesToCheck',
      label: 'Invoices To Check',
      execute: this.viewInvoicesToCheck.bind(this),
      mode: OwerpSelectionMode.NONE,
      visible: (data: any) => this.dataType === 'normal'
    },
    {
      name: 'checkInvoice',
      label: 'Check',
      execute: this.checkInvoice.bind(this),
      mode: OwerpSelectionMode.SINGLE,
      visible: (data: any) => this.dataType === 'to-check'
    }

  ];

  public data: any[] = [];

  private dataType: string;

  public canCreate: boolean = true;
  public title: string = 'Sales Invoices';

  constructor(private service: SalesInvoiceService,
              private router: Router,
              private route: ActivatedRoute,
              private dialogService: NbDialogService,
              private ums: UserMessageService) {
  }

  ngOnInit(): void {

    if (this.route.snapshot.data && this.route.snapshot.data['type']) {
      this.dataType = this.route.snapshot.data['type'];
    }

    if (this.dataType === 'normal') {
      this.title = 'Sales Invoices';
      this.canCreate = true;
      this.loadNormal();
    } else if (this.dataType === 'to-check') {
      this.title = 'Sales Invoices - To Check';
      this.canCreate = false;
      this.loadToCheck();
    }
  }

  private loadNormal(): void {
    this.service.fetchAll().subscribe(
      this.populateData.bind(this)
    );
  }

  private loadToCheck(): void {
    this.service.fetchAllToCheck().subscribe(this.populateData.bind(this));
  }

  public createNewSalesInvoice(): void {
    this.router.navigateByUrl('/pages/sales-invoices/create');
  }

  private viewInvoiceDetails(rows: any[]): void {
    const id: string = rows[0]['id'];
    this.router.navigateByUrl('/pages/sales-invoices/' + id);
  }

  private populateData(res: ApiResponse): void {
    const data: any[] = res.data;
    this.data = data.map((record: any) => {
      record['customer'] = record['customer']['customerName'];
      return record;
    });
  }

  private viewInvoicesToCheck(): void {
    this.router.navigateByUrl('/pages/sales-invoices/to-check');
  }

  private checkInvoice(data: any): void {
    this.dialogService.open(CheckSalesInvoiceComponent).onClose.pipe(
      switchMap(
        (value: string, index: number) => {
          return this.service.check(data[0].id, value);
        })
    ).subscribe(
      (res: ApiResponse) => {
        this.ums.success(`Sales Invoice ${res.data['invoiceNumber']} checked successfully.`);
        this.loadToCheck();
      }
    );
  }

}
