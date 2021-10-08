import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ListUserGroupComponent} from './list-user-group/list-user-group.component';
import {AddUserGroupComponent} from './add-user-group/add-user-group.component';
import {ViewUserGroupComponent} from './view-user-group/view-user-group.component';

const routes: Routes = [
  {path: '', component: ListUserGroupComponent},
  {path: 'add-user-group', component: AddUserGroupComponent},
  {path: ':id/view', component: ViewUserGroupComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserGroupRoutingModule {
}
