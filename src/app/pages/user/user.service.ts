import {Injectable} from '@angular/core';
import {ProviderService} from '../../services/provider.service';
import {ApiResponse} from '../../model/api-model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly userURL: string = '/admin/users';

  constructor(private providerService: ProviderService) {
  }

  public addUser(user: any): Observable<ApiResponse> {
    return this.providerService.post(this.userURL, user);
  }

  public getUsers(): Observable<ApiResponse> {
    return this.providerService.get(this.userURL);
  }

  public getUser(id: number): Observable<ApiResponse> {
    const url: string = `${this.userURL}/${id}`;
    return this.providerService.get(url);
  }

  public deactivateUser(user: any): Observable<ApiResponse> {
    const url: string =  `${this.userURL}/${user.id}/set-state`;
    return this.providerService.post(url, user);
  }

  public updateUser(user: any): Observable<ApiResponse> {
    return this.providerService.put(this.userURL, user);
  }
}
