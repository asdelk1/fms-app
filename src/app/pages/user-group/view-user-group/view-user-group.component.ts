import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserGroupService} from '../../user-group.service';
import {ApiResponse} from '../../../model/api-model';
import {OwerpFormFieldType, OwerpFormModel} from '../../../@control/form/owerp-form.model';

@Component({
  selector: 'ngx-owerp-view-user-group',
  templateUrl: './view-user-group.component.html',
  styleUrls: ['./view-user-group.component.css']
})
export class ViewUserGroupComponent implements OnInit {

  public data: any | any[];
  public fields: OwerpFormModel[] = [
    {name: 'name', label: 'Name', type: OwerpFormFieldType.TEXT, canEdit: false},
    {name: 'description', label: 'Description', type: OwerpFormFieldType.TEXT, canEdit: false}
  ];

  constructor(private route: ActivatedRoute,
              private ugs: UserGroupService) {
  }

  ngOnInit(): void {
    const id: string = this.route.snapshot.params['id'];
    this.ugs.find(id).subscribe(
      (res: ApiResponse) => {
        this.data = res.data;
      });
  }

}
