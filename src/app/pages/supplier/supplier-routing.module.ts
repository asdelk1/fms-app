import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListSupplierTypeComponent} from './type/list-supplier-type/list-supplier-type.component';
import {ViewSupplierTypeComponent} from './type/view-supplier-type/view-supplier-type.component';

const routes: Routes = [
  {path: 'types', component: ListSupplierTypeComponent},
  {path: 'types/create', component: ViewSupplierTypeComponent},
  {path: 'types/:id', component: ViewSupplierTypeComponent, data: {mode: 'read-only'}},
  {path: 'types/:id/edit', component: ViewSupplierTypeComponent, data: {mode: 'update'}},
  {path: '', redirectTo: 'types'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule {
}
