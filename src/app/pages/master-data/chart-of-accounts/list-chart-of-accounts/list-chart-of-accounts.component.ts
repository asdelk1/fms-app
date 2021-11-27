import {Component, OnInit} from '@angular/core';
import {ChartOfAccountsService} from '../chart-of-accounts.service';
import {
  OwerpSelectionMode,
  OwerpTableColumns,
  OwerpTableColumnType
} from '../../../../@control/table/owerp-table.model';
import {ApiResponse} from '../../../../model/api-model';
import {OwerpActionModel} from '../../../../@control/action/owerp-action.model';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-owerp-list-chart-of-accounts',
  templateUrl: './list-chart-of-accounts.component.html',
  styleUrls: ['./list-chart-of-accounts.component.css']
})
export class ListChartOfAccountsComponent implements OnInit {

  public columns: OwerpTableColumns = {
    count: {
      title: '',
      type: OwerpTableColumnType.TEXT
    },
    colOne: {
      title: '',
      type: OwerpTableColumnType.TEXT
    },
    colTwo: {
      title: '',
      type: OwerpTableColumnType.TEXT
    },
    status: {
      title: '',
      type: OwerpTableColumnType.BOOLEAN
    }
  };
  public data: any[];
  public actions: OwerpActionModel[] = [
    {
      name: 'createLedgerCategory',
      mode: OwerpSelectionMode.NONE,
      label: 'Create Ledger Category',
      execute: this.createLedgerCategory.bind(this)
    },
    {
      name: 'createLedgerAccount',
      mode: OwerpSelectionMode.NONE,
      label: 'Create Ledger Account',
      execute: this.createLedgerAccount.bind(this)
    },
    {
      name: 'editEntry',
      mode: OwerpSelectionMode.SINGLE,
      status: 'warning',
      icon: 'brush-outline',
      execute: this.editEntry.bind(this)
    }
  ];

  constructor(private accountService: ChartOfAccountsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.accountService.fetchAll().subscribe((res: ApiResponse) => {
      const data: any[] = res.data;
      const processedData: any[] = [];
      data.forEach((record: any, i: number) => {
        const cat: any = record['ledgerCategory'];
        const obj: any = {};
        obj['count'] = i;
        obj['colOne'] = cat['accCode'];
        obj['colTwo'] = cat['accName'];
        obj['status'] = cat['ledgerType'] && cat['ledgerType']['typeName'] ? cat['ledgerType']['typeName'] : '';

        processedData.push(obj);
      });
      this.data = processedData;
    });
  }

  private createLedgerCategory(data: any | any[]): void {
    this.router.navigateByUrl('/pages/ledger/create-category');
  }

  private createLedgerAccount(data: any | any[]): void {
    this.router.navigateByUrl('/pages/ledger/accounts/create');
  }

  private editEntry(data: any[]): void {
    const id: string = data[0]['id'];
    this.router.navigateByUrl('/pages/ledger/category/' + id);
  }

}
