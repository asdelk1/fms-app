import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RequestPasswordResetComponent} from './request-password-reset/request-password-reset.component';
import {NbAuthModule} from '@nebular/auth';
import {AuthRoutingModule} from './auth-routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule
} from '@nebular/theme';


@NgModule({
  declarations: [
    RequestPasswordResetComponent,
  ],
  imports: [
    CommonModule,
    NbAuthModule,
    AuthRoutingModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    ReactiveFormsModule,
    NbLayoutModule,
    NbCardModule,
    NbIconModule
  ]
})
export class AuthModule { }
