import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserMessageService} from '../services/user-message.service';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {


  constructor(private messageService: UserMessageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        const body: any = errorResponse.error;
        this.messageService.error(body.message);
        return throwError(errorResponse);
      })
    );
  }
}
