import {Component, OnInit} from '@angular/core';
import {
  OwerpAutoCompleteDataModel,
  OwerpEnumDataModel,
  OwerpFormFieldSize,
  OwerpFormFieldType,
  OwerpFormModel
} from '../../../../@control/form/owerp-form.model';
import {OwerpActionModel} from '../../../../@control/action/owerp-action.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UserMessageService} from '../../../../services/user-message.service';
import {ApiResponse} from '../../../../model/api-model';
import {TaxGroupsService} from '../tax-groups.service';
import {TaxTypesService} from '../../tax-types/tax-types.service';

@Component({
  selector: 'ngx-owerp-view-tax-groups',
  templateUrl: './view-tax-groups.component.html',
  styleUrls: ['./view-tax-groups.component.css']
})
export class ViewTaxGroupsComponent implements OnInit {

  public fields: OwerpFormModel[] = [
    {name: 'groupCode', canEdit: true, type: OwerpFormFieldType.TEXT, label: 'Tax Group Code', required: true},
    {name: 'status', canEdit: true, type: OwerpFormFieldType.BOOLEAN, label: 'Status'},
    {
      name: 'description',
      canEdit: true,
      type: OwerpFormFieldType.TEXT,
      label: 'Description',
      size: OwerpFormFieldSize.MEDIUM
    },
    {
      name: 'finTaxType_01',
      canEdit: true,
      type: OwerpFormFieldType.AUTOCOMPLETE,
      label: 'Tax Type',
      size: OwerpFormFieldSize.SMALL,
      autoComplete: {
        label: 'taxCode',
        value: 'id'
      }
    },
    {
      name: 'taxOperator_01',
      canEdit: true,
      type: OwerpFormFieldType.RADIO,
      label: 'Tax Operator',
      size: OwerpFormFieldSize.SMALL,
      required: true
    },
    {
      name: 'finTaxType_02',
      canEdit: true,
      type: OwerpFormFieldType.AUTOCOMPLETE,
      label: 'Tax Type',
      size: OwerpFormFieldSize.SMALL,
      autoComplete: {
        label: 'taxCode',
        value: 'id'
      }
    }
  ];

  public actions: OwerpActionModel[] = [
    {name: 'editType', icon: 'brush-outline', status: 'warning', execute: this.navigateToEdit.bind(this)}
  ];

  public autoCompleteData: OwerpAutoCompleteDataModel = {};
  public enumDataModel: OwerpEnumDataModel = {};
  public data: any = {status: true};
  public id: string = '';
  public mode: 'create' | 'view' | 'edit' = 'create';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: TaxGroupsService,
              private taxTypesService: TaxTypesService,
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

    // if (this.mode === 'create' || this.mode === 'edit') {
    // }
      this.fetchTaxTypeData();
    this.loadTaxOperatorData();
  }

  public navigateToEdit(data: any): void {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  public save(data: any): void {
    if (this.mode === 'create') {
      this.service.create(data).subscribe((res: ApiResponse) => {
        this.ums.success(`New Tax Group ${res.data['groupCode']} created successfully.`);
        this.navigateToViewPage(res['data']['id']);
      });
    } else {
      this.service.update(this.id, data).subscribe((res: ApiResponse) => {
        this.ums.success(`Tax Group ${res.data['groupCode']} saved successfully.`);
        this.navigateToViewPage(res['data']['id']);
      });
    }
  }

  public cancel(): void {
    if (this.mode === 'edit') {
      this.navigateToViewPage(this.id);
    } else {
      this.router.navigateByUrl('/pages/master-data/tax-groups');
    }
  }

  private loadData(): void {
    this.service.fetch(this.id).subscribe(
      (res: ApiResponse) => {
        const object: any = res.data;
        this.data = object;
      }
    );
  }

  private navigateToViewPage(id: string): void {
    this.router.navigate(['tax-groups', id], {relativeTo: this.route.parent});
  }

  private fetchTaxTypeData(): void {
    this.taxTypesService.fetchAllActive().subscribe(
      (res: ApiResponse) => {
        const auto: OwerpAutoCompleteDataModel = this.autoCompleteData;
        auto['finTaxType_01'] = res.data;
        auto['finTaxType_02'] = res.data;
        this.autoCompleteData = Object.assign({}, auto);
      }
    );
  }

  public loadTaxOperatorData(): void {
    this.enumDataModel['taxOperator_01'] = [{label: 'Inclusive', value: 'INCLUSIVE'}, {
      label: 'Exclusive',
      value: 'EXCLUSIVE'
    }];
    this.enumDataModel = Object.assign({}, this.enumDataModel);
  }
}
