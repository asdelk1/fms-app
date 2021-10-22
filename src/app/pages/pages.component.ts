import {Component} from '@angular/core';

import {MENU_ITEMS, OwerpMenuItem} from './pages-menu';
import {NbMenuItem} from '@nebular/theme';
import {UserService} from './user/user.service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `
})
export class PagesComponent {

  menu = this.getMenuItems();

  constructor(private userService: UserService) {
  }

  private getMenuItems(): OwerpMenuItem[] {
    const userGrantedMenuItems: OwerpMenuItem[] = [];
    const menu: NbMenuItem[] = MENU_ITEMS;
    menu.forEach((item: OwerpMenuItem) => {
      if (item.strictAuthorization && item.permissionName) {
        if (this.userService.getUserPermissions().has(item.permissionName)) {
          userGrantedMenuItems.push(item);
        }
      } else {
        userGrantedMenuItems.push(item);
      }
    });

    return userGrantedMenuItems;
  }
}
