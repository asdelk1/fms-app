import {Injectable} from '@angular/core';
import {ProviderService} from '../../services/provider.service';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../model/api-model';
import {OwerpLabelValueModel} from '../../@control/form/owerp-form.model';

@Injectable({
  providedIn: 'root'
})
export class InvestmentTypesService {

  private readonly baseURL: string = '/investments/types';

  constructor(private provider: ProviderService) {
  }

  public fetchAll(): Observable<ApiResponse> {
    return this.provider.get(this.baseURL);
  }

  public fetchAllActive(): Observable<ApiResponse> {
    return this.provider.get(this.baseURL + '/active');
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

  public getAutoCompleteData(data: any[]): OwerpLabelValueModel[] {
    return data.map((d: any) => {
      return {
        label: `${d['name']}(${d['code']})`,
        value: d['id']
      };
    });
  }
}
