import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {NbAuthService, NbAuthToken} from '@nebular/auth';
import {ProviderService} from '../services/provider.service';
import {UserService} from '../pages/user/user.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionResolver implements Resolve<any> {

  private username: string | undefined = undefined;
  private doRefresh: boolean = true;

  constructor(private authService: NbAuthService,
              private providerService: ProviderService,
              private userService: UserService) {
    this.subscribeForAuthEvents();
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    if (this.doRefresh) {
      this.doRefresh = false;
      this.userService.refreshUserPermissions(this.username);
      this.userService.fetchLoggedInUser(this.username);
    }
  }

  private subscribeForAuthEvents(): void {
    this.authService.getToken().subscribe(
      (token: NbAuthToken) => {
        this.username = token.getPayload().sub;
        this.doRefresh = true;
      }
    );
  }

}
