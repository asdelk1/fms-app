import {Injectable} from '@angular/core';
import {ProviderService} from '../../services/provider.service';
import {ApiResponse} from '../../model/api-model';
import {Observable, Subject} from 'rxjs';
import {LoggedInUser} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly userURL: string = '/admin/users';
  private _userPermissions: Set<string> | undefined = undefined;
  private _loggedInUser$: Subject<LoggedInUser> = new Subject<LoggedInUser>();
  public get loggedInUser$(): Observable<LoggedInUser> {
    return this._loggedInUser$.asObservable();
  }

  constructor(private providerService: ProviderService) {
  }

  public addUser(user: any): Observable<ApiResponse> {
    return this.providerService.post(this.userURL, user);
  }

  public getUsers(): Observable<ApiResponse> {
    return this.providerService.get(this.userURL);
  }

  public getUser(id: string): Observable<ApiResponse> {
    const url: string = `${this.userURL}/${id}`;
    return this.providerService.get(url);
  }

  public deactivateUser(user: any): Observable<ApiResponse> {
    const url: string = `${this.userURL}/${user.id}/set-state`;
    return this.providerService.post(url, user);
  }

  public updateUser(user: any): Observable<ApiResponse> {
    return this.providerService.put(this.userURL, user);
  }

  public getUserGroups(id: string): Observable<ApiResponse> {
    return this.providerService.get(`${this.userURL}/${id}/user-groups`);
  }

  public refreshUserPermissions(username: String): void {
    const url: string = `${this.userURL}/${username}/permissions`;
    this.providerService.get(url).subscribe(
      (res: ApiResponse) => {
        this._userPermissions = new Set<string>(res.data);
      }
    );
  }

  public getUserPermissions(): Set<string> | undefined {
    if (this._userPermissions === undefined) {
      return undefined;
    }

    return this._userPermissions;
  }

  public fetchLoggedInUser(username: string): void {
    const url: string = `${this.userURL}/username/${username}`;
    this.providerService.get(url).subscribe(
      (res: ApiResponse) => {
        const loggedInUser: LoggedInUser = new LoggedInUser(
          res.data['firstName'],
          res.data['lastName'],
          res.data['username'],
          res.data['email']
        );
        this._loggedInUser$.next(loggedInUser);
      }
    );
  }

}
