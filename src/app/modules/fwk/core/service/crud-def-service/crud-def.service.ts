import { Injectable } from '@angular/core';
import { Observable ,  of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { Injector } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { CrudDef } from '../../model/component-def/crud-def';
export const CRUDS: any = [];

@Injectable()
export class CrudDefService extends HttpService {

  constructor(protected injector: Injector) {
        super(injector, 'cruds');
  }
  // tslint:disable-next-line:no-shadowed-variable
  getByName(crudName: string): Observable<CrudDef> {
    const obs = new Observable<any>((observer) => {

                  observer.next(this.dummy(crudName));
    });
    return obs;
  }

  dummy(byName) {
    for (let i = 0; i < CRUDS.length; i++) {
        let e;
        e = CRUDS[i];
        if (e.name === byName) {
            return e;
        }
    }
    return null;
}
}
