import {Component, OnInit} from '@angular/core';
import {NbDialogService} from '@nebular/theme';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../user.service';
import {ApiResponse} from '../../../model/api-model';
import {
  OwerpTableColumns,
  OwerpTableColumnType,
  OwerpSelectionMode
} from '../../../@control/table/owerp-table.model';
import {OwerpActionModel} from '../../../@control/action/owerp-action.model';

@Component({
  selector: 'ngx-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  public selectionMode: OwerpSelectionMode = OwerpSelectionMode.MULTI;
  public actions: OwerpActionModel[] = [
    {
      name: 'viewUserDetails',
      label: 'Details',
      mode: OwerpSelectionMode.SINGLE,
      execute: this.viewDetails.bind(this)
    }
  ];
  public columns: OwerpTableColumns = {
    id: {
      title: 'ID',
      type: OwerpTableColumnType.TEXT
    },
    firstName: {
      title: 'First Name',
      type: OwerpTableColumnType.TEXT
    },
    lastName: {
      title: 'Last Name',
      type: OwerpTableColumnType.TEXT
    },
    username: {
      title: 'Username',
      type: OwerpTableColumnType.TEXT
    },
    email: {
      title: 'E-mail',
      type: OwerpTableColumnType.TEXT
    },
    epfNo: {
      title: 'Epf No',
      type: OwerpTableColumnType.TEXT
    },
    active: {
      title: 'Active',
      type: OwerpTableColumnType.BOOLEAN
    }
  };
  public data: any[] = [];

  constructor(private dialogService: NbDialogService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (res: ApiResponse) => {
        this.data = res.data;
      }
    );
  }

  public onUserCreate(): void {
    this.router.navigate(['add-user'], {relativeTo: this.activatedRoute});
  }

  public viewDetails(rows: any | any[]): void {
    this.router.navigate(['view', rows[0].id], {relativeTo: this.activatedRoute});
  }

}

