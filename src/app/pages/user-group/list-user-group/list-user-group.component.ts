import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {
  OwerpTableColumn,
  OwerpTableColumnType,
  OwerpTableSelectionMode
} from '../../../@control/table/owerp-table.model';
import {OwerpActionModel} from '../../../@control/action/owerp-action.model';
import {UserGroupService} from '../../user-group.service';
import {ApiResponse} from '../../../model/api-model';
import {ActivatedRoute, Router} from '@angular/router';

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
    {name: 'viewGroupDetails', mode: OwerpTableSelectionMode.SINGLE, execute: this.viewDetails.bind(this), label: 'Details'}
  ];

  public data: any[];

  public selectionMode: OwerpTableSelectionMode = OwerpTableSelectionMode.SINGLE;

  constructor(private ugService: UserGroupService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.ugService.list().subscribe(
      (res: ApiResponse) => {
        this.data = res.data;
      }
    );
  }

  public onUserGroupCreate(): void {
    this.router.navigate(['add-user-group'], {relativeTo: this.activatedRoute});
  }

  public viewDetails(data: any | any[]): void {
    const id: string = data[0]['id'];
    this.router.navigate([id, 'view'], {relativeTo: this.activatedRoute});
  }

}
