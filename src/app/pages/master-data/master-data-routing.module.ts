import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListCurrencyTypesComponent} from './currency-type/list-currency-types/list-currency-types.component';
import {ViewCurrencyTypesComponent} from './currency-type/view-currency-types/view-currency-types.component';

const routes: Routes = [
  {path: 'currency-types', component: ListCurrencyTypesComponent},
  {path: 'currency-types/create', component: ViewCurrencyTypesComponent, data: {mode: 'create'}},
  {path: 'currency-types/:id/edit', component: ViewCurrencyTypesComponent, data: {mode: 'edit'}},
  {path: 'currency-types/:id', component: ViewCurrencyTypesComponent, data: {mode: 'view'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterDataRoutingModule {
}
