import {Injectable} from '@angular/core';
import {ProviderService} from '../../services/provider.service';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../model/api-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL: string = '/token';

  constructor(private providerService: ProviderService) {
  }

  public requestPassword(email: string): Observable<ApiResponse> {
    const url: string = `${this.baseURL}/generate-password-reset-token`;
    return this.providerService.post(url, email);
  }

  public resetPassword(token: string, password: string): Observable<ApiResponse> {
    const url: string = `${this.baseURL}/reset-password`;
    return this.providerService.post(url, {token: token, password: password});
  }
}
