import {Injectable} from '@angular/core';
import {ProviderService} from '../../services/provider.service';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../model/api-model';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupplierTypeService {

  private readonly baseURL: string = '/suppliers/types';

  constructor(private provider: ProviderService) {
  }

  public getTypes(): Observable<ApiResponse> {
    return this.provider.get(this.baseURL).pipe(take(1));
  }

  public getType(id: string): Observable<ApiResponse> {
    return this.provider.get(this.baseURL + '/' + id).pipe(take(1));
  }

  public createType(type: any): Observable<ApiResponse> {
    return this.provider.post(this.baseURL + '/types', type);
  }

  public updateType(id: string, type: any): Observable<ApiResponse> {
    return this.provider.put(this.baseURL + '/' + id, type);
  }
}
