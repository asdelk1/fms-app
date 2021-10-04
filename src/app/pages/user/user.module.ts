import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbTreeGridModule
} from '@nebular/theme';
import {ThemeModule} from '../../@theme/theme.module';
import {TablesRoutingModule} from '../tables/tables-routing.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import { AddUserComponent } from './add-user/add-user.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ListUserComponent } from './list-user/list-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import {FormModule} from '../../@control/form/form.module';
import { EditUserComponent } from './edit-user/edit-user.component';


@NgModule({
  declarations: [
    UserComponent,
    AddUserComponent,
    ListUserComponent,
    ViewUserComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    NbDialogModule,
    NbRadioModule,
    NbButtonModule,
    ReactiveFormsModule,
    FormModule
  ]
})
export class UserModule { }
