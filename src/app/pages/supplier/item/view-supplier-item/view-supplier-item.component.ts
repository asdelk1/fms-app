import {Component, OnInit} from '@angular/core';
import {OwerpFormFieldSize, OwerpFormFieldType, OwerpFormModel} from '../../../../@control/form/owerp-form.model';
import {OwerpActionModel} from '../../../../@control/action/owerp-action.model';
import {UserMessageService} from '../../../../services/user-message.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiResponse} from '../../../../model/api-model';
import {SupplierItemService} from '../../supplier-item.service';

@Component({
  selector: 'ngx-owerp-view-supplier-item',
  templateUrl: './view-supplier-item.component.html',
  styleUrls: ['./view-supplier-item.component.css']
})
export class ViewSupplierItemComponent implements OnInit {

  public fields: OwerpFormModel[] = [
    {
      name: 'name',
      type: OwerpFormFieldType.TEXT,
      label: 'Name',
      required: true,
      canEdit: true,
      size: OwerpFormFieldSize.MEDIUM
    },
    {
      name: 'description',
      type: OwerpFormFieldType.TEXT,
      label: 'Description',
      required: true,
      canEdit: true,
      size: OwerpFormFieldSize.LARGE
    },
    {name: 'state', type: OwerpFormFieldType.BOOLEAN, label: 'State', canEdit: true}
  ];
  public actions: OwerpActionModel[] = [
    {
      name: 'editSupplierItem',
      status: 'warning',
      icon: 'brush-outline',
      execute: this.editSupplierItem.bind(this)
    }
  ];
  public mode: 'create' | 'update' | 'read-only' = 'create';
  public data: any;
  public id: string = '';

  constructor(private service: SupplierItemService,
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
      this.router.navigateByUrl('/pages/suppliers/items');
    } else {
      this.router.navigateByUrl('/pages/suppliers/items/' + this.id);
    }
  }

  public saveItem(data: any): void {
    if (this.mode === 'create') {
      this.service.create(data).subscribe(
        (res: ApiResponse) => {
          this.ums.success('Supplier Item Created Successfully');
          this.router.navigateByUrl('/pages/suppliers/items/' + this.id);
        }
      );
    } else {
      this.service.update(this.id, data).subscribe(
        (res: ApiResponse) => {
          this.ums.success('Supplier Item Saved Successfully');
          this.router.navigateByUrl('/pages/suppliers/items/' + this.id);
        }
      );
    }
  }

  private loadData(): void {
    this.service.fetch(this.id).subscribe(
      (res: ApiResponse) => {
        this.data = res.data;
      }
    );
  }

  public editSupplierItem(): void {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
}
