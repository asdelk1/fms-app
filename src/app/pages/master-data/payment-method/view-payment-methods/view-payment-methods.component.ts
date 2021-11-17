import {Component, OnInit} from '@angular/core';
import {OwerpFormFieldSize, OwerpFormFieldType, OwerpFormModel} from '../../../../@control/form/owerp-form.model';
import {OwerpActionModel} from '../../../../@control/action/owerp-action.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UserMessageService} from '../../../../services/user-message.service';
import {PaymentMethodService} from '../payment-method.service';
import {ApiResponse} from '../../../../model/api-model';

@Component({
  selector: 'ngx-owerp-view-payment-methods',
  templateUrl: './view-payment-methods.component.html',
  styleUrls: ['./view-payment-methods.component.css']
})
export class ViewPaymentMethodsComponent implements OnInit {

  public fields: OwerpFormModel[] = [
    {name: 'paymentMethod', canEdit: true, type: OwerpFormFieldType.TEXT, label: 'Method'},
    {name: 'status', canEdit: true, type: OwerpFormFieldType.BOOLEAN, label: 'Status'},
    {
      name: 'description',
      canEdit: true,
      type: OwerpFormFieldType.TEXT,
      label: 'Description',
      size: OwerpFormFieldSize.LARGE
    }
  ];

  public actions: OwerpActionModel[] = [
    {name: 'editType', icon: 'brush-outline', status: 'warning', execute: this.navigateToEdit.bind(this)}
  ];

  public data: any = {};
  public id: string = '';
  public mode: 'create' | 'view' | 'edit' = 'create';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: PaymentMethodService,
              private ums: UserMessageService) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.data && this.route.snapshot.data['mode']) {
      this.mode = this.route.snapshot.data['mode'];
    } else {
      this.mode = 'create';
    }

    if (this.mode !== 'create') {
      this.id = this.route.snapshot.paramMap.get('id');
      this.loadData();
    }
  }

  public navigateToEdit(data: any): void {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  public save(data: any): void {
    if (this.mode === 'create') {
      this.service.create(data).subscribe((res: ApiResponse) => {
        this.ums.success(`New Payment Method ${res.data['paymentMethod']} created successfully.`);
        this.navigateToViewPage(res['data']['id']);
      });
    } else {
      this.service.update(this.id, data).subscribe((res: ApiResponse) => {
        this.ums.success(`Payment Method ${res.data['paymentMethod']} saved successfully.`);
        this.navigateToViewPage(res['data']['id']);
      });
    }
  }

  public cancel(): void {
    if (this.mode === 'edit') {
      this.navigateToViewPage(this.id);
    } else {
      this.router.navigateByUrl('/pages/master-data/payment-methods');
    }
  }

  private loadData(): void {
    this.service.fetch(this.id).subscribe(
      (res: ApiResponse) => {
        this.data = res.data;
      }
    );
  }

  private navigateToViewPage(id: string): void {
    this.router.navigate(['payment-methods', id], {relativeTo: this.route.parent});
  }

}
