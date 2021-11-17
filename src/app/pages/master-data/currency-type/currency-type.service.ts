import {Injectable} from '@angular/core';
import {ProviderService} from '../../../services/provider.service';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../../model/api-model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyTypeService {

  private baseURL: string = '/master-data/currency-types';

  constructor(private providerService: ProviderService) {
  }

  public fetchAll(): Observable<ApiResponse> {
    return this.providerService.get(this.baseURL);
  }

  public fetchActive(): Observable<ApiResponse> {
    return this.providerService.get(`${this.baseURL}/active`);
  }

  public fetch(id: string): Observable<ApiResponse> {
    return this.providerService.get(`${this.baseURL}/${id}`);
  }

  public create(type: any): Observable<ApiResponse> {
    return this.providerService.post(this.baseURL, type);
  }

  public update(id: string, type: any): Observable<ApiResponse> {
    return this.providerService.put(`${this.baseURL}/${id}`, type);
  }
}
