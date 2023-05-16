import { Injectable } from '@angular/core';

import { Injector } from '@angular/core';
import { I18nService } from '../i18n-service/i18n.service';
import { I18n } from '../../model/i18n';


@Injectable()
export class ErrorMessageService {

  error: any;
  i18nService: I18nService;
  i18n: I18n;
  constructor(injector: Injector) {
    this.i18nService = injector.get(I18nService);
    this.i18nService.getByName(this.getI18nName()).subscribe(
                i18n => {
                        this.i18n = i18n;
                        }
                      );
  }

  translate(key: string) {
    let value;
    if (this.i18n) {
      value = this.i18n.dictionary[key];
    }
    return value ? value : key;
  }
  setError(error) {
    this.error = error;
  }

  clear() {
    this.error = null;
  }

  getError() {
    return this.error;
  }

  getI18nName(): string {
   return 'error';
  }

}
