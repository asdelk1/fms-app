import { Injectable } from '@angular/core';
import {ProviderService} from '../../../services/provider.service';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../../model/api-model';

@Injectable({
  providedIn: 'root'
})
export class ChartOfAccountsService {

  private readonly baseURL: string = '/master-data/chart-of-accounts';
  constructor(private providerService: ProviderService) { }

  public fetchAll(): Observable<ApiResponse> {
    return this.providerService.get(this.baseURL);
  }
}
