import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { OnInit } from '@angular/core';
import { Injector } from '@angular/core';
import { BaseService } from '../base-service/base.service';
import { I18nService } from '../i18n-service/i18n.service';
import { I18n } from '../../model/i18n';

export const NOTIFICATION_I18N = 'notification';
export const NOTIFICATION_OPTS: any = {
  duration: 5000,
  horizontalPosition: 'left',
  verticalPosition: 'bottom',
};

@Injectable()
export class NotificationService extends BaseService {

  i18nService: I18nService;
  i18n: I18n;

  constructor(private snackBar: MatSnackBar, injector: Injector) {
    super(injector);
    this.i18nService = injector.get(I18nService);
    this.i18nService.addI18n({
      name: NOTIFICATION_I18N,
      lang: 'es',
      dictionary: {
        action_close: 'Cerrar',
      }
    });
    this.i18nService.getByName(NOTIFICATION_I18N).subscribe(i18n => {
      this.i18n = i18n;
    });
  }

  notify(message: string) {
    NOTIFICATION_OPTS['extraClasses'] = ['notification-class'];
    this.snackBar.open(message, this.i18n.translate('action_close'), NOTIFICATION_OPTS);
  }
  
  notifyError(message: string) {
    NOTIFICATION_OPTS['extraClasses'] = ['notification-error-class'];
    this.snackBar.open(message, this.i18n.translate('action_close'), NOTIFICATION_OPTS);
  }

  notifySuccess(message: string) {
    const config = new MatSnackBarConfig();
    NOTIFICATION_OPTS['extraClasses'] = ['notification-success-class'];
    this.snackBar.open(message, this.i18n.translate('action_close'), NOTIFICATION_OPTS);
  }
}
