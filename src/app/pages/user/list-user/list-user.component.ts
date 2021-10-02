import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {NbDialogService} from '@nebular/theme';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../user.service';
import {ApiResponse} from '../../../model/api-model';

@Component({
  selector: 'ngx-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  settings = {
    selectMode: 'multi',
    mode: 'external',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>'
    },
    edit: {
      editButtonContent: '<i class="nb-paper-plane"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>'
    },
    actions: {
      enable: false,
      edit: false,
      delete: false
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number'
      },
      firstName: {
        title: 'First Name',
        type: 'string'
      },
      lastName: {
        title: 'Last Name',
        type: 'string'
      },
      username: {
        title: 'Username',
        type: 'string'
      },
      email: {
        title: 'E-mail',
        type: 'string'
      },
      age: {
        title: 'Epf No',
        type: 'string'
      },
      active: {
        title: 'Active',
        type: 'checkbox',
        filter: {
          type: 'checkbox',
          config: {
            class: '',
            true: 'true',
            false: 'false',
            resetText: 'clear'
          }
        }
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();
  public selectedRows: any = [];

  constructor(private dialogService: NbDialogService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (res: ApiResponse) => {
        const userData: any[] = res.data;
        this.source.load(userData);
      }
    );
  }

  public onUserCreate(): void {
    this.router.navigate(['add-user'], {relativeTo: this.activatedRoute});
  }

  public rowSelect(rows: any) {
    this.selectedRows = rows.selected;
  }

  public viewDetails(): void {
    this.router.navigate(['view', this.selectedRows[0].id], {relativeTo: this.activatedRoute});
  }

}

