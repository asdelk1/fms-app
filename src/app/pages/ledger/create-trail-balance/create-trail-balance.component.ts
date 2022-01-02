import {Component, OnInit} from '@angular/core';
import {OwerpFormFieldType, OwerpFormModel} from '../../../@control/form/owerp-form.model';
import {LedgerService} from '../ledger.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-owerp-create-trail-balance',
  templateUrl: './create-trail-balance.component.html',
  styleUrls: ['./create-trail-balance.component.css']
})
export class CreateTrailBalanceComponent implements OnInit {

  public fields: OwerpFormModel[] = [
    {name: 'fromDate', label: 'From', type: OwerpFormFieldType.DATE, canEdit: true, required: true}
  ];

  public data: any = {};

  constructor(private service: LedgerService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  public generateReport(data: any): void {
    this.service.generateTrailBalanceReport(data).subscribe(
      (res: any) => {
        console.log('Trail Balance Generated');
      }
    );
  }

  public cancel(): void {
    this.router.navigateByUrl('/pages');
  }

}
