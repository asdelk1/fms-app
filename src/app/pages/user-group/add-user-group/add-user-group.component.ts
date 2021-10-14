import {Component, OnInit} from '@angular/core';
import {OwerpFormFieldSize, OwerpFormFieldType, OwerpFormModel} from '../../../@control/form/owerp-form.model';
import {UserGroupService} from '../user-group.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiResponse} from '../../../model/api-model';
import {UserMessageService} from '../../../services/user-message.service';

@Component({
  selector: 'ngx-owerp-add-user-group',
  templateUrl: './add-user-group.component.html',
  styleUrls: ['./add-user-group.component.css']
})
export class AddUserGroupComponent implements OnInit {

  public formFields: OwerpFormModel[] = [
    {
      name: 'name',
      type: OwerpFormFieldType.TEXT,
      canEdit: true,
      label: 'Name',
      size: OwerpFormFieldSize.SMALL,
      required: true
    },
    {
      name: 'description',
      type: OwerpFormFieldType.TEXT,
      canEdit: true,
      label: 'Description',
      size: OwerpFormFieldSize.MEDIUM
    }
  ];

  constructor(private ugs: UserGroupService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private ums: UserMessageService) {
  }

  ngOnInit(): void {
  }

  public saveUserGroup1(data: any): void {
    this.ugs.save(data).subscribe(
      (res: ApiResponse) => {
        this.ums.success('User Group Created successfully');
        this.cancel();
      }
    );
  }

  public cancel(): void {
    this.router.navigate(['/pages/user-groups'], );
  }

}
