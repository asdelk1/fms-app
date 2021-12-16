import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListSalesInvoiceComponent} from './list-sales-invoice/list-sales-invoice.component';
import {CreateSalesInvoiceComponent} from './create-sales-invoice/create-sales-invoice.component';
import {ViewSalesInvoiceComponent} from './view-sales-invoice/view-sales-invoice.component';

const routes: Routes = [
  {path: 'create', component: CreateSalesInvoiceComponent},
  {path: 'to-check', component: ListSalesInvoiceComponent, data: {type: 'to-check'}},
  {path: 'to-approve', component: ListSalesInvoiceComponent, data: {type: 'to-approve'}},
  {path: ':id', component: ViewSalesInvoiceComponent},
  {path: '', component: ListSalesInvoiceComponent, data: {type: 'normal'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesInvoiceRoutingModule {}
