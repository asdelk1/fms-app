import {Component, OnInit} from '@angular/core';
import {OwerpFormFieldType, OwerpFormModel} from '../../../../@control/form/owerp-form.model';
import {OwerpActionModel} from '../../../../@control/action/owerp-action.model';
import {ActivatedRoute, Router} from '@angular/router';
import {CurrencyTypeService} from '../currency-type.service';
import {ApiResponse} from '../../../../model/api-model';
import {UserMessageService} from '../../../../services/user-message.service';

@Component({
  selector: 'ngx-owerp-view-currency-types',
  templateUrl: './view-currency-types.component.html',
  styleUrls: ['./view-currency-types.component.css']
})
export class ViewCurrencyTypesComponent implements OnInit {

  public fields: OwerpFormModel[] = [
    {name: 'currency', type: OwerpFormFieldType.TEXT, label: 'Currency', required: true, canEdit: true},
    {name: 'status', type: OwerpFormFieldType.BOOLEAN, label: 'Status', canEdit: true, required: true}
  ];

  public actions: OwerpActionModel[] = [
    {name: 'editType', icon: 'brush-outline', status: 'warning', execute: this.navigateToEdit.bind(this)}
  ];

  public data: any = {};
  public id: string = '';
  public mode: 'create' | 'view' | 'edit' = 'create';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: CurrencyTypeService,
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

  private navigateToEdit(): void {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  public save(data: any): void {
    if (this.mode === 'create') {
      this.service.create(data).subscribe((res: ApiResponse) => {
        this.ums.success(`New Currency Type ${res.data['currency']} created successfully.`);
        this.navigateToViewPage(res['data']['id']);
      });
    } else {
      this.service.update(this.id, data).subscribe((res: ApiResponse) => {
        this.ums.success(`Currency Type ${res.data['currency']} saved successfully.`);
        this.navigateToViewPage(res['data']['id']);
      });
    }
  }

  public cancel(): void {
    if (this.mode === 'edit') {
      this.navigateToViewPage(this.id);
    } else {
      this.router.navigateByUrl('/pages/master-data/currency-types');
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
    this.router.navigate(['currency-types', id], {relativeTo: this.route.parent});
  }

}
