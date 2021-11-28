import {Component, OnInit} from '@angular/core';
import {LedgerService} from '../ledger.service';
import {
  OwerpEnumDataModel,
  OwerpFormFieldSize,
  OwerpFormFieldType,
  OwerpFormModel,
  OwerpLabelValueModel
} from '../../../@control/form/owerp-form.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiResponse} from '../../../model/api-model';
import {UserMessageService} from '../../../services/user-message.service';

@Component({
  selector: 'ngx-owerp-create-ledger-category',
  templateUrl: './create-ledger-category.component.html',
  styleUrls: ['./create-ledger-category.component.css']
})
export class CreateLedgerCategoryComponent implements OnInit {

  public fields: OwerpFormModel[] = [
    {name: 'accCode', required: true, type: OwerpFormFieldType.TEXT, label: 'Category Code', canEdit: true},
    {
      name: 'accName',
      required: true,
      type: OwerpFormFieldType.TEXT,
      label: 'Category Name',
      canEdit: true,
      size: OwerpFormFieldSize.MEDIUM
    },
    {
      name: 'incomeStatement',
      type: OwerpFormFieldType.RADIO,
      label: 'Income Statements',
      size: OwerpFormFieldSize.MEDIUM,
      required: false,
      canEdit: true,
      groupName: 'ledgerType'
    },
    {
      name: 'balanceSheet',
      type: OwerpFormFieldType.RADIO,
      label: 'Balance Sheet',
      size: OwerpFormFieldSize.MEDIUM,
      required: false,
      canEdit: true,
      groupName: 'ledgerType'
    }
  ];

  public data: any = {status: true};
  public ledgerCategories: OwerpEnumDataModel = {};

  private mode: string = 'create';

  constructor(private ledgerService: LedgerService,
              private messageService: UserMessageService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    if (this.route.snapshot.data['mode']) {
      this.mode = this.route.snapshot.data['mode'];
    }

    if (this.mode === 'edit') {
      const id: string = this.route.snapshot.paramMap.get('id');
      this.fetchLedgerCategory(id);
    }

    this.fetchLedgerTypesCategories();
  }

  public create(data: any) {

    const
      ledgerType: number = data['incomeStatement'] !== '' && data['incomeStatement'] !== undefined ? +data['incomeStatement'] :
        data['balanceSheet'] !== '' && data['balanceSheet'] !== undefined ? +data['balanceSheet'] : 0;
    const category: any = {
      accCode: data['accCode'],
      accName: data['accName'],
      status: true,
      ledgerType: {id: ledgerType}
    };
    this.ledgerService.saveLedgerCategory(category).subscribe(
      (res: ApiResponse) => {
        this.messageService.success(`New Ledger Category ${res.data['accName']}(${res.data['accCode']}) saved successfully.`);
        this.router.navigateByUrl('/pages/master-data/chart-of-accounts');
      }
    );
  }

  public cancel(): void {
    this.router.navigateByUrl('/pages/master-data/chart-of-accounts');
  }

  private fetchLedgerTypesCategories(): void {
    this.ledgerService.fetchLedgerTypeCategories('1').subscribe(
      (res: ApiResponse) => this.processCategoryTypes('incomeStatement', res.data)
    );


    this.ledgerService.fetchLedgerTypeCategories('2').subscribe(
      (res: ApiResponse) => this.processCategoryTypes('balanceSheet', res.data)
    );
  }

  private processCategoryTypes(name: string, data: any[]): void {
    const enums: OwerpLabelValueModel[] = [];
    data.forEach(
      (record: any) => {
        enums.push({
          value: record['id'],
          label: record['typeName']
        });
      }
    );

    this.ledgerCategories[name] = enums;
    this.ledgerCategories = Object.assign({}, this.ledgerCategories);
  }

  private fetchLedgerCategory(id: string): void {
    this.ledgerService.fetchLedgerCategory(id).subscribe(
      (res: ApiResponse) => {
        this.data = res.data;
      }
    );
  }

}
