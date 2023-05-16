import { Observable ,  of } from 'rxjs';

import { HttpHeaders, HttpParams } from '@angular/common/http';

import { tap } from 'rxjs/operators';
import { Entity } from '../../model/entity';
import { HttpService } from '../http-service/http.service';
import { FormService } from '../dynamic-form/form.service';
import { Injector } from '@angular/core';
import { CRUD } from './crud';

export abstract class CrudService<E extends Entity> extends HttpService implements CRUD<E> {
    formService: FormService;
    constructor(baseURL: string, protected injector: Injector) {
       super(injector, baseURL);
        this.formService = injector.get(FormService);
    }

        /** GET Es from the server */
    findAll (filterEntity = null, fieldsDef = null, filterInMemory = true, page: {page: number, pageSize: number} = null): Observable<E[]> {
        const observable = new Observable<any> (obs => {
            if (filterEntity && filterEntity !== null && 
                fieldsDef && fieldsDef !== null){ 
                if (filterInMemory){
                    this.httpGet(this.baseUrl, this.httpOptions).subscribe(entities => {
                        entities = this.applyMemoryFilter(entities, filterEntity, fieldsDef);
                        obs.next(entities);
                    }, e => obs.error(e), () => obs.complete());
                }else if (page != null && page !== undefined) {
                    const options: any = {
                        headers: new HttpHeaders( {
                              'Content-Type': 'application/json' })
                    };
                    const params = this.getParametersToUrlAndPage(filterEntity, page);
                    if (params) {
                        options.params = params; 
                    }
                    this.httpGet(this.baseUrl, options).subscribe(entities => {
                        obs.next(entities);
                    }, e => obs.error(e), () => obs.complete());
                } else {
                    const options: any = {
                        headers: new HttpHeaders( {
                              'Content-Type': 'application/json' })
                    };
                    const params = this.getParametersToUrl(filterEntity);
                    if (params) {
                        options.params = params; 
                    }
                    this.httpGet(this.baseUrl, options).subscribe(entities => {
                        obs.next(entities);
                    }, e => obs.error(e), () => obs.complete());
                }
            }else{
                this.httpGet(this.baseUrl, this.httpOptions).subscribe(entities => {
                    obs.next(entities);
                }, e => obs.error(e), () => obs.complete());
            }
        });
        return observable;
    }
    getParametersToUrlAndPage(filterEntity, page: {page: number, pageSize: number}): HttpParams {
        if (filterEntity === undefined) {
            return undefined;
        }
        const props = Object.getOwnPropertyNames(filterEntity); 
        let params = new HttpParams();
        if (page !== null && page !== undefined) {
            Object.getOwnPropertyNames(page).forEach( prop => {
                params = params.append(prop, page[prop]);
            });
        }
        if (props && props.length > 0){
            // Initialize Params Object
            
            const filter = {};
            Object.getOwnPropertyNames(filterEntity).forEach( prop => {
                const value = filterEntity[prop];
                if (value !== undefined && value !== null && value !== '') {
                    filter[prop] = value;
                }
            });
            const nroParams = Object.getOwnPropertyNames(filter).length - 1;
            Object.getOwnPropertyNames(filter).forEach( (prop, index) => {
                params = params.append(index === 0 ? prop : prop,
                                        index === nroParams ? filter[prop] : filter[prop]);
            });

            // return params;
        } 
        return params;
    }
    getParametersToUrl(filterEntity): HttpParams {
        if (filterEntity === undefined) {
            return undefined;
        }
        const props = Object.getOwnPropertyNames(filterEntity); 
        if (props && props.length > 0){
            // Initialize Params Object
            let params = new HttpParams();
            Object.getOwnPropertyNames(filterEntity).forEach( prop => {
                const value = filterEntity[prop];
                if (value !== undefined && value !== null && value !== '') {
                    params = params.append(prop, value);
                }
            });
            return params;
        } 
        return undefined;
    }

    /** GET E by id. Will 404 if id not found */
    getById(id: number): Observable<E> {
        const url = `${this.baseUrl}${id}`;
        console.log('get by id: ' + url);
        return this.httpGet(url, this.httpOptions);
    }
      /** PUT: update the E on the server */
    update (entity: E): Observable<E> {
        return this.httpPut(this.baseUrl, entity, this.httpOptions);
    }

    /** POST: add a new E to the server */
    add (entity: E): Observable<E> {
        return this.httpPost(this.baseUrl, entity, this.httpOptions);
    }

    /** DELETE: delete the E from the server */
    delete (entity: E | number): Observable<E> {
        const id = typeof entity === 'number' ? entity : entity.id;
        return this.httpDelete(this.baseUrl, id, this.httpOptions);
    }

    /** DELETE: delete the E from the server */
    deleteAll (entities: E[]): Observable<E> {
        if (entities.length === 1) {
            return this.delete(entities[0]);
        } else {
            return this.multipleDelete(entities);
        }
    }

    /** DELETE: delete the E from the server */
    deleteAllTernario (entities: E[], columnDefSingleId: String, columnDefMultiId: String): Observable<E> {
        return this.multipleDeleteTernario(entities, columnDefSingleId, columnDefMultiId);
    }

    /* GET Es whose name contains search term */
    search(term: string): Observable<E[]> {
        if (!term.trim()) {
            // if not search term, return empty E array.
            return of([]);
        }
        return this.http.get<E[]>(`api/Es/?name=${term}`).pipe(
        tap(_ => this.log(`found Es matching "${term}"`)));
    }

}
