import {Injectable} from '@angular/core';
import {ProviderService} from '../services/provider.service';
import {Observable} from 'rxjs';
import {ApiResponse} from '../model/api-model';

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
}
