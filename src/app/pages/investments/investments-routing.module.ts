import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ListInvestmentTypesComponent} from './types/list-investment-types/list-investment-types.component';
import {ViewInvestmentTypeComponent} from './types/view-investment-type/view-investment-type.component';

export const routes: Routes = [
  {path: 'types', component: ListInvestmentTypesComponent},
  {path: 'types/create', component: ViewInvestmentTypeComponent, data: {mode: 'create'}},
  {path: 'types/view/:id', component: ViewInvestmentTypeComponent, data: {mode: 'view'}},
  {path: 'types/edit/:id', component: ViewInvestmentTypeComponent, data: {mode: 'update'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestmentsRoutingModule {
}
