import {Component, OnInit} from '@angular/core';
import {OwerpFormFieldSize, OwerpFormFieldType, OwerpFormModel} from '../../../../@control/form/owerp-form.model';
import {OwerpActionModel} from '../../../../@control/action/owerp-action.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UserMessageService} from '../../../../services/user-message.service';
import {ApiResponse} from '../../../../model/api-model';
import {PaymentTermsService} from '../payment-terms.service';

@Component({
  selector: 'ngx-owerp-view-payment-terms',
  templateUrl: './view-payment-terms.component.html',
  styleUrls: ['./view-payment-terms.component.css']
})
export class ViewPaymentTermsComponent implements OnInit {

  public fields: OwerpFormModel[] = [
    {name: 'term', canEdit: true, type: OwerpFormFieldType.NUMBER, label: 'Term (Days)'},
    {name: 'status', canEdit: true, type: OwerpFormFieldType.BOOLEAN, label: 'Status'},
    {
      name: 'description',
      canEdit: true,
      type: OwerpFormFieldType.TEXT,
      label: 'Description',
      size: OwerpFormFieldSize.LARGE
    },
    {
      name: 'discount',
      canEdit: true,
      type: OwerpFormFieldType.NUMBER,
      label: 'Discount (%)',
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'discountDatesBefore',
      canEdit: true,
      type: OwerpFormFieldType.NUMBER,
      label: 'Discount if paid within (Days)',
      size: OwerpFormFieldSize.SMALL
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
              private service: PaymentTermsService,
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
        this.ums.success(`New Payment Term ${res.data['term']} created successfully.`);
        this.navigateToViewPage(res['data']['id']);
      });
    } else {
      this.service.update(this.id, data).subscribe((res: ApiResponse) => {
        this.ums.success(`Payment Term ${res.data['term']} saved successfully.`);
        this.navigateToViewPage(res['data']['id']);
      });
    }
  }

  public cancel(): void {
    if (this.mode === 'edit') {
      this.navigateToViewPage(this.id);
    } else {
      this.router.navigateByUrl('/pages/master-data/payment-terms');
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
    this.router.navigate(['payment-terms', id], {relativeTo: this.route.parent});
  }

}
