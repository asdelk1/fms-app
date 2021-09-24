import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NbAuthService} from '@nebular/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: NbAuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('token: ' + this.authService.getToken());
    return undefined;
  }

}
