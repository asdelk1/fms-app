import {Injectable} from '@angular/core';
import {ProviderService} from '../services/provider.service';
import {Observable} from 'rxjs';
import {ApiResponse} from '../model/api-model';

@Injectable({
  providedIn: 'root'
})
export class UserLoginHistoryService {

  private readonly baseUrl: string = '/user-login-history';

  constructor(private provider: ProviderService) {
  }

  public getUserLoginHistory(): Observable<ApiResponse> {
    return this.provider.get(this.baseUrl);
  }
}
