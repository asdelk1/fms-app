import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../model/api-model';

@Injectable({
  providedIn: `root`
})
export class ProviderService {

  private readonly baseUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  public get(url: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}${url}`);
  }

  public post(url: string, payload: any): Observable<ApiResponse> {
    const endPoint: string = this.baseUrl + url;
    return this.http.post<ApiResponse>(endPoint, payload);
  }

}
