import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListCustomerItemsComponent} from './items/list-customer-items/list-customer-items.component';
import {DetailCustomerItemsComponent} from './items/detail-customer-items/detail-customer-items.component';
import {ListCustomerComponent} from './list-customer/list-customer.component';
import {CreateCustomerComponent} from './create-customer/create-customer.component';

const routes: Routes = [
  {path: 'items', component: ListCustomerItemsComponent},
  {path: 'items/create', component: DetailCustomerItemsComponent, data: {mode: 'create'}},
  {path: 'items/:id/edit', component: DetailCustomerItemsComponent, data: {mode: 'edit'}},
  {path: 'items/:id', component: DetailCustomerItemsComponent, data: {mode: 'read'}},
  {path: 'create', component: CreateCustomerComponent},
  {path: ':id/edit', component: CreateCustomerComponent, data: {mode: 'edit'}},
  {path: '', component: ListCustomerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
