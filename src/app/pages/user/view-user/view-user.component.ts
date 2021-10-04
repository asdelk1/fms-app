import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OwerpFormModel} from '../../../@control/form/owerp-form.model';
import {UserService} from '../user.service';
import {ApiResponse} from '../../../model/api-model';

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

  public data: any;
  public title: string = 'User Details';

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService) {
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

}
