import {Component, OnInit} from '@angular/core';
import {OwerpFormFieldSize, OwerpFormFieldType, OwerpFormModel} from '../../../../@control/form/owerp-form.model';
import {OwerpActionModel} from '../../../../@control/action/owerp-action.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UserMessageService} from '../../../../services/user-message.service';
import {ApiResponse} from '../../../../model/api-model';
import {CostCenterService} from '../cost-center.service';

@Component({
  selector: 'ngx-owerp-view-cost-center',
  templateUrl: './view-cost-center.component.html',
  styleUrls: ['./view-cost-center.component.css']
})
export class ViewCostCenterComponent implements OnInit {

  public fields: OwerpFormModel[] = [
    {name: 'name', canEdit: true, required: true, type: OwerpFormFieldType.TEXT, label: 'Name'},
    {
      name: 'code',
      canEdit: true,
      type: OwerpFormFieldType.TEXT,
      label: 'Code',
      required: true,
      size: OwerpFormFieldSize.SMALL
    },
    {name: 'status', canEdit: true, type: OwerpFormFieldType.BOOLEAN, label: 'Status'},
    {
      name: 'remarks',
      canEdit: true,
      type: OwerpFormFieldType.TEXT,
      label: 'Remarks',
      size: OwerpFormFieldSize.LARGE
    }
  ];

  public actions: OwerpActionModel[] = [
    {name: 'editType', icon: 'brush-outline', status: 'warning', execute: this.navigateToEdit.bind(this)}
  ];

  public data: any = {status: true};
  public id: string = '';
  public mode: 'create' | 'view' | 'edit' = 'create';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: CostCenterService,
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
        this.ums.success(`New Cost Center ${res.data['name']} created successfully.`);
        this.navigateToViewPage(res['data']['id']);
      });
    } else {
      this.service.update(this.id, data).subscribe((res: ApiResponse) => {
        this.ums.success(`Cost Center ${res.data['name']} saved successfully.`);
        this.navigateToViewPage(res['data']['id']);
      });
    }
  }

  public cancel(): void {
    if (this.mode === 'edit') {
      this.navigateToViewPage(this.id);
    } else {
      this.router.navigateByUrl('/pages/master-data/cost-centers');
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
    this.router.navigate(['cost-centers', id], {relativeTo: this.route.parent});
  }

}
