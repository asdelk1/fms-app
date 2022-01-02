import {Component, OnInit} from '@angular/core';
import {
  OwerpAutoCompleteDataModel,
  OwerpFormFieldSize,
  OwerpFormFieldType,
  OwerpFormModel
} from '../../../@control/form/owerp-form.model';
import {AccountService} from '../../account/account.service';
import {Router} from '@angular/router';
import {LedgerService} from '../ledger.service';
import {ApiResponse} from '../../../model/api-model';

@Component({
  selector: 'ngx-owerp-create-general-ledger',
  templateUrl: './create-general-ledger.component.html',
  styleUrls: ['./create-general-ledger.component.css']
})
export class CreateGeneralLedgerComponent implements OnInit {

  public fields: OwerpFormModel[] = [
    {
      name: 'ledgerCategory',
      label: 'Ledger Category',
      size: OwerpFormFieldSize.MEDIUM,
      type: OwerpFormFieldType.AUTOCOMPLETE,
      canEdit: true,
      required: true,
      autoComplete: 'id',
      valueChange: this.onLedgerCategoryChange.bind(this)
    },
    {
      name: 'ledgerAccount',
      label: 'Ledger Account',
      size: OwerpFormFieldSize.MEDIUM,
      type: OwerpFormFieldType.AUTOCOMPLETE,
      canEdit: true,
      required: true,
      autoComplete: 'id'
    },
    {
      name: 'fromDate',
      label: 'From Date',
      size: OwerpFormFieldSize.MEDIUM,
      type: OwerpFormFieldType.DATE,
      canEdit: true,
      required: true
    },
    {
      name: 'toDate',
      label: 'To Date',
      size: OwerpFormFieldSize.MEDIUM,
      type: OwerpFormFieldType.DATE,
      canEdit: true,
      required: true
    }
  ];

  public data: any = {};
  public autoCompleteData: OwerpAutoCompleteDataModel = {};

  constructor(
    private service: AccountService,
    private ledgerService: LedgerService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.loadLedgerCategories();
  }

  public generate(data: any): void {
    this.ledgerService.generateGeneralLedgerReport(data).subscribe(
      (res: any) => {
        console.log('General Ledger Report Created');
      }
    );
  }

  public onCancel(): void {
    this.router.navigate(['/']);
  }

  private loadLedgerCategories(): void {
    this.ledgerService.fetchActiveLedgerCategories().subscribe(
      (res: ApiResponse) => {
        this.autoCompleteData['ledgerCategory'] = this.ledgerService.getLedgerAccountCategoryAutoCompleteData(res.data);
        this.autoCompleteData = Object.assign({}, this.autoCompleteData);
      }
    );
  }

  private onLedgerCategoryChange(value: any, state: any): void {
    this.loadLedgerAccounts(value);
  }

  private loadLedgerAccounts(categoryId: string): void {
    this.ledgerService.fetchAccountsByCategory(categoryId).subscribe(
      (res: ApiResponse) => {
        this.autoCompleteData['ledgerAccount'] = this.ledgerService.getLedgerAccountAutoCompleteData(res.data);
        this.autoCompleteData = Object.assign({}, this.autoCompleteData);
      }
    );
  }

}
