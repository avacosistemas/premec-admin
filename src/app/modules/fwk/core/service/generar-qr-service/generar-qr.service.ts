import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PREFIX_DOMAIN_API } from 'environments/environment'

@Injectable({
  providedIn: 'root'
})
export class GenerarQrService {
  private apiUrl = PREFIX_DOMAIN_API;

  constructor(private http: HttpClient) {}

  getServiceCallId(serviceCallId: string): Observable<string> {
    return this.http.get<{ status: string, data: string }>(`${this.apiUrl}encodearServiceCall?serviceCallId=${serviceCallId}`).pipe(
      map(response => response.data)
    );
  }
}
