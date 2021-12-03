import {Injectable} from '@angular/core';
import {ProviderService} from '../../services/provider.service';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../model/api-model';
import {take} from 'rxjs/operators';
import {OwerpLabelValueModel} from '../../@control/form/owerp-form.model';

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
    return this.provider.post(this.baseURL, type);
  }

  public updateType(id: string, type: any): Observable<ApiResponse> {
    return this.provider.put(this.baseURL + '/' + id, type);
  }

  public fetchActiveTypes(): Observable<ApiResponse> {
    return this.provider.get(`${this.baseURL}/active`);
  }

  public getAutocompleteData(data: any[]): OwerpLabelValueModel[] {
    return data.map((d: any) => {
      return {
        value: d['id'],
        label: `${d['typeName']}(${d['typeCode']})`
      };
    });
  }
}
