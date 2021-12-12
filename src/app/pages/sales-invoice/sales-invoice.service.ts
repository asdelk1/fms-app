import {Injectable} from '@angular/core';
import {ProviderService} from '../../services/provider.service';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../model/api-model';

@Injectable({
  providedIn: 'root'
})
export class SalesInvoiceService {

  private readonly baseURL: string = '/sales-invoices';

  constructor(private provider: ProviderService) {
  }

  public fetchAll(): Observable<ApiResponse> {
    return this.provider.get(this.baseURL);
  }

  public fetchInvoiceNo(customerTypeId: string, salesInvoiceId: string): Observable<ApiResponse> {
    const url: string = `${this.baseURL}/${customerTypeId}/${salesInvoiceId}/invoice-no`;
    return this.provider.get(url);
  }

  public fetchCustomerItemAmount(data: any): Observable<ApiResponse> {
    return this.provider.post(this.baseURL + '/calculate-item-amount', data);
  }

  public fetchSalesItemDetailsAndTax(data: any): Observable<ApiResponse> {
    return this.provider.post(this.baseURL + '/getSalesItemDetailsAndTax', data);
  }

  public removeSalesItemDetailsAndTax(data: any): Observable<ApiResponse> {
    return this.provider.post(this.baseURL + '/removeSalesItemDetailsAndTax', data);
  }

  public save(data: any): Observable<ApiResponse> {
    return this.provider.post(this.baseURL, data);
  }
}
