import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListCurrencyTypesComponent} from './currency-type/list-currency-types/list-currency-types.component';
import {ViewCurrencyTypesComponent} from './currency-type/view-currency-types/view-currency-types.component';
import {ListPaymentMethodsComponent} from './payment-method/list-payment-methods/list-payment-methods.component';
import {ViewPaymentMethodsComponent} from './payment-method/view-payment-methods/view-payment-methods.component';
import {ListPaymentTermsComponent} from './payment-terms/list-payment-terms/list-payment-terms.component';
import {ViewPaymentTermsComponent} from './payment-terms/view-payment-terms/view-payment-terms.component';
import {ListTaxTypesComponent} from './tax-types/list-tax-types/list-tax-types.component';
import {ViewTaxTypesComponent} from './tax-types/view-tax-types/view-tax-types.component';
import {ListTaxGroupsComponent} from './tax-groups/list-tax-groups/list-tax-groups.component';
import {ViewTaxGroupsComponent} from './tax-groups/view-tax-groups/view-tax-groups.component';
import {ListCostCenterComponent} from './cost-center/list-cost-center/list-cost-center.component';
import {ViewCostCenterComponent} from './cost-center/view-cost-center/view-cost-center.component';
import {ListAccountingPeriodComponent} from './accouting-period/list-accounting-period/list-accounting-period.component';
import {ViewAccountingPeriodComponent} from './accouting-period/view-accounting-period/view-accounting-period.component';
import {ListChartOfAccountsComponent} from './chart-of-accounts/list-chart-of-accounts/list-chart-of-accounts.component';

const routes: Routes = [
  {path: 'currency-types', component: ListCurrencyTypesComponent},
  {path: 'currency-types/create', component: ViewCurrencyTypesComponent, data: {mode: 'create'}},
  {path: 'currency-types/:id/edit', component: ViewCurrencyTypesComponent, data: {mode: 'edit'}},
  {path: 'currency-types/:id', component: ViewCurrencyTypesComponent, data: {mode: 'view'}},

  {path: 'payment-methods', component: ListPaymentMethodsComponent},
  {path: 'payment-methods/create', component: ViewPaymentMethodsComponent, data: {mode: 'create'}},
  {path: 'payment-methods/:id/edit', component: ViewPaymentMethodsComponent, data: {mode: 'edit'}},
  {path: 'payment-methods/:id', component: ViewPaymentMethodsComponent, data: {mode: 'view'}},

  {path: 'payment-terms', component: ListPaymentTermsComponent},
  {path: 'payment-terms/create', component: ViewPaymentTermsComponent, data: {mode: 'create'}},
  {path: 'payment-terms/:id/edit', component: ViewPaymentTermsComponent, data: {mode: 'edit'}},
  {path: 'payment-terms/:id', component: ViewPaymentTermsComponent, data: {mode: 'view'}},

  {path: 'tax-types', component: ListTaxTypesComponent},
  {path: 'tax-types/create', component: ViewTaxTypesComponent, data: {mode: 'create'}},
  {path: 'tax-types/:id/edit', component: ViewTaxTypesComponent, data: {mode: 'edit'}},
  {path: 'tax-types/:id', component: ViewTaxTypesComponent, data: {mode: 'view'}},

  {path: 'tax-groups', component: ListTaxGroupsComponent},
  {path: 'tax-groups/create', component: ViewTaxGroupsComponent, data: {mode: 'create'}},
  {path: 'tax-groups/:id/edit', component: ViewTaxGroupsComponent, data: {mode: 'edit'}},
  {path: 'tax-groups/:id', component: ViewTaxGroupsComponent, data: {mode: 'view'}},

  {path: 'cost-centers', component: ListCostCenterComponent},
  {path: 'cost-centers/create', component: ViewCostCenterComponent, data: {mode: 'create'}},
  {path: 'cost-centers/:id/edit', component: ViewCostCenterComponent, data: {mode: 'edit'}},
  {path: 'cost-centers/:id', component: ViewCostCenterComponent, data: {mode: 'view'}},

  {path: 'accounting-periods', component: ListAccountingPeriodComponent},
  {path: 'accounting-periods/create', component: ViewAccountingPeriodComponent, data: {mode: 'create'}},
  {path: 'accounting-periods/:id/edit', component: ViewAccountingPeriodComponent, data: {mode: 'edit'}},
  {path: 'accounting-periods/:id', component: ViewAccountingPeriodComponent, data: {mode: 'view'}},

  {path: 'chart-of-accounts', component: ListChartOfAccountsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterDataRoutingModule {
}
