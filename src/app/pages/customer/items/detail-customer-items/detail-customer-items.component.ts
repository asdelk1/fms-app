import {Component, OnInit} from '@angular/core';
import {
  OwerpAutoCompleteDataModel,
  OwerpEnumDataModel,
  OwerpFormFieldSize,
  OwerpFormFieldType,
  OwerpFormModel
} from '../../../../@control/form/owerp-form.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UserMessageService} from '../../../../services/user-message.service';
import {CustomerItemService} from '../customer-item.service';
import {ApiResponse} from '../../../../model/api-model';
import {LedgerService} from '../../../ledger/ledger.service';
import {CustomerTypeService} from '../../../customer-type/customer-type.service';

@Component({
  selector: 'ngx-owerp-detail-customer-items',
  templateUrl: './detail-customer-items.component.html',
  styleUrls: ['./detail-customer-items.component.css']
})
export class DetailCustomerItemsComponent implements OnInit {

  public fields: OwerpFormModel[] = [
    {
      name: 'customerType',
      canEdit: true,
      type: OwerpFormFieldType.AUTOCOMPLETE,
      label: 'Customer Type',
      autoComplete: 'id'
    },
    {
      name: 'itemName',
      canEdit: true,
      required: true,
      type: OwerpFormFieldType.TEXT,
      label: 'Item Name'
    },
    {
      name: 'status',
      canEdit: true,
      type: OwerpFormFieldType.BOOLEAN,
      label: 'Status',
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'remarks',
      canEdit: true,
      type: OwerpFormFieldType.TEXT,
      label: 'Remarks',
      size: OwerpFormFieldSize.LARGE
    },
    {
      name: 'ledgerAccount',
      canEdit: true,
      type: OwerpFormFieldType.AUTOCOMPLETE,
      label: 'Ledger Control Account',
      size: OwerpFormFieldSize.SMALL,
      autoComplete: 'id'
    },
    {
      name: 'formulaType',
      canEdit: true,
      required: true,
      type: OwerpFormFieldType.RADIO,
      label: 'Amount Calculation Formula',
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'fixedAmount',
      canEdit: true,
      type: OwerpFormFieldType.NUMBER,
      label: 'Fixed Amount',
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'fixedPercentage',
      canEdit: true,
      type: OwerpFormFieldType.NUMBER,
      label: 'Fixed Percentage',
      size: OwerpFormFieldSize.SMALL
    }
  ];

  public data: any = {status: true, formulaType: 'NONE'};
  public autoCompleteData: OwerpAutoCompleteDataModel = {};
  public formulaData: OwerpEnumDataModel = {
    formulaType: [
      {value: 'NONE', label: 'None'},
      {value: 'FIXED', label: 'Fixed'},
      {value: 'SLAB', label: 'Slab'}
    ]
  };
  public mode: string = 'create';
  public id: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: CustomerItemService,
              private customerTypeService: CustomerTypeService,
              private ledgerAccountService: LedgerService,
              private ums: UserMessageService) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.data && this.route.snapshot.data['mode']) {
      this.mode = this.route.snapshot.data['mode'];
    } else {
      this.mode = 'create';
    }

    this.loadCustomerTypes();
    this.loadLedgerAccounts();

    if (this.mode !== 'create') {
      this.id = this.route.snapshot.paramMap.get('id');
      this.loadData();
    }
  }

  public save(data: any): void {
    if (this.mode === 'create') {
      this.service.create(data).subscribe((res: ApiResponse) => {
        this.ums.success(`New Customer Item ${res.data['itemName']} created successfully.`);
        this.cancel();
      });
    } else {
      this.service.update(this.id, data).subscribe((res: ApiResponse) => {
        this.ums.success(`Customer Item ${res.data['itemName']} saved successfully.`);
        this.cancel();
      });
    }
  }

  public cancel(): void {
    this.router.navigateByUrl('/pages/customers/items');
  }

  private loadData(): void {
    this.service.fetch(this.id).subscribe(
      (res: ApiResponse) => {
        this.data = res.data;
      }
    );
  }

  private loadCustomerTypes(): void {
    this.customerTypeService.getAllActive().subscribe(
      (res: ApiResponse) => {
        this.autoCompleteData['customerType'] = this.customerTypeService.getAutoCompleteData(res.data);
        this.autoCompleteData = Object.assign({}, this.autoCompleteData);
      }
    );
  }

  private loadLedgerAccounts(): void {
    this.ledgerAccountService.fetchActive().subscribe(
      (res: ApiResponse) => {
        this.autoCompleteData['ledgerAccount'] = this.ledgerAccountService.getLedgerAccountAutoCompleteData(res.data);
        this.autoCompleteData = Object.assign({}, this.autoCompleteData);
      }
    );
  }
}
