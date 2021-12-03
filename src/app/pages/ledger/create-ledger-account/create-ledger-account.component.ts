import {Component, OnInit} from '@angular/core';
import {OwerpAutoCompleteDataModel, OwerpFormFieldType, OwerpFormModel} from '../../../@control/form/owerp-form.model';
import {ActivatedRoute, Router} from '@angular/router';
import {LedgerService} from '../ledger.service';
import {ApiResponse} from '../../../model/api-model';
import {UserMessageService} from '../../../services/user-message.service';

@Component({
  selector: 'ngx-owerp-create-ledger-account',
  templateUrl: './create-ledger-account.component.html',
  styleUrls: ['./create-ledger-account.component.css']
})
export class CreateLedgerAccountComponent implements OnInit {

  public fields: OwerpFormModel[] = [
    {
      name: 'ledgerCategory',
      type: OwerpFormFieldType.AUTOCOMPLETE,
      label: 'Category',
      required: true,
      canEdit: true,
      autoComplete: 'id'
    },
    {
      name: 'ledgerAccCode',
      canEdit: true,
      required: true,
      type: OwerpFormFieldType.TEXT,
      label: 'Code'
    },
    {
      name: 'ledgerAccName',
      canEdit: true,
      required: true,
      type: OwerpFormFieldType.TEXT,
      label: 'Name'
    },
    {
      name: 'status',
      canEdit: true,
      required: true,
      type: OwerpFormFieldType.BOOLEAN,
      label: 'Status'
    }
  ];

  public data: any = {status: true};
  public autoCompleteData: OwerpAutoCompleteDataModel = {};
  public mode: string = 'create';
  public id: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private messageService: UserMessageService,
              private service: LedgerService) {
  }

  ngOnInit(): void {
    this.loadActiveLedgerCategories();

    if (this.route.snapshot.data['mode']) {
      this.mode = this.route.snapshot.data['mode'];
      this.id = this.route.snapshot.paramMap.get('id');
    }

    if (this.mode === 'edit') {

    }
  }

  public saveAccount(data: any): void {

    if (this.mode === 'create') {
      this.service.create(data).subscribe(
        (res: ApiResponse) => {
          this.messageService.success(`New Ledger Account ${res.data['ledgerAccName']}(${res.data['ledgerAccCode']}) created Successfully`);
          this.cancel();
        }
      );
    } else {
      this.service.update(this.id, data).subscribe(
        (res: ApiResponse) => {
          this.messageService.success(`Ledger Account updated Successfully`);
          this.cancel();
        }
      );
    }
  }

  public cancel(): void {
    this.router.navigateByUrl('/pages/master-data/chart-of-accounts');
  }

  public loadLedgerAccount(): void {
    this.service.fetch(this.id).subscribe(
      (res: ApiResponse) => {
        this.data = res.data;
      }
    );
  }

  public loadActiveLedgerCategories(): void {
    this.service.fetchActiveLedgerCategories().subscribe(
      (res: ApiResponse) => {
        this.autoCompleteData = {'ledgerCategory': this.service.getLedgerAccountAutoCompleteData(res.data)};
      }
    );
  }

}
