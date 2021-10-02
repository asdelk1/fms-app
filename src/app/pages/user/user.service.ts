import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProviderService} from '../../services/provider.service';
import {ApiResponse} from '../../model/api-model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly userURL: string = '/user';

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
}
