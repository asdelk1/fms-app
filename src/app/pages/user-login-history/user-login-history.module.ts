import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLoginHistoryRoutingModule } from './user-login-history-routing.module';
import { UserLoginHistoryComponent } from './user-login-history.component';
import { ListHistoryComponent } from './list-history/list-history.component';
import {OwerpTableModule} from '../../@control/table/owerp-table.module';


@NgModule({
  declarations: [
    UserLoginHistoryComponent,
    ListHistoryComponent
  ],
  imports: [
    CommonModule,
    UserLoginHistoryRoutingModule,
    OwerpTableModule
  ]
})
export class UserLoginHistoryModule { }
