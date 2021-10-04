import {Component, OnInit} from '@angular/core';
import {ApiResponse} from '../../../model/api-model';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../user.service';
import {UserMessageService} from '../../../services/user-message.service';
import {OwerpFormModel} from '../../../@control/form/owerp-form.model';

@Component({
  selector: 'ngx-owerp-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  public fields: OwerpFormModel[] = [
    {name: 'firstName', label: 'First Name', type: 'text', size: 'sm', canEdit: false},
    {name: 'lastName', label: 'Last Name', type: 'text', size: 'sm', canEdit: false},
    {name: 'epfNo', label: 'Epf No', type: 'text', size: 'sm', canEdit: false}
  ];

  public data: any;
  public title: string = 'Edit User Details';

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
        }
      );
    }
  }

  public saveUser(data: any): void {
    const updatedUser: any = {...this.data, ...data};
    this.userService.addUser(updatedUser).subscribe(
      (res: ApiResponse) => {
        this.userMessageService.success('User details updated successfully.');
        this.reset();
      }
    );
  }

  public reset(): void {
    this.router.navigate(['view', this.data.id], {relativeTo: this.activatedRoute.parent});
  }

}
