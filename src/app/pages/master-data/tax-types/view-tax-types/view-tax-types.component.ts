import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserMessageService} from '../../../../services/user-message.service';
import {ApiResponse} from '../../../../model/api-model';
import {TaxTypesService} from '../tax-types.service';
import {
  OwerpAutoCompleteDataModel,
  OwerpFormFieldSize,
  OwerpFormFieldType,
  OwerpFormModel
} from '../../../../@control/form/owerp-form.model';
import {OwerpActionModel} from '../../../../@control/action/owerp-action.model';
import {LedgerService} from '../../../ledger/ledger.service';

@Component({
  selector: 'ngx-owerp-view-tax-types',
  templateUrl: './view-tax-types.component.html',
  styleUrls: ['./view-tax-types.component.css']
})
export class ViewTaxTypesComponent implements OnInit {

  public fields: OwerpFormModel[] = [
    {name: 'taxCode', canEdit: true, type: OwerpFormFieldType.TEXT, label: 'Tax code'},
    {name: 'status', canEdit: true, type: OwerpFormFieldType.BOOLEAN, label: 'Status'},
    {
      name: 'description',
      canEdit: true,
      type: OwerpFormFieldType.TEXT,
      label: 'Description',
      size: OwerpFormFieldSize.LARGE
    },
    {
      name: 'taxRate',
      canEdit: true,
      type: OwerpFormFieldType.NUMBER,
      label: 'Tax rate %',
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'controlAccount',
      canEdit: true,
      type: OwerpFormFieldType.AUTOCOMPLETE,
      label: 'Ledger Control Account',
      size: OwerpFormFieldSize.SMALL,
      autoComplete: {value: 'id', label: 'ledgerAccCode'}
    }
  ];

  public actions: OwerpActionModel[] = [
    {name: 'editType', icon: 'brush-outline', status: 'warning', execute: this.navigateToEdit.bind(this)}
  ];

  public data: any = {status: true};
  public autoCompleteData: OwerpAutoCompleteDataModel = {};
  public id: string = '';
  public mode: 'create' | 'view' | 'edit' = 'create';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: TaxTypesService,
              private ums: UserMessageService,
              private lac: LedgerService) {
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

    this.fetchLedgerAccount();
  }

  public navigateToEdit(data: any): void {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  public save(data: any): void {
    if (this.mode === 'create') {
      this.service.create(data).subscribe((res: ApiResponse) => {
        this.ums.success(`New Tax Code ${res.data['taxCode']} created successfully.`);
        this.navigateToViewPage(res['data']['id']);
      });
    } else {
      this.service.update(this.id, data).subscribe((res: ApiResponse) => {
        this.ums.success(`Tax Code ${res.data['taxCode']} saved successfully.`);
        this.navigateToViewPage(res['data']['id']);
      });
    }
  }

  public cancel(): void {
    if (this.mode === 'edit') {
      this.navigateToViewPage(this.id);
    } else {
      this.router.navigateByUrl('/pages/master-data/tax-types');
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
    this.router.navigate(['tax-types', id], {relativeTo: this.route.parent});
  }

  private fetchLedgerAccount(): void {
    this.lac.fetchActive().subscribe(
      (res: ApiResponse) => {
        this.autoCompleteData['controlAccount'] = res.data;
        this.autoCompleteData = Object.assign({}, this.autoCompleteData);
      }
    );
  }
}
