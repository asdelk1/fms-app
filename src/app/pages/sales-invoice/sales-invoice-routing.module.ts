import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListSalesInvoiceComponent} from './list-sales-invoice/list-sales-invoice.component';
import {CreateSalesInvoiceComponent} from './create-sales-invoice/create-sales-invoice.component';

const routes: Routes = [
  {path: 'create', component: CreateSalesInvoiceComponent},
  {path: '', component: ListSalesInvoiceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesInvoiceRoutingModule {}
