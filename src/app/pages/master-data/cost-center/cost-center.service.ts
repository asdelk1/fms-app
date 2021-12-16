import {Injectable} from '@angular/core';
import {ProviderService} from '../../../services/provider.service';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../../model/api-model';
import {OwerpLabelValueModel} from '../../../@control/form/owerp-form.model';

@Injectable({
  providedIn: 'root'
})
export class CostCenterService {

  private baseURL: string = '/master-data/cost-centers';

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

  public getAutoCompleteData(data: any[]): OwerpLabelValueModel[] {
    return data.map((c: any) => {
      return {
        value: c['id'],
        label: `${c['name']}(${c['code']})`
      };
    });
  }
}
