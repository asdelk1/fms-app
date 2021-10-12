import {Component, OnInit} from '@angular/core';
import {
  OwerpTableColumn,
  OwerpTableColumnType,
  OwerpTableSelectionMode
} from '../../../@control/table/owerp-table.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UserGroupService} from '../user-group.service';
import {UserService} from '../../user/user.service';
import {ApiResponse} from '../../../model/api-model';
import {OwerpActionModel} from '../../../@control/action/owerp-action.model';
import {UserMessageService} from '../../../services/user-message.service';

@Component({
  selector: 'ngx-owerp-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  public userColumns: OwerpTableColumn = {
    'username': {title: 'Username', type: OwerpTableColumnType.TEXT},
    'firstName': {title: 'First Name', type: OwerpTableColumnType.TEXT},
    'lastName': {title: 'Last Name', type: OwerpTableColumnType.TEXT}
  };
  public users: any[] = [];
  public actions: OwerpActionModel[] = [
    {
      name: 'addUserToGroup',
      label: 'Add',
      mode: OwerpTableSelectionMode.MULTI,
      execute: this.addUsersToGroup.bind(this)
    }
  ];
  public selectionMode: OwerpTableSelectionMode = OwerpTableSelectionMode.MULTI;
  private userGroupId: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private ugs: UserGroupService,
              private message: UserMessageService) {
  }

  ngOnInit(): void {
    this.userGroupId = +this.route.snapshot.params['id'];
    this.userService.getUsers().subscribe(
      (res: ApiResponse) => {
        this.users = res.data;
      }
    );
  }

  public addUsersToGroup(data: any[]): void {
    this.ugs.addUsers(this.userGroupId, data).subscribe(
      (res: ApiResponse) => {
        this.message.success('User Group updated.');
        this.router.navigate([this.userGroupId, 'view'], {relativeTo: this.route.parent});
      }
    );
  }

}
