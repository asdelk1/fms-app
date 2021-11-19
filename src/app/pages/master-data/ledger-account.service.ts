import {Injectable} from '@angular/core';
import {ProviderService} from '../../services/provider.service';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../model/api-model';

@Injectable({
  providedIn: 'root'
})
export class LedgerAccountService {

  private readonly baseURL: string = '';

  constructor(private provider: ProviderService) {
  }

  public fetchActive(): Observable<ApiResponse> {
    return this.provider.get(`${this.baseURL}/active`);
  }
}
