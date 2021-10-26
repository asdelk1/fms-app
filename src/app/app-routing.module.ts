import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {NbAuthComponent} from '@nebular/auth';
import {AuthGuard} from './guards/auth-guard';
import {UserPermissionResolver} from './guards/user-permission-resolver';

export const routes: Routes = [
  {
    path: 'pages',
    canActivate: [AuthGuard],
    resolve: [UserPermissionResolver],
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    loadChildren: () => import('./pages/auth/auth.module')
      .then(m => m.AuthModule)
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
