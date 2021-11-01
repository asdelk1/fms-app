import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListTypesComponent} from './list-types/list-types.component';
import {CustomerTypeDetailsComponent} from './details/customer-type-details.component';

const routes: Routes = [
  {path: '', component: ListTypesComponent},
  {path: 'create', component: CustomerTypeDetailsComponent},
  {path: ':id', component: CustomerTypeDetailsComponent},
  {path: ':id/edit', component: CustomerTypeDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerTypeRoutingModule {
}
