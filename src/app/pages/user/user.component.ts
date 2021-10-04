import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {NbDialogService} from '@nebular/theme';
import {AddUserComponent} from './add-user/add-user.component';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ngx-owerp-fsm-user',
  template: '<router-outlet></router-outlet>'
})
export class UserComponent implements OnInit {

  ngOnInit(): void {
  }


}
