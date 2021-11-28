import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListCustomerItemsComponent} from './items/list-customer-items/list-customer-items.component';
import {DetailCustomerItemsComponent} from './items/detail-customer-items/detail-customer-items.component';

const routes: Routes = [
  {path: 'items', component: ListCustomerItemsComponent},
  {path: 'items/create', component: DetailCustomerItemsComponent, data: {mode: 'create'}},
  {path: 'items/:id/edit', component: DetailCustomerItemsComponent, data: {mode: 'edit'}},
  {path: 'items/:id', component: DetailCustomerItemsComponent, data: {mode: 'read'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
