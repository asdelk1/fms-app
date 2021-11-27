import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GrantedPermission, UserGroupService} from '../user-group.service';
import {ApiResponse} from '../../../model/api-model';
import {OwerpFormFieldSize, OwerpFormFieldType, OwerpFormModel} from '../../../@control/form/owerp-form.model';
import {
  OwerpTableColumns,
  OwerpTableColumnType,
  OwerpSelectionMode
} from '../../../@control/table/owerp-table.model';
import {OwerpActionModel} from '../../../@control/action/owerp-action.model';
import {UserMessageService} from '../../../services/user-message.service';
import {forkJoin} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
  selector: 'ngx-owerp-view-user-group',
  templateUrl: './view-user-group.component.html',
  styleUrls: ['./view-user-group.component.css']
})
export class ViewUserGroupComponent implements OnInit {

  public data: any | any[];
  public fields: OwerpFormModel[] = [
    {name: 'name', label: 'Name', type: OwerpFormFieldType.TEXT, canEdit: false},
    {
      name: 'description',
      label: 'Description',
      type: OwerpFormFieldType.TEXT,
      canEdit: false,
      size: OwerpFormFieldSize.MEDIUM
    }
  ];

  public userColumns: OwerpTableColumns = {
    'username': {title: 'Username', type: OwerpTableColumnType.TEXT},
    'firstName': {title: 'First Name', type: OwerpTableColumnType.TEXT},
    'lastName': {title: 'Last Name', type: OwerpTableColumnType.TEXT}
  };
  public userTableSelectionMode: OwerpSelectionMode = OwerpSelectionMode.MULTI;
  public userTableActions: OwerpActionModel[] = [
    {
      name: 'deleteUsersFromGroup',
      label: 'Remove',
      mode: OwerpSelectionMode.MULTI,
      execute: this.removeUsersFromGroup.bind(this)
    }
  ];

  public permissionColumns: OwerpTableColumns = {
    'name': {title: 'Name', type: OwerpTableColumnType.TEXT},
    'isGranted': {title: 'Granted', type: OwerpTableColumnType.BOOLEAN}
  };
  public permissionTableSelectionMode: OwerpSelectionMode = OwerpSelectionMode.MULTI;
  public permissionTableActions: OwerpActionModel[] = [
    {
      name: 'grantPermission',
      mode: OwerpSelectionMode.MULTI,
      label: 'Grant',
      status: 'success',
      execute: this.grantPermission.bind(this),
      visible: this.isGrantActionVisible
    },
    {
      name: 'denyPermission',
      mode: OwerpSelectionMode.MULTI,
      label: 'Deny',
      status: 'danger',
      execute: this.denyPermission.bind(this),
      visible: this.isDenyActionVisible.bind(this)
    }
  ];

  public users: any = [];
  public permissionData: GrantedPermission[] = [];

  constructor(private route: ActivatedRoute,
              private ugs: UserGroupService,
              private router: Router,
              private messageService: UserMessageService) {
  }

  ngOnInit(): void {
    const id: string = this.route.snapshot.params['id'];
    this.loadData(id);
  }

  public loadData(id: string): void {
    this.ugs.find(id).pipe(take(1)).subscribe(
      (res: ApiResponse) => {
        this.data = res.data;
        this.users = res.data['users'];
        this.loadPermissions(this.data['grantedPermissions']);
      });
  }

  public addUsers(): void {
    this.router.navigate([this.data['id'], 'add-users'], {relativeTo: this.route.parent});
  }

  public removeUsersFromGroup(data: any[]): void {
    this.ugs.deleteUsers(this.data['id'], data).subscribe(
      (res: ApiResponse) => {
        const count: number = data.length;
        this.messageService.success(count + ' users are removed from this group');
        this.loadData(`${this.data['id']}`);
      }
    );
  }

  public loadPermissions(groupPermissions: string[]): void {
    this.ugs.listPermissions().pipe(take(1)).subscribe(
      (res: ApiResponse) => {
        if (res.data.length > 0) {
          this.permissionData = this.ugs.processPermissions(res.data, groupPermissions);
        } else {
          this.permissionData = [];
        }
      });
  }

  public grantPermission(data: any[]): void {
    const permissions: string[] = data.map((d) => d['name']);
    this.ugs.grantPermissions(this.data['id'], permissions).pipe(take(1)).subscribe(
      () => {
        this.messageService.success('Permissions Granted Successfully.');
        this.loadData(this.data['id']);
      }
    );
  }

  public denyPermission(data: any[]): void {
    const permissions: string[] = data.map((d) => d['name']);
    this.ugs.denyPermissions(this.data['id'], permissions).pipe(take(1)).subscribe(
      () => {
        this.messageService.success('Permissions Denied Successfully.');
        this.loadData(this.data['id']);
      }
    );
  }

  public isDenyActionVisible(data: any): boolean {
    const rows: any[] = data as any[];
    let isVisible: boolean = true;
    for (const r of rows) {
      if (r['isGranted'] === false) {
        isVisible = false;
        break;
      }
    }
    return isVisible;
  }

  public isGrantActionVisible(data: any): boolean {
    const rows: any[] = data as any[];
    let isVisible: boolean = true;
    for (const r of rows) {
      if (r['isGranted'] === true) {
        isVisible = false;
        break;
      }
    }
    return isVisible;
  }

}
