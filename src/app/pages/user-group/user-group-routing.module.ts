import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ListUserGroupComponent} from './list-user-group/list-user-group.component';

const routes: Routes = [
  {path: '', component: ListUserGroupComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserGroupRoutingModule {
}
