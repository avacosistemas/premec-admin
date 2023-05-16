import { ErrorHandler } from '@angular/core';
import { Injectable } from '@angular/core';
import { Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { I18n } from '../../model/i18n';
import { NotificationService } from '../notification/notification.service';
import { BaseService } from '../base-service/base.service';
import { I18nService } from '../i18n-service/i18n.service';
import { ErrorMessageService } from '../message/error-message.service';
import { VALIDATIONS_ERRORS } from '../../component/abstract-form.component';


export const ERROR_UNKNOWN_MESSAGE = 'error_unknown_message';
export const ERROR_INTERNET_DISCONNECTED_MESSAGE = 'error_internet_disconnected_message';

@Injectable()
export class GeneralErrorHandlerService extends BaseService implements ErrorHandler {
  i18nService: I18nService;
  i18n: I18n;
  constructor(injector: Injector) {
    super(injector);
    this.i18nService = injector.get(I18nService);
    this.i18nService.addI18n({
      name: 'error-handler',
      lang: 'es',
      dictionary: {
        error_unknown_message: 'Se ha producido un error. Por favor, intente mas tarde',
        error_internet_disconnected_message: 'Se ha perdido la conexión a internet. Por favor, compruebela y recargue la página',
      }
    });
    this.i18nService.getByName('error-handler').subscribe(i18n => {
      this.i18n = i18n;
    });
  }

  handleError(error: Error | HttpErrorResponse | any) {
    console.log(error);
    const router = this.injector.get(Router);
    const errorMessageService = this.injector.get(ErrorMessageService);
    const notificationService = this.injector.get(NotificationService);
    if (error instanceof HttpErrorResponse) {
        // Server error happened
        if (!navigator.onLine) {
          // No Internet connection
          // router.navigate(['/errors/error-500']);
          notificationService.notifyError(this.i18n.translate(ERROR_INTERNET_DISCONNECTED_MESSAGE));
        }
        // Http Error
        if (error.status === 401) {
          console.log('Error 401');
          console.log(error);
        }
        if (error && error.error && VALIDATIONS_ERRORS === error.error.status && error.error.message) {
          notificationService.notifyError(error.error.message);  
        }
      } else if (error.message === 'revalidate' || error.message === 'notuserlogged') {
        // Client Error Happend
      }else{
        notificationService.notifyError(this.i18n.translate(ERROR_UNKNOWN_MESSAGE));
      }
  }
}
