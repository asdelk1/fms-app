import {Component, OnInit} from '@angular/core';
import {OwerpTableColumn, OwerpTableColumnType} from '../../../@control/table/owerp-table.model';
import {UserLoginHistoryService} from '../../user-login-history.service';
import {ApiResponse} from '../../../model/api-model';

@Component({
  selector: 'ngx-owerp-list-history',
  templateUrl: './list-history.component.html',
  styleUrls: ['./list-history.component.css']
})
export class ListHistoryComponent implements OnInit {

  public columns: OwerpTableColumn = {
    id: {title: 'Id', type: OwerpTableColumnType.TEXT},
    user: {title: 'User', type: OwerpTableColumnType.TEXT},
    ip: {title: 'IP Address', type: OwerpTableColumnType.TEXT},
    loggedInTime: {title: 'Logged In Time', type: OwerpTableColumnType.TEXT},
    loggedOutTime: {title: 'Logged Out Time', type: OwerpTableColumnType.TEXT}
  };

  public data: any[] = [];

  constructor(private userLoginHistoryService: UserLoginHistoryService) {
  }

  ngOnInit(): void {
    this.userLoginHistoryService.getUserLoginHistory().subscribe(
      (res: ApiResponse) => {
        this.data = res.data.map(d => {
          return {
            id: d['id'],
            user: d['user']['username'],
            ip: d['ip'],
            loggedInTime: d['loggedInTime'],
            loggedOutTime: d['loggedOutTime'],
          };
        });
      }
    );
  }

}
