import {Component, Input, OnInit} from '@angular/core';
import {OwerpFormFieldSize, OwerpFormFieldType, OwerpFormModel} from '../../../@control/form/owerp-form.model';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'ngx-owerp-approve-sales-invoice',
  templateUrl: './check-sales-invoice.component.html',
  styleUrls: ['./check-sales-invoice.component.css']
})
export class CheckSalesInvoiceComponent implements OnInit {

  @Input()
  public title: string = 'Check Sales Invoice';
  @Input()
  public showEmail: boolean = false;
  public fields: OwerpFormModel[] = [
    {name: 'note', canEdit: true, type: OwerpFormFieldType.TEXT, label: 'Note', size: OwerpFormFieldSize.LARGE},
    {
      name: 'sendEmail',
      canEdit: true,
      type: OwerpFormFieldType.BOOLEAN,
      label: 'Send Email',
      size: OwerpFormFieldSize.LARGE
    }
  ];
  public data: any = {};

  constructor(private dialogService: NbDialogRef<CheckSalesInvoiceComponent>) {
  }

  ngOnInit(): void {
  }

  public onSave(data: any): void {
    this.dialogService.close(data);
  }

  public onCancel(): void {
    this.dialogService.close();
  }

}
