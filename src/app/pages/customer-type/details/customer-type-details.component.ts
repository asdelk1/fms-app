import {Component, OnInit} from '@angular/core';
import {OwerpFormFieldSize, OwerpFormFieldType, OwerpFormModel} from '../../../@control/form/owerp-form.model';
import {CustomerTypeService} from '../customer-type.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ApiResponse} from '../../../model/api-model';
import {UserMessageService} from '../../../services/user-message.service';
import {take} from 'rxjs/operators';
import {OwerpActionModel} from '../../../@control/action/owerp-action.model';

@Component({
  selector: 'ngx-owerp-create-type',
  templateUrl: './customer-type-details.component.html',
  styleUrls: ['./customer-type-details.component.css']
})
export class CustomerTypeDetailsComponent implements OnInit {

  public fields: OwerpFormModel[] = [
    {name: 'typeCode', type: OwerpFormFieldType.TEXT, canEdit: false, label: 'Code'},
    {name: 'typeName', type: OwerpFormFieldType.TEXT, canEdit: false, label: 'Name'},
    {name: 'remarks', type: OwerpFormFieldType.TEXT, canEdit: false, label: 'Remarks', size: OwerpFormFieldSize.MEDIUM},
    {name: 'status', type: OwerpFormFieldType.BOOLEAN, canEdit: true, label: 'Status'}
  ];
  public actions: OwerpActionModel[] = [
    {
      name: 'editCustomerType',
      status: 'warning',
      icon: 'brush-outline',
      execute: this.editCustomerType.bind(this)
    }
  ];
  public data: any;
  public canEdit: boolean;
  private mode: 'update' | 'new' = 'new';

  constructor(private service: CustomerTypeService,
              private router: Router,
              private route: ActivatedRoute,
              private ums: UserMessageService) {
  }

  ngOnInit(): void {
    const paramMap: ParamMap = this.route.snapshot.paramMap;
    if (paramMap.has('id')) {
      this.fetchType(paramMap.get('id'));
      this.canEdit = this.route.snapshot.url.length === 2;
      this.mode = 'update';
    } else {
      this.canEdit = true;
      this.mode = 'new';
    }
  }

  public saveCustomerType(data: any) {

    if (this.mode === 'new') {
      this.service.create(data).pipe(take(1)).subscribe(
        (res: ApiResponse) => {
          this.ums.success('Customer Type Created Successfully');
          this.cancelForm();
        });
    } else {
      this.service.update(data, this.data['id']).pipe(take(1)).subscribe(
        (res: ApiResponse) => {
          this.ums.success('Customer Type Saved Successfully');
          this.cancelForm();
        });
    }
  }

  public cancelForm(): void {
    if (this.mode === 'new') {
      this.router.navigate(['customer-types'], {relativeTo: this.route.parent.parent});
    } else {
      this.router.navigate(['customer-types', this.data['id']], {relativeTo: this.route.parent.parent});
    }
  }

  private fetchType(id: string): void {
    this.service.get(id).pipe(take(1)).subscribe(
      (res: ApiResponse) => {
        this.data = res.data;
      }
    );
  }

  public editCustomerType(id): void {
    if (!this.data || Object.keys(this.data).length <= 0) {
      return;
    }
    this.router.navigate(['edit'], {relativeTo: this.route});

  }

}
