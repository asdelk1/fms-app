import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NbLoginComponent, NbLogoutComponent} from '@nebular/auth';
import {RequestPasswordResetComponent} from './request-password-reset/request-password-reset.component';

export const routes: Routes = [
  {path: '', component: NbLoginComponent},
  {path: 'login', component: NbLoginComponent},
  {path: 'request-password', component: RequestPasswordResetComponent},
  {path: 'logout', component: NbLogoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
