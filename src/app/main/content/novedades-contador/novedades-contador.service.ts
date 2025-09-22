import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PREFIX_DOMAIN_API } from 'environments/environment';
import { Observable } from 'rxjs';
import { NovedadesContadorApiResponse, NovedadesContadorData } from './novedades-contador.models';

@Injectable()
export class NovedadesContadorService {
    private url = `${PREFIX_DOMAIN_API}novedadescontadorpreview`;
private urls = `${PREFIX_DOMAIN_API}novedadescontadorprevi`;
    constructor(private http: HttpClient) { }

    getPreview(anio: number, mes: number): Observable<NovedadesContadorApiResponse> {
        const params = new HttpParams()
            .set('anio', anio.toString())
            .set('mes', mes.toString());

        return this.http.get<NovedadesContadorApiResponse>(this.url, { params });
    }

    saveNovedades(data: NovedadesContadorData): Observable<any> {
        return this.http.post(this.urls, data);
    }
}