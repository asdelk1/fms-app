import {Injectable} from '@angular/core';
import {ProviderService} from '../../../services/provider.service';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../../model/api-model';
import {OwerpLabelValueModel} from '../../../@control/form/owerp-form.model';

@Injectable({
  providedIn: 'root'
})
export class TaxTypesService {

  private readonly baseURL: string = '/master-data/financial-tax-types';

  constructor(private provider: ProviderService) {
  }

  public fetchAll(): Observable<ApiResponse> {
    return this.provider.get(this.baseURL);
  }

  public fetchAllActive(): Observable<ApiResponse> {
    return this.provider.get(this.baseURL + '/' + 'active');
  }

  public fetch(id: string): Observable<ApiResponse> {
    return this.provider.get(`${this.baseURL}/${id}`);
  }

  public create(data: any): Observable<ApiResponse> {
    return this.provider.post(this.baseURL, data);
  }

  public update(id: string, data: any): Observable<ApiResponse> {
    return this.provider.put(`${this.baseURL}/${id}`, data);
  }

  public getAutocompleteData(data: any[]): OwerpLabelValueModel[] {
    return data.map((d: any) => {
      return {
        value: d['id'],
        label: d['taxCode']
      };
    });
  }
}
