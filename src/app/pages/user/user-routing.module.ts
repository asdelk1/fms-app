import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './user.component';
import {AddUserComponent} from './add-user/add-user.component';
import {ListUserComponent} from './list-user/list-user.component';
import {ViewUserComponent} from './view-user/view-user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'add-user',
        component: AddUserComponent
      },
      {
        path: 'view/:id',
        component: ViewUserComponent
      },
      {
        path: '',
        component: ListUserComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
