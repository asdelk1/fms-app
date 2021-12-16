import {Injectable} from '@angular/core';
import {ProviderService} from '../../services/provider.service';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../model/api-model';
import {OwerpLabelValueModel} from '../../@control/form/owerp-form.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly baseURL: string = '/customers';

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

  public update(customerId: string, data: any): Observable<ApiResponse> {
    return this.provider.put(this.baseURL + '/' + customerId, data);
  }

  public getAutoCompleteData(data: any[]): OwerpLabelValueModel[] {
    return data.map((d: any) => {
      return {
        value: d['id'],
        label: `${d['customerName']}(${d['customerCode']})`
      };
    });
  }

  public fetchCustomerCode(customerId: string, customerTypeId: string): Observable<ApiResponse> {
    const url: string = this.baseURL + '/' + customerId + '/' + customerTypeId + '/new-customer-code';
    return this.provider.get(url);
  }
}
