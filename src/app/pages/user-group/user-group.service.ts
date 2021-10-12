import {Injectable} from '@angular/core';
import {ProviderService} from '../../services/provider.service';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../model/api-model';

@Injectable({
  providedIn: 'root'
})
export class UserGroupService {

  private readonly baseURL: string = '/admin/user-groups';

  constructor(private provider: ProviderService) {
  }

  public list(): Observable<ApiResponse> {
    return this.provider.get(this.baseURL);
  }

  public save(userGroup: any): Observable<ApiResponse> {
    return this.provider.post(this.baseURL, userGroup);
  }

  public find(id: string): Observable<ApiResponse> {
    return this.provider.get(`${this.baseURL}\\${id}`);
  }

  public addUsers(id: number, users: any) {
    return this.provider.post(`${this.baseURL}\\${id}\\add-users`, users);
  }

  public deleteUsers(id: number, users: any): Observable<ApiResponse> {
    return this.provider.post(`${this.baseURL}\\${id}\\remove-users`, users);
  }

  public listPermissions(): Observable<ApiResponse> {
    return this.provider.get(`${this.baseURL}\\permissions`);
  }

  public processPermissions(permissionList: string[], groupPermissions: string[]): GrantedPermission[] {
    const processedPermission: GrantedPermission[] = [];
    permissionList.forEach(
      (permission: string) => {
        processedPermission.push({
          name: permission,
          isGranted: groupPermissions.includes(permission)
        });
      });
    return processedPermission;
  }

  public grantPermissions(id: number, permission: string[]) {
    return this.provider.post(`${this.baseURL}\\${id}\\grant-permissions`, permission);
  }

  public denyPermissions(id: number, permission: string[]) {
    return this.provider.post(`${this.baseURL}\\${id}\\deny-permissions`, permission);
  }
}

export interface GrantedPermission {
  name: string;
  isGranted: boolean;
}
