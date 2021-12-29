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

  public createJournalEntry(data: any): Observable<ApiResponse> {
    return this.provider.post(this.baseURL, data);
  }

  public fetchAllStandingEntries(): Observable<ApiResponse> {
    return this.provider.get(this.baseURL + '/standing');
  }

  public fetchStandingEntry(id: number): Observable<ApiResponse> {
    return this.provider.get(this.baseURL + '/standing/' + id);
  }

  public fetchAllToApprove(): Observable<ApiResponse> {
    return this.provider.get(this.baseURL + '/to-approve');
  }

  public fetchAllToCheck(): Observable<ApiResponse> {
    return this.provider.get(this.baseURL + '/to-check');
  }

  public fetch(id: string): Observable<ApiResponse> {
    return this.provider.get(this.baseURL + `/journal-entries/${id}`);
  }

  public checkEntry(id: string, note: string, isRejected: boolean): Observable<ApiResponse> {
    const url: string = this.baseURL + '/' + (isRejected === false ? 'check' : 'check-reject');
    const payload: any = {
      entryId: id,
      note: note
    };
    return this.provider.post(url, payload);
  }

  public approveEntry(id: string, note: string, isRejected: boolean): Observable<ApiResponse> {
    const url: string = this.baseURL + '/' + (isRejected === false ? 'approve' : 'approve-reject');
    const payload: any = {
      entryId: id,
      note: note
    };
    return this.provider.post(url, payload);
  }
}
