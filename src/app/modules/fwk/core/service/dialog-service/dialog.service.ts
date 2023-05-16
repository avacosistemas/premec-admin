import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Injector } from '@angular/core';
import { OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { MessageService } from '../message/message.service';
import { FormDef } from '../../model/form-def';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WsDef } from '../../model/ws-def';
import { I18n } from '../../model/i18n';
import { BasicModalComponent } from '../../component/crud/basic-modal/basic-modal.component';
import { HtmlModalComponent } from '../../component/crud/html-modal/html-modal.component';
import { QuestionModalComponent } from '../../component/question-modal/question-modal.component';
import { I18nService } from '../i18n-service/i18n.service';
import { GridModalComponent } from '../../component/grid-modal/grid-modal.component';

@Injectable()
export class DialogService {
  private i18n;
  protected localStorageService: LocalStorageService;
  constructor(protected injector: Injector,
              private i18nService: I18nService,
              private  dialog: MatDialog) {
     this.localStorageService = injector.get(LocalStorageService);
     i18nService.addI18n({
        name: 'dialogs',
        lang: 'es',
        words: {
          title: 'Confirmar Operación',
          message: '¿Deseas confirmar la operación?',
          confirm: 'Si',
          no_confirm: 'No',
          title_grid_modal: 'Detalle'
        }
     });
     i18nService.getByName('dialogs').subscribe(r => {
      this.i18n = r;
     });
  }

  openHtmlModal(data, dialogConfig){
    const dialogRef = this.dialog.open(HtmlModalComponent, {
      width: 'auto',
      panelClass: 'control-mat-dialog',
      data: data
    });
    return dialogRef;
  }
  showFormDialogCustomSubmit(i18n: I18n, formDef: FormDef, dialogConfig, submit , entity = null, modalName = null){
    return this.showFormDialog(this.dialog, i18n, formDef, dialogConfig, entity, submit, modalName);
  }
  showFormDialog(dialog: MatDialog, i18n: I18n, formDef: FormDef, dialogConfig, entity = null, submit = null, modalName = null): MatDialogRef<any>{
      if (dialog){
        dialog = this.dialog;
      }
      const action = {
        formKey : formDef.key,
        form: formDef.fields,
        ws: formDef.submitWs
      };
      const data = { 
                     entity: entity === null ? undefined : entity,
                     config: action,
                     i18n: i18n,
                     modalName: modalName !== null ? modalName : undefined,
                     submit : submit === null || submit === undefined ? undefined : submit
                  };

      const dialogRef = dialog.open(BasicModalComponent, {
        width:  dialogConfig &&
                  dialogConfig.width ?
                    dialogConfig.width : '320px',
        panelClass: 'control-mat-dialog',
        data: data
      });

      return dialogRef;
  }

  showQuestionModal(title, message, acceptButton, onSubmit, onReject){
    title = title ? title : this.translate('title');
    message = message ? message : this.translate('message');
    acceptButton = acceptButton ? acceptButton : this.translate('confirm');
    const dialogRef = this.dialog.open(QuestionModalComponent, {
      width: 'auto',
      data: {
              title: title,
              message: message,
              acceptButtonName: acceptButton,
              rejectButtonName: this.translate('no_confirm'),
              action: {
                        onReject: onReject,
                        onSubmit: onSubmit
              }
            }
    });
    return dialogRef;
  }

  showGridModal(title, entities, gridDef){
    title = title ? title : this.translate('title_grid_modal');
    const dialogRef = this.dialog.open(GridModalComponent, {
      width: 'auto',
      data: {
              title: title,
              entities: entities,
              gridDef: gridDef
            }
    });
    return dialogRef;
  }

  private translate(key){
    return this.i18n.translate(key);
  }
}
