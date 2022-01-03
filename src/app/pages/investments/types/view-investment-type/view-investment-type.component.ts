import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {InvestmentTypesService} from '../../investment-types.service';
import {ApiResponse} from '../../../../model/api-model';
import {
  OwerpEnumDataModel, OwerpFormFieldSize,
  OwerpFormFieldType,
  OwerpFormModel,
  OwerpLabelValueModel
} from '../../../../@control/form/owerp-form.model';
import {UserMessageService} from '../../../../services/user-message.service';
import {OwerpActionModel} from '../../../../@control/action/owerp-action.model';

@Component({
  selector: 'ngx-owerp-view-investment-type',
  templateUrl: './view-investment-type.component.html',
  styleUrls: ['./view-investment-type.component.css']
})
export class ViewInvestmentTypeComponent implements OnInit {

  public fields: OwerpFormModel[] = [
    {name: 'code', label: 'Code', type: OwerpFormFieldType.TEXT, required: true, canEdit: true},
    {name: 'name', label: 'Name', type: OwerpFormFieldType.TEXT, required: true, canEdit: true},
    {name: 'active', label: 'Active', type: OwerpFormFieldType.BOOLEAN, required: true, canEdit: true},
    {name: 'timeUnit', label: 'Time Unit', type: OwerpFormFieldType.SELECT, required: true, canEdit: true},
    {
      name: 'firstReminder',
      label: 'First Reminder',
      type: OwerpFormFieldType.NUMBER,
      required: false,
      canEdit: true,
      size: OwerpFormFieldSize.MEDIUM
    },
    {
      name: 'firstReminderTimeUnit',
      label: 'Time Unit (Fist Reminder)',
      type: OwerpFormFieldType.SELECT,
      required: false,
      canEdit: true,
      size: OwerpFormFieldSize.MEDIUM
    },
    {
      name: 'secondReminder',
      label: 'Second Reminder',
      type: OwerpFormFieldType.NUMBER,
      required: false,
      canEdit: true,
      size: OwerpFormFieldSize.MEDIUM
    },
    {
      name: 'secondReminderTimeUnit',
      label: 'Time Unit (Second Reminder)',
      type: OwerpFormFieldType.SELECT,
      required: false,
      canEdit: true,
      size: OwerpFormFieldSize.MEDIUM
    },
    {
      name: 'thirdReminder',
      label: 'Third Reminder',
      type: OwerpFormFieldType.NUMBER,
      required: false,
      canEdit: true,
      size: OwerpFormFieldSize.MEDIUM
    },
    {
      name: 'thirdReminderTimeUnit',
      label: 'Time Unit (Third Reminder)',
      type: OwerpFormFieldType.SELECT,
      required: false,
      canEdit: true,
      size: OwerpFormFieldSize.MEDIUM
    }
  ];

  public actions: OwerpActionModel[] = [
    {name: 'edit', status: 'warning', icon: 'brush-outline', execute: () => {
      this.router.navigateByUrl('/pages/investments/types/edit/' + this.id);
      }}
  ];

  private defaultTimeUnit: string = 'DAYS';
  public data: any = {
    active: true,
    timeUnit: this.defaultTimeUnit,
    firstReminderTimeUnit: this.defaultTimeUnit,
    secondReminderTimeUnit: this.defaultTimeUnit,
    thirdReminderTimeUnit: this.defaultTimeUnit
  };

  public timeUnitEnum: OwerpLabelValueModel[] = [
    {value: 'DAYS', label: 'Days'}, {
      value: 'WEEKS',
      label: 'Weeks'
    }, {value: 'MONTHS', label: 'Months'}];

  public enumeratedData: OwerpEnumDataModel = {
    timeUnit: this.timeUnitEnum,
    firstReminderTimeUnit: this.timeUnitEnum,
    secondReminderTimeUnit: this.timeUnitEnum,
    thirdReminderTimeUnit: this.timeUnitEnum
  };

  private id: string | undefined = undefined;
  private mode: string = 'view';
  public editable: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: InvestmentTypesService,
              private messageService: UserMessageService) {
  }

  ngOnInit(): void {

    if (this.route.snapshot.data && this.route.snapshot.data['mode']) {
      this.mode = this.route.snapshot.data['mode'];
    }

    if (this.mode !== 'create') {
      this.id = this.route.snapshot.paramMap.get('id');
      this.loadData();
    }

    this.editable = this.mode !== 'view';

  }

  private loadData(): void {
    this.service.fetch(this.id).subscribe(
      (res: ApiResponse) => {
        this.data = res.data;
      }
    );
  }

  public saveType(data: any): void {
    if (this.mode === 'create') {
      this.service.create(data).subscribe(this.postProcessor.bind(this));
    } else {
      this.service.update(this.id, data).subscribe(this.postProcessor.bind(this));
    }
  }

  private postProcessor(res: ApiResponse): void {
    this.messageService.success('Type Save Successfully');
    this.router.navigateByUrl('/pages/investments/types/view/' + res.data['id']);
  }

  public cancel(): void {
    if (this.mode === 'create') {
      this.router.navigateByUrl('/pages/investments/types');
    } else {
      this.router.navigateByUrl('/pages/investments/types/view/' + this.id);
    }
  }

}
