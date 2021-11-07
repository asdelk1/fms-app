import {Injectable} from '@angular/core';
import {ProviderService} from '../../services/provider.service';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../model/api-model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private readonly baseURL: string = '/suppliers';

  constructor(private provider: ProviderService) {
  }

  public fetchAll(): Observable<ApiResponse> {
    return this.provider.get(this.baseURL);
  }

  public fetch(id: string) {
    return this.provider.get(`${this.baseURL}/${id}`);
  }

  public save(supplier: any): Observable<ApiResponse> {
    return this.provider.post(this.baseURL, supplier);
  }

}
