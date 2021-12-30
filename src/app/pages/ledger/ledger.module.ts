import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LedgerRoutingModule } from './ledger-routing.module';
import { LedgerComponent } from './ledger.component';
import { CreateLedgerCategoryComponent } from './create-ledger-category/create-ledger-category.component';
import {OwerpFormModule} from '../../@control/form/owerp-form.module';
import { CreateLedgerAccountComponent } from './create-ledger-account/create-ledger-account.component';
import { CreateGeneralLedgerComponent } from './create-general-ledger-report/create-general-ledger.component';


@NgModule({
  declarations: [
    LedgerComponent,
    CreateLedgerCategoryComponent,
    CreateLedgerAccountComponent,
    CreateGeneralLedgerComponent
  ],
  imports: [
    CommonModule,
    LedgerRoutingModule,
    OwerpFormModule
  ]
})
export class LedgerModule { }
