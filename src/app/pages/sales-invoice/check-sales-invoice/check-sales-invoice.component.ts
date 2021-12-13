import {Component, OnInit} from '@angular/core';
import {OwerpFormFieldSize, OwerpFormFieldType, OwerpFormModel} from '../../../@control/form/owerp-form.model';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'ngx-owerp-approve-sales-invoice',
  templateUrl: './check-sales-invoice.component.html',
  styleUrls: ['./check-sales-invoice.component.css']
})
export class CheckSalesInvoiceComponent implements OnInit {

  public title: string = 'Check Sales Invoice';
  public fields: OwerpFormModel[] = [
    {name: 'note', canEdit: true, type: OwerpFormFieldType.TEXT, label: 'Note', size: OwerpFormFieldSize.LARGE}
  ];
  public data: any = {};

  constructor(private dialogService: NbDialogRef<CheckSalesInvoiceComponent>) {
  }

  ngOnInit(): void {
  }

  public onSave(data: any): void {
    this.dialogService.close(data['note']);
  }

}
