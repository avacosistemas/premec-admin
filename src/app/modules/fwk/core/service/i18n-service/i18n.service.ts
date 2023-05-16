import { Observable ,  of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { Injector } from '@angular/core';
import { BaseService } from '../base-service/base.service';
import { I18n } from '../../model/i18n';
import { i18ns } from '../../../memory/i18ns';
import { ComponentDef } from '../../model/component-def/component-def';

@Injectable()
export class I18nService extends BaseService {

    constructor(protected injector: Injector) {
        super(injector);
    }

    setUpComponentsDef(componentsDef: ComponentDef[]): Observable<any>{
     const observable = new Observable<any>(obs => {
        componentsDef.forEach(comp => {
            this.addI18n(comp.i18n);
        });
        obs.next();
        obs.complete();
     });
     return observable;
    }

    // tslint:disable-next-line:no-shadowed-variable
    getByNameAndLang(byName: string, lang: string): Observable<I18n> {
        // const url = `${this.baseUrl}?name=${byName}`;
        const observable = new Observable<I18n>((observer) => {
            // let i18n: I18n = this.getFromStorage(byName, lang);
            let i18n;
            if (i18n === undefined || i18n === null) {
                // Se usa el diccionario definido en el frontend
                i18n = this.getI18n(i18ns, byName, lang);
                if (i18n === undefined || i18n === null) {
                    i18n = new I18n();
                }
            }

            observer.next(i18n);
            observer.complete();
            /*
            this.http.get<any>(url).pipe(
                tap(_ => this.log(`fetched E name=${byName}`)))
                .subscribe(

                    r => {
                        const data = r.data;
                        if (data){
                            observer.next(data);
                        }else if (!environment.production){
                            observer.next(this.dummy(byName, lang));
                        }else{
                            observer.next(r);
                        }
                    },
                    error => {
                        if (!environment.production){
                            observer.next(this.dummy(byName, lang));
                        }else{
                            observer.error(error);
                        }
                    },
                    () => {
                        observer.complete();
                    });*/

        });

        return observable;
    }

    getByName(byName: string) {
        return this.getByNameAndLang(byName, 'es');
    }

    getFromStorage(byName, lang): I18n {
        const datas = this.localStorageService.getI18nData();
        if (datas) {
            return this.getI18n(datas, byName, lang);
        }
        return undefined;
    }

    getI18n(datas: I18n[], byName, lang) {
        for (let i = 0; i < datas.length; i++) {
            let e;
            e = datas[i];
            if (e.name.toLowerCase() === byName.toLowerCase() &&  e.lang.toLowerCase() === lang.toLowerCase()) {
                const result = new I18n();
                result.clone(e);
                return result;
            }
        }
        return null;
    }

    addI18n(i18n: any) {
        i18ns.push(i18n);
    }

    getI18nName() {
        return 'default';
    }
}
