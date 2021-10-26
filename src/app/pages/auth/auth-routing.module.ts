import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NbLoginComponent, NbLogoutComponent, NbResetPasswordComponent} from '@nebular/auth';
import {RequestPasswordResetComponent} from './request-password-reset/request-password-reset.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';

export const routes: Routes = [
  {path: '', component: NbLoginComponent},
  {path: 'login', component: NbLoginComponent},
  {path: 'request-password', component: RequestPasswordResetComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'logout', component: NbLogoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
