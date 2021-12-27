import {Injectable} from '@angular/core';
import {ProviderService} from '../../services/provider.service';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../model/api-model';
import {OwerpLabelValueModel} from '../../@control/form/owerp-form.model';

@Injectable({
  providedIn: 'root'
})
export class LedgerService {

  private readonly baseURL: string = '/master-data/ledger-accounts';

  constructor(private provider: ProviderService) {
  }

  public fetchLedgerTypeCategories(category: string): Observable<ApiResponse> {
    const url: string = `/master-data/ledger-types/categories/${category}`;
    return this.provider.get(url);
  }

  public fetchActiveLedgerCategories(): Observable<ApiResponse> {
    return this.provider.get(this.baseURL + '/categories/active');
  }

  public fetchLedgerCategory(id: string): Observable<ApiResponse> {
    return this.provider.get(this.baseURL + '/categories/' + id);
  }

  public saveLedgerCategory(category: any): Observable<ApiResponse> {
    const url: string = this.baseURL + '/create-legend-category';
    return this.provider.post(url, category);
  }

  public fetchAll(): Observable<ApiResponse> {
    return this.provider.get(this.baseURL);
  }

  public fetchActive(): Observable<ApiResponse> {
    return this.provider.get(`${this.baseURL}/active`);
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

  public getLedgerAccountAutoCompleteData(data: any[]): OwerpLabelValueModel[] {
    return data.map(
      (la: any) => {
        return {
          value: la['id'],
          label: `${la['ledgerAccName']}(${la['ledgerAccCode']})`
        };
      }
    );
  }

  public getLedgerAccountCategoryAutoCompleteData(data: any[]): OwerpLabelValueModel[] {
    return data.map(
      (la: any) => {
        return {
          value: la['id'],
          label: `${la['accName']}(${la['accCode']})`
        };
      }
    );
  }

}
