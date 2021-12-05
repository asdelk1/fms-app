import {Component, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {OwerpFormFieldSize, OwerpFormFieldType, OwerpFormModel} from '../../../../@control/form/owerp-form.model';

@Component({
  selector: 'ngx-owerp-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  public fields: OwerpFormModel[] = [
    {
      name: 'item',
      label: 'Item',
      type: OwerpFormFieldType.TEXT,
      required: true,
      autoComplete: 'id',
      canEdit: true,
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'description',
      label: 'Description',
      type: OwerpFormFieldType.TEXT,
      required: true,
      canEdit: true,
      size: OwerpFormFieldSize.MEDIUM
    },
    {
      name: 'unitAmount',
      label: 'Unit Amount',
      type: OwerpFormFieldType.TEXT,
      required: true,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'tax',
      label: 'Tax',
      type: OwerpFormFieldType.TEXT,
      required: true,
      autoComplete: 'id',
      canEdit: true,
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'costCenter',
      label: 'Cost Center',
      type: OwerpFormFieldType.TEXT,
      required: true,
      autoComplete: 'id',
      canEdit: true,
      size: OwerpFormFieldSize.SMALL
    }
  ];

  public data: any = {};

  constructor(private ref: NbDialogRef<AddItemComponent>) {
  }

  ngOnInit(): void {
  }

  public cancel(): void {
    this.ref.close();
  }

  public addItem(item: any): void {
    this.ref.close(item);
  }

}
