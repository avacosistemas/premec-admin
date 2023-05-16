import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { ApiAutocompleteConfiguration } from '../../component/autocomplete/autocomplete.interface';
import { GenericHttpService } from '../../service/generic-http-service/generic-http.service';
import { take } from 'rxjs/operators';

@Injectable()
export class AutocompleteService {

  constructor(protected httpService: GenericHttpService) {}

  public autocompleteSearch(formGroup: FormGroup, configuration: ApiAutocompleteConfiguration): Observable<any[]>{
    return new Observable((obs) => {
        if (configuration.apiOptions && configuration.apiOptions.url) {
          const apiOptions = configuration.apiOptions;
          if (apiOptions.url){
            let url = `${apiOptions.url}?`;
            if (apiOptions.queryString) {
              const filter: any = this.getFilter(apiOptions.queryString, formGroup);
              Object.getOwnPropertyNames(filter).forEach((prop, index) => {
                if (index > 0){
                  url += '&';
                }
                if (filter[prop]) {
                  url += `${prop}=${filter[prop]}`;
                } else {
                  url += `${prop}=`;
                }
              });
            }
            this.httpService.basicGet(url, undefined, undefined, undefined)
            .subscribe(r => {
              obs.next(r);
            });
          } else {
            obs.next(configuration.apiOptions.fromData);
          }
        }
    });
  }

  private getFilter(queryString: any, formGroup: FormGroup){
    const filter: any = {};
    if (queryString) {
      Object.getOwnPropertyNames(queryString).forEach(prop => {
        filter[prop] = formGroup.controls[queryString[prop]].value;
      });
    }
    return filter;
  }
}