import { Injectable } from '@angular/core';
import { Observable ,  of } from 'rxjs';
import { Injector } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { WsDef, HTTP_METHODS } from '../../model/ws-def';

@Injectable()
export class GenericHttpService extends HttpService {
    
    constructor(injector: Injector) {
        super(injector, '');
    }

    basicPost(url, data): Observable<any> {
        const observable = new Observable((observer) => {
        let wsurl = url;
        this.httpPost(wsurl, data, this.httpOptions)
            .subscribe(response => this.subHandleResponse(observer, response), error => observer.error(error), () => observer.complete());
        });
        return observable;
    }

    basicDelete(url, data): Observable<any> {
        const observable = new Observable((observer) => {
        this.httpDelete(url, data.id, this.httpOptions)
            .subscribe(response => this.subHandleResponse(observer, response), error => observer.error(error), () => observer.complete());
        });
        return observable;
    }

    basicDeleteTernaria(url, data, querystring): Observable<any> {
        if (querystring && data) {
            let qsBuilder = '';
            let andString = '';
            querystring.forEach(key => {
                if (key) {
                    qsBuilder += andString + key + '/' + data[key];
                    andString = '/';
                }
            });
            url += qsBuilder;
        }

        const observable = new Observable((observer) => {
        this.httpDeleteTernaria(url)
            .subscribe(response => this.subHandleResponse(observer, response), error => observer.error(error), () => observer.complete());
        });
        return observable;
    }

    basicPut(url, data): Observable<any> {
        const observable = new Observable((observer) => {
        this.httpPut(url, data, this.httpOptions)
            .subscribe(response => this.subHandleResponse(observer, response), error => observer.error(error), () => observer.complete());
        });
        return observable;
    }

    basicGet(url, data, filter, querystring): Observable<any> {
        // Implementar el filtrado por url
        if (querystring && data) {
            let qsBuilder = '';
            let andString = '';
            Object.keys(querystring).forEach(key => {
                if (data[querystring[key]]) {
                    qsBuilder += andString + key + '=' + data[querystring[key]];
                    andString = '&';
                }
            });
            url += qsBuilder === '' ? '' : '?' + qsBuilder;
        }
        const observable = new Observable((observer) => {
        this.httpGet(url, this.httpOptions)
            .subscribe(response => this.subHandleResponse(observer, response), error => observer.error(error), () => observer.complete());
        });
        return observable;
    }

    callWs(ws: WsDef, data = null){
        console.log('call ws: ' + ws.url);
        console.log('method: ' + ws.method);
        switch (ws.method.toUpperCase()){
            case HTTP_METHODS.post: return this.basicPost(ws.url, data);
            case HTTP_METHODS.delete: return this.basicDelete(ws.url, data);
            case HTTP_METHODS.delete_ternaria: return this.basicDeleteTernaria(ws.url, data, ws.querystring);
            case HTTP_METHODS.put: return this.basicPut(ws.url, data);
            case HTTP_METHODS.get: return this.basicGet(ws.url, data, ws.filter, ws.querystring);
        }
        return of();
    }
}
