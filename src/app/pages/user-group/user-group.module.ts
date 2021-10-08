import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserGroupComponent} from './user-group.component';
import {UserGroupRoutingModule} from './user-group-routing.module';
import {ListUserGroupComponent} from './list-user-group/list-user-group.component';
import {NbCardModule, NbTreeGridModule} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {OwerpTableModule} from '../../@control/table/owerp-table.module';


@NgModule({
  declarations: [
    UserGroupComponent,
    ListUserGroupComponent
  ],
  imports: [
    CommonModule,
    UserGroupRoutingModule,
    NbTreeGridModule,
    NbCardModule,
    Ng2SmartTableModule,
    OwerpTableModule
  ]
})
export class UserGroupModule { }
