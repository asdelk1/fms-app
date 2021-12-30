import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateLedgerCategoryComponent} from './create-ledger-category/create-ledger-category.component';
import {CreateLedgerAccountComponent} from './create-ledger-account/create-ledger-account.component';
import {CreateGeneralLedgerComponent} from './create-general-ledger-report/create-general-ledger.component';

const routes: Routes = [
  {path: 'create-category', component: CreateLedgerCategoryComponent},
  {path: 'category/:id', component: CreateLedgerCategoryComponent, data: {mode: 'edit'}},

  {path: 'accounts/create', component: CreateLedgerAccountComponent},
  {
    path: 'general-ledger',
    component: CreateGeneralLedgerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LedgerRoutingModule { }
