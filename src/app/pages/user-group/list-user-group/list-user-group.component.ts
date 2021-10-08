import {Component, OnInit} from '@angular/core';
import {
  OwerpTableColumn,
  OwerpTableColumnType,
  OwerpTableSelectionMode
} from '../../../@control/table/owerp-table.model';
import {OwerpActionModel} from '../../../@control/action/owerp-action.model';
import {UserGroupService} from '../../user-group.service';
import {ApiResponse} from '../../../model/api-model';

@Component({
  selector: 'ngx-owerp-list-user-group',
  templateUrl: './list-user-group.component.html',
  styleUrls: ['./list-user-group.component.css']
})
export class ListUserGroupComponent implements OnInit {

  public userGroupColumns: OwerpTableColumn = {
    name: {title: 'Name', type: OwerpTableColumnType.TEXT},
    description: {title: 'Description', type: OwerpTableColumnType.TEXT}
  };

  public actions: OwerpActionModel[] = [
    {name: 'viewGroupDetails', mode: OwerpTableSelectionMode.SINGLE, execute: this.viewDetails}
  ];

  public data: any[];

  public selectionMode: OwerpTableSelectionMode = OwerpTableSelectionMode.SINGLE;

  constructor(private ugService: UserGroupService) {
  }

  ngOnInit(): void {
    this.ugService.list().subscribe(this.observer);
  }

  public onUserGroupCreate(): void {
    return;
  }


  public viewDetails(): void {
    console.log(this);
  }
 public observer(res: ApiResponse): void {

  this.data = res.data;
  }


}
