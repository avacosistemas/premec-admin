import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PREFIX_DOMAIN_API } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class CierreMesService {

  private url = `${PREFIX_DOMAIN_API}cierremespreview`;
  constructor(private http: HttpClient) { }

  getPreview(anio: number, mes: number): Observable<any> {
    const params = new HttpParams()
      .set('anio', anio.toString())
      .set('mes', mes.toString());

    return this.http.get<any>(this.url, { params });
  }

  saveCierres(data: any[]): Observable<any> {
    return this.http.post(this.url, data);
  }
}