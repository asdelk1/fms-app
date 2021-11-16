import {Injectable} from '@angular/core';
import {ApiResponse} from '../../model/api-model';
import {Observable} from 'rxjs';
import {ProviderService} from '../../services/provider.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierItemService {

  private readonly baseURL: string = '/suppliers/items';


  constructor(private provider: ProviderService) {
  }

  public fetchAll(): Observable<ApiResponse> {
    return this.provider.get(this.baseURL);
  }

  public fetch(id: string): Observable<ApiResponse> {
    return this.provider.get(`${this.baseURL}/${id}`);
  }

  public create(item: any): Observable<ApiResponse> {
    return this.provider.post(this.baseURL, item);
  }

  public update(id: string, item: any): Observable<ApiResponse> {
    return this.provider.put(`${this.baseURL}/${id}`, item);
  }
}
