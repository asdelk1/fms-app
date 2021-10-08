import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserGroupComponent} from './user-group.component';
import {UserGroupRoutingModule} from './user-group-routing.module';
import {ListUserGroupComponent} from './list-user-group/list-user-group.component';
import {OwerpTableModule} from '../../@control/table/owerp-table.module';
import {AddUserGroupComponent} from './add-user-group/add-user-group.component';
import {OwerpFormModule} from '../../@control/form/owerp-form.module';
import { ViewUserGroupComponent } from './view-user-group/view-user-group.component';


@NgModule({
  declarations: [
    UserGroupComponent,
    ListUserGroupComponent,
    AddUserGroupComponent,
    ViewUserGroupComponent
  ],
  imports: [
    CommonModule,
    UserGroupRoutingModule,
    OwerpTableModule,
    OwerpFormModule
  ]
})
export class UserGroupModule { }
