import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OwerpFormModel} from '../../../@control/form/owerp-form.model';
import {UserService} from '../user.service';
import {ApiResponse} from '../../../model/api-model';
import {OwerpActionModel} from '../../../@control/action/owerp-action.model';
import {UserMessageService} from '../../../services/user-message.service';

@Component({
  selector: 'ngx-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  public fields: OwerpFormModel[] = [
    {name: 'email', label: 'E-Mail', type: 'text', size: 'sm', canEdit: false},
    {name: 'username', label: 'Username', type: 'text', size: 'sm', canEdit: false},
    {name: 'firstName', label: 'First Name', type: 'text', size: 'sm', canEdit: false},
    {name: 'lastName', label: 'Last Name', type: 'text', size: 'sm', canEdit: false},
    {name: 'epfNo', label: 'Epf No', type: 'text', size: 'sm', canEdit: false},
    {name: 'active', label: 'Active', type: 'boolean', size: 'sm', canEdit: false}
  ];

  public actions: OwerpActionModel[];

  public data: any;
  public title: string = 'User Details';

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private userMessageService: UserMessageService,
              private router: Router) {
  }

  ngOnInit(): void {
    const userId: number = +this.activatedRoute.snapshot.params['id'];
    if (userId) {
      this.userService.getUser(userId).subscribe(
        (res: ApiResponse) => {
          this.data = res.data;
         this.initActions();
        }
      );
    }
  }

  public switchState(): void {
    this.userService.deactivateUser(this.data).subscribe(
      (res: ApiResponse) => {
        this.userMessageService.success('State changed successfully');
        this.data = res.data;
        this.initActions();
      }
    );
  }

  public editUser(): void {
    this.router.navigate(['edit', this.data.id], {relativeTo: this.activatedRoute.parent}  );
  }

  private initActions(): void {
    this.actions = [
      {name: 'editUser', icon: 'brush-outline', status: 'warning',  execute: this.editUser.bind(this)},
      {name: 'deactivateUser',
        label: this.data['active'] ? 'Deactivate' : 'Set Active',
        execute: this.switchState.bind(this)}
    ];
  }

}
