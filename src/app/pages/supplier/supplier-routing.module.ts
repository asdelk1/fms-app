import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListSupplierTypeComponent} from './type/list-supplier-type/list-supplier-type.component';
import {ViewSupplierTypeComponent} from './type/view-supplier-type/view-supplier-type.component';
import {ListSupplierItemComponent} from './item/list-supplier-item/list-supplier-item.component';
import {ViewSupplierItemComponent} from './item/view-supplier-item/view-supplier-item.component';
import {ListSupplierComponent} from './list-supplier/list-supplier.component';
import {CreateSupplierComponent} from './create-supplier/create-supplier.component';
import {ViewSupplierComponent} from './view-supplier/view-supplier.component';

const routes: Routes = [
  {path: '', component: ListSupplierComponent},
  {path: 'create', component: CreateSupplierComponent},
  {path: 'types', component: ListSupplierTypeComponent},
  {path: 'types/create', component: ViewSupplierTypeComponent},
  {path: 'types/:id', component: ViewSupplierTypeComponent, data: {mode: 'read-only'}},
  {path: 'types/:id/edit', component: ViewSupplierTypeComponent, data: {mode: 'update'}},
  {path: 'items', component: ListSupplierItemComponent},
  {path: 'items/create', component: ViewSupplierItemComponent},
  {path: 'items/:id', component: ViewSupplierItemComponent, data: {mode: 'read-only'}},
  {path: 'items/:id/edit', component: ViewSupplierItemComponent, data: {mode: 'update'}},
  {path: ':id', component: ViewSupplierComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule {
}
