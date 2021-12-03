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
}
