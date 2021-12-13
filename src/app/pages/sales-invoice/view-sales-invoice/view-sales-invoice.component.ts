import {Component, OnInit} from '@angular/core';
import {SalesInvoiceService} from '../sales-invoice.service';
import {OwerpFormFieldSize, OwerpFormFieldType, OwerpFormModel} from '../../../@control/form/owerp-form.model';
import {ActivatedRoute} from '@angular/router';
import {ApiResponse} from '../../../model/api-model';
import {OwerpSelectionMode, OwerpTableColumns, OwerpTableColumnType} from '../../../@control/table/owerp-table.model';
import {OwerpActionModel} from '../../../@control/action/owerp-action.model';
import {NbDialogService} from '@nebular/theme';
import {CheckSalesInvoiceComponent} from '../check-sales-invoice/check-sales-invoice.component';
import {switchMap} from 'rxjs/operators';
import {UserMessageService} from '../../../services/user-message.service';


@Component({
  selector: 'ngx-owerp-view-sales-invoice',
  templateUrl: './view-sales-invoice.component.html',
  styleUrls: ['./view-sales-invoice.component.css']
})
export class ViewSalesInvoiceComponent implements OnInit {

  //region Invoice Details
  public detailsFields: OwerpFormModel[] = [
    {name: 'invoiceNumber', label: 'Invoice No', type: OwerpFormFieldType.TEXT, canEdit: false},
    {name: 'customer', label: 'Customer', type: OwerpFormFieldType.TEXT, canEdit: false},
    {name: 'invoiceType', label: 'Invoice Type', type: OwerpFormFieldType.TEXT, canEdit: false},
    {name: 'invoiceAddress', label: 'Invoice Address', type: OwerpFormFieldType.TEXT, canEdit: false},
    {name: 'memo', label: 'Memo', type: OwerpFormFieldType.TEXT, canEdit: false},
    {name: 'invoiceDate', label: 'Invoice Date', type: OwerpFormFieldType.TEXT, canEdit: false},
    {name: 'costCenter', label: 'Cost Center', type: OwerpFormFieldType.TEXT, canEdit: false},
    {name: 'poNumber', label: 'P.O No', type: OwerpFormFieldType.TEXT, canEdit: false},
    {name: 'paymentTerms', label: 'Payment Terms', type: OwerpFormFieldType.TEXT, canEdit: false},
    {name: 'message', label: 'Message', type: OwerpFormFieldType.TEXT, canEdit: false, size: OwerpFormFieldSize.LARGE}
  ];
  public detailsData: any = {};
  //endregion

  //region Items Details
  public itemTableCols: OwerpTableColumns = {
    item: {title: 'Item', type: OwerpTableColumnType.TEXT},
    description: {title: 'Description', type: OwerpTableColumnType.TEXT},
    unitAmount: {title: 'Unit Amount', type: OwerpTableColumnType.TEXT},
    amount: {title: 'Amount', type: OwerpTableColumnType.TEXT},
    tax: {title: 'Tax', type: OwerpTableColumnType.TEXT},
    taxAmount: {title: 'Tax  Amount', type: OwerpTableColumnType.TEXT},
    costCenter: {title: 'Cost Center', type: OwerpTableColumnType.TEXT}
  };
  public itemSummaryFields: OwerpFormModel[] = [
    {name: 'taxTotalAmount', label: 'Total Amount Without Tax', canEdit: false, type: OwerpFormFieldType.TEXT},
    {name: 'totalAmount', label: 'Total Amount', canEdit: false, type: OwerpFormFieldType.TEXT}
  ];
  public items: any[] = [];
  public itemSummaryData: any = {};
  public itemTableSelectionMode: OwerpSelectionMode.SINGLE;
  //endregion

  //region Authorization
  public authFields: OwerpFormModel[] = [
    {
      name: 'enteredBy',
      type: OwerpFormFieldType.TEXT,
      label: 'Entered By',
      canEdit: false,
      size: OwerpFormFieldSize.MEDIUM
    },
    {
      name: 'enteredOn',
      type: OwerpFormFieldType.TEXT,
      label: 'Entered On',
      canEdit: false,
      size: OwerpFormFieldSize.MEDIUM
    },
    {
      name: 'checkedBy',
      type: OwerpFormFieldType.TEXT,
      label: 'Checked By',
      canEdit: false,
      size: OwerpFormFieldSize.MEDIUM
    },
    {
      name: 'checkedOn',
      type: OwerpFormFieldType.TEXT,
      label: 'Checked On',
      canEdit: false,
      size: OwerpFormFieldSize.MEDIUM
    },
    {
      name: 'checkerNote',
      type: OwerpFormFieldType.TEXT,
      label: 'Checker\'s Note',
      canEdit: false,
      size: OwerpFormFieldSize.LARGE
    },
    {
      name: 'authorizedBy',
      type: OwerpFormFieldType.TEXT,
      label: 'Authorized By',
      canEdit: false,
      size: OwerpFormFieldSize.MEDIUM
    },
    {
      name: 'authorizedOn',
      type: OwerpFormFieldType.TEXT,
      label: 'Authorized On',
      canEdit: false,
      size: OwerpFormFieldSize.MEDIUM
    },
    {
      name: 'approverNote',
      type: OwerpFormFieldType.TEXT,
      label: 'Approver\'s Note',
      canEdit: false,
      size: OwerpFormFieldSize.LARGE
    }
  ];
  public authData: any = {};

  //endregion

  constructor(private service: SalesInvoiceService,
              private route: ActivatedRoute
             ) {
  }

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.loadData(id);
  }

  private loadData(id: string): void {
    this.service.fetch(id).subscribe(
      (res: ApiResponse) => {
        this.detailsData = {
          invoiceNumber: res.data['invoiceNumber'],
          customer: `${res.data['customer']['customerName']}`,
          invoiceType: res.data['invoiceType'],
          invoiceAddress: res.data['invoiceAddress'],
          memo: res.data['memo'],
          invoiceDate: res.data['invoiceDate'],
          costCenter: res.data['costCenter']['name'],
          poNumber: res.data['poNumber'],
          paymentTerms: `${res.data['paymentTerms']['description']}(${res.data['paymentTerms']['term']})`,
          message: res.data['message']
        };

        // loading item and summary data
        this.loadItemData(res.data['salesInvoiceItems']);
        this.itemSummaryData = {
          taxTotalAmount: res.data['taxTotalAmount'],
          totalAmount: res.data['totalAmount']
        };

        // loading auth data
        this.authData = {
          enteredBy: this.getNameText(res.data['enteredBy']),
          enteredOn: res.data['enteredOn'],
          checkedBy: this.getNameText(res.data['checkedBy']),
          checkedOn: res.data['checkedOn'],
          checkerNote: res.data['checkerNote'],
          authorizedBy: this.getNameText(res.data['authorizedBy']),
          authorizedOn: res.data['authorizedOn'],
          approverNote: res.data['approverNote']
        };
      }
    );
  }

  private loadItemData(data: any[]): void {
    this.items = data.map((d: any) => {
      return {
        item: `${d['customerItem']['itemName']}`,
        description: d['itemDescription'],
        unitAmount: d['unitValue'],
        amount: d['amount'],
        tax: `${d['taxGroup']['groupCode']}-${d['taxGroup']['description']}`,
        taxAmount: d['taxAmount'],
        costCenter: `${d['costCenter']['code']}-${d['costCenter']['name']}`
      };
    });
  }

  private getNameText(data: any): string {
    if (!data) {
      return '';
    }
    return `${data['firstName']} ${data['lastName']} (${data['username']})`;
  }

}
