import {Injectable} from '@angular/core';
import {ProviderService} from '../../services/provider.service';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../model/api-model';
import {OwerpLabelValueModel} from '../../@control/form/owerp-form.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerTypeService {

  private readonly baseURL: string = '/customer-types';

  constructor(private providerService: ProviderService) {
  }

  public getAll(): Observable<ApiResponse> {
    return this.providerService.get(this.baseURL);
  }

  public getAllActive(): Observable<ApiResponse> {
    return this.providerService.get(this.baseURL + '/active');
  }

  public get(id: string): Observable<ApiResponse> {
    return this.providerService.get(this.baseURL + '/' + id);
  }

  public create(type: any): Observable<ApiResponse> {
    return this.providerService.post(this.baseURL, type);
  }

  public update(type: any, id: string): Observable<ApiResponse> {
    return this.providerService.put(this.baseURL + '/' + id, type);
  }

  public getAutoCompleteData(data: any[]): OwerpLabelValueModel[] {
    return data.map((type: any) => {
      return {
        value: type['id'],
        label: `${type['typeName']}(${type['typeCode']})`
      };
    });
  }
}
