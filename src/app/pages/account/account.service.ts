import {Injectable} from '@angular/core';
import {ProviderService} from '../../services/provider.service';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../model/api-model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly baseURL: string = '/finance-accounts';

  constructor(private provider: ProviderService) {
  }

  public fetchJournalEntries(): Observable<ApiResponse> {
    return this.provider.get(this.baseURL + '/journal-entries');
  }

  public fetchJournalEntryNumber(): Observable<ApiResponse> {
    return this.provider.get(`${this.baseURL}/new-journal-entry-number`);
  }

  public createJournalEntry(data: any): Observable<ApiResponse>{
    return this.provider.post(this.baseURL, data);
  }
}
