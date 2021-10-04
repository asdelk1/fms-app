import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NbAuthService, NbAuthToken} from '@nebular/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private token: string;

  constructor(private authService: NbAuthService) {
    this.authService.onTokenChange().subscribe(
      (token: NbAuthToken) => {
        this.token = token.getValue();
      }
    );
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: { Authorization: 'Bearer ' + this.token}
    });
    return next.handle(req);
  }



}
