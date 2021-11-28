import {Component, OnInit} from '@angular/core';
import {OwerpFormFieldSize, OwerpFormFieldType, OwerpFormModel} from '../../../../@control/form/owerp-form.model';
import {OwerpActionModel} from '../../../../@control/action/owerp-action.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UserMessageService} from '../../../../services/user-message.service';
import {ApiResponse} from '../../../../model/api-model';
import {AccountingPeriodService} from '../accounting-period.service';

@Component({
  selector: 'ngx-owerp-view-accounting-period',
  templateUrl: './view-accounting-period.component.html',
  styleUrls: ['./view-accounting-period.component.css']
})
export class ViewAccountingPeriodComponent implements OnInit {

  public fields: OwerpFormModel[] = [
    {
      name: 'startDate',
      canEdit: true,
      type: OwerpFormFieldType.DATE,
      label: 'Start Date',
      required: true,
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'endDate',
      canEdit: true,
      type: OwerpFormFieldType.DATE,
      label: 'End Date',
      required: true,
      size: OwerpFormFieldSize.SMALL
    },
    {name: 'status', canEdit: true, type: OwerpFormFieldType.BOOLEAN, label: 'Status'}
  ];

  public actions: OwerpActionModel[] = [
    {name: 'editType', icon: 'brush-outline', status: 'warning', execute: this.navigateToEdit.bind(this)}
  ];

  public data: any = {status: true};
  public id: string = '';
  public mode: 'create' | 'view' | 'edit' = 'create';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: AccountingPeriodService,
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
        this.ums.success(`New Accounting Period created successfully.`);
        this.navigateToViewPage(res['data']['id']);
      });
    } else {
      this.service.update(this.id, data).subscribe((res: ApiResponse) => {
        this.ums.success(`Accounting Period saved successfully.`);
        this.navigateToViewPage(res['data']['id']);
      });
    }
  }

  public cancel(): void {
    if (this.mode === 'edit') {
      this.navigateToViewPage(this.id);
    } else {
      this.router.navigateByUrl('/pages/master-data/accounting-periods');
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
    this.router.navigate(['accounting-periods', id], {relativeTo: this.route.parent});
  }

}
