import {Component, Input, OnInit} from '@angular/core';
import {OwerpFormFieldSize, OwerpFormFieldType, OwerpFormModel} from '../../../../@control/form/owerp-form.model';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'ngx-owerp-journal-entry-operation',
  templateUrl: './journal-entry-operation.component.html',
  styleUrls: ['./journal-entry-operation.component.css']
})
export class JournalEntryOperationComponent implements OnInit {

  @Input()
  public title: string = 'Check Sales Invoice';
  @Input()
  public showEmail: boolean = false;
  public fields: OwerpFormModel[] = [
    {name: 'note', canEdit: true, type: OwerpFormFieldType.TEXT, label: 'Note', size: OwerpFormFieldSize.LARGE}
  ];
  public data: any = {};

  constructor(private dialogService: NbDialogRef<JournalEntryOperationComponent>) {
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
