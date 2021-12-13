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

  public fetch(id: string): Observable<ApiResponse> {
    return this.provider.get(this.baseURL + '/' + id);
  }

  public fetchAllToCheck(): Observable<ApiResponse> {
    return this.provider.get(this.baseURL + '/to-check');
  }

  public fetchAllToApprove(): Observable<ApiResponse> {
    return this.provider.get(this.baseURL + '/to-approve');
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

  public check(invoiceId: string, message?: string): Observable<ApiResponse> {
    const body: any = {
      invoiceId: +invoiceId,
      note: message
    };

    const url: string = `${this.baseURL}/${invoiceId}/check`;
    return this.provider.post(url, body);
  }

  public reject(invoiceId: string, message?: string): Observable<ApiResponse> {
    const body: any = {
      invoiceId: +invoiceId,
      note: message
    };

    const url: string = `${this.baseURL}/${invoiceId}/reject`;
    return this.provider.post(url, body);
  }

  public approve(invoiceId: string, data?: string): Observable<ApiResponse> {
    const body: any = {
      invoiceId: +invoiceId,
      note: data['note'],
      sendEmail: data['sendEmail']
    };

    const url: string = `${this.baseURL}/${invoiceId}/approve`;
    return this.provider.post(url, body);
  }

  public removeApproval(invoiceId: string, data?: string): Observable<ApiResponse> {
    const body: any = {
      invoiceId: +invoiceId,
      note: data['note'],
      sendEmail: data['sendEmail']
    };

    const url: string = `${this.baseURL}/${invoiceId}/remove-approval`;
    return this.provider.post(url, body);
  }


}
