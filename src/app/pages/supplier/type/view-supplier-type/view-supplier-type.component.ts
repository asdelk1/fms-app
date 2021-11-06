import {Component, OnInit} from '@angular/core';
import {SupplierService} from '../../supplier.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OwerpFormFieldSize, OwerpFormFieldType, OwerpFormModel} from '../../../../@control/form/owerp-form.model';
import {ApiResponse} from '../../../../model/api-model';
import {UserMessageService} from '../../../../services/user-message.service';
import {OwerpActionModel} from '../../../../@control/action/owerp-action.model';

@Component({
  selector: 'ngx-owerp-view-supplier-type',
  templateUrl: './view-supplier-type.component.html',
  styleUrls: ['./view-supplier-type.component.css']
})
export class ViewSupplierTypeComponent implements OnInit {

  public fields: OwerpFormModel[] = [
    {name: 'typeCode', type: OwerpFormFieldType.TEXT, label: 'Code', required: true, canEdit: true},
    {name: 'typeName', type: OwerpFormFieldType.TEXT, label: 'Name', required: true, canEdit: true},
    {name: 'status', type: OwerpFormFieldType.BOOLEAN, label: 'Status', canEdit: true},
    {
      name: 'remarks',
      type: OwerpFormFieldType.TEXT,
      label: 'Remarks',
      size: OwerpFormFieldSize.LARGE,
      required: false,
      canEdit: true
    }
  ];
  public actions: OwerpActionModel[] = [
    {
      name: 'editSupplierType',
      status: 'warning',
      icon: 'brush-outline',
      execute: this.editSupplierType.bind(this)
    }
  ];
  public mode: 'create' | 'update' | 'read-only' = 'create';
  public data: any;
  public id: string = '';

  constructor(private service: SupplierService,
              private ums: UserMessageService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    if (this.route.snapshot.data['mode']) {
      this.mode = this.route.snapshot.data['mode'];
    }

    if (this.mode !== 'create') {
      this.id = this.route.snapshot.paramMap.get('id');
      this.loadData();
    }

  }

  public cancel(): void {
    if (this.mode === 'create') {
      this.router.navigateByUrl('/pages/suppliers/types');
    } else {
      this.router.navigate([this.id], {relativeTo: this.route.parent});
    }
  }

  public saveType(data: any): void {
    this.service.createType(data).subscribe(
      (res: ApiResponse) => {
        this.ums.success('Supplier Type Created Successfully');
        this.router.navigate([res.data.id], {relativeTo: this.route.parent});
      }
    );
  }

  private loadData(): void {
    this.service.getType(this.id).subscribe(
      (res: ApiResponse) => {
        this.data = res.data;
      }
    );
  }

  public editSupplierType(): void {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
}
