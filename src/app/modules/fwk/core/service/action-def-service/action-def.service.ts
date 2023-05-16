import { Injectable } from '@angular/core';
import { SpinnerService } from '../../module/spinner/service/spinner.service';
import { GenericHttpService } from '../generic-http-service/generic-http.service';
import { FileService } from '../file/file.service';
import { MatDialog } from '@angular/material/dialog';
import { ActionDef, ACTION_TYPES } from '../../model/component-def/action-def';
import { Observable } from 'rxjs';
import { BasicModalComponent } from '../../component/crud/basic-modal/basic-modal.component';
import { HtmlModalComponent } from '../../component/crud/html-modal/html-modal.component';
import { DialogService } from '../dialog-service/dialog.service';
import { Route, Router } from '@angular/router';
import { ComponentDefService } from '../component-def-service/component-def.service';
import { ExpressionService } from '../expression-service/expression.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { DisplayActionsCondition } from '../../model/display-actions-condition';
import { NotificationService } from '../notification/notification.service';


@Injectable()
export class ActionDefService {
  
  private spinnerGeneralControl: any;

  constructor( private spinnerService: SpinnerService,
               private genericHttpService: GenericHttpService,
               private router: Router,
               private fileService: FileService,
               private componentDefService: ComponentDefService,
               private expressionService: ExpressionService,
               private localStorageService: LocalStorageService,
               private notificationService: NotificationService,
               private dialogService: DialogService,
               private  dialog: MatDialog) {
        this.spinnerGeneralControl = spinnerService.getControlGlobalSpinner();
  }
  
  getActions(conditions, actions, data){
    if (actions === undefined){
      return undefined;
    }
    return actions.filter(action => {
      if (conditions){
        const condition = conditions.find(c => c.key === action.actionNameKey);
        if (condition){
          return this.expressionService.eval(condition.expression, data);
        }
      }
      return true;
    });
  }

  submitAction(action: ActionDef, entity, i18n, dialogConfig): any{
    const observable = new Observable(obs => {
      if (action.formDef){
        const data = {
          html: action.input.message,
          modalName: action.input.modalName
        };
        const dialog = this.dialogService.openHtmlModal(data, undefined);
        obs.next(dialog);
      }else if (action.actionType === 'notification'){
        const data = {
          html: action.input.message,
          modalName: action.input.modalName
        };
        const dialog = this.dialogService.openHtmlModal(data, undefined);
        obs.next(dialog);
      }else if (action.actionType === 'redirect'){
        if (action.redirect.openTab) {
          var url = "";
          if (action.redirect.externalUrl != undefined && action.redirect.externalUrl) {
            url = action.input;
          } else  {
            url = this.componentDefService.getUrlNavById(action.input);
          }
          var win = window.open(url, '_blank');
          win.focus();
        } else {
          this.router.navigateByUrl(this.componentDefService.getUrlNavById(action.input)).then(() => {
            obs.next({});
            obs.complete();
          });
        }
        
      }else if (action.htmlModal){
        const data = {
          html: entity[action.htmlModal.attributeMapping],
          i18n: i18n,
       };
       const dialogRef = this.dialogService.openHtmlModal(data, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        obs.complete();
      });
      }else if (action.form){
        const data = { 
                       entity: entity,
                       config: action,
                       fields: action.form,
                       i18n: i18n,
                    };
        const dialogRef = this.dialog.open(BasicModalComponent, {
          width:  dialogConfig &&
                      dialogConfig.width ?
                         dialogConfig.width : '320px',
          panelClass: 'control-mat-dialog',
          data: data
        });
  
        dialogRef.afterClosed().subscribe(result => {
          obs.complete();
        });
      }else if (action.gridModal){
          this.dialogService.showGridModal(action.actionName, entity[action.gridModal.fromArrayField], action.gridModal.gridDef);
      }else if (action.confirm){
        const onSubmit = () => {
          this.genericHttpService.callWs(action.ws, entity).subscribe(r => {
            obs.next(r);
          }, e => {
            this.notificationService.notifyError(e.error.message ? e.error.message : 'Se produjo un error al intentar realizar la acción');
          }, () => {
            obs.complete();
            this.spinnerGeneralControl.hide();
          });
        };
        let message;
        if (typeof action.confirm === 'object'){
          message = action.confirm.message;
        }
        this.dialogService.showQuestionModal(action.actionName, message, undefined, onSubmit, undefined);
      }else{
        this.spinnerGeneralControl.show();
        if (ACTION_TYPES.file_download === action.actionType){
            this.fileService.downloadFileByAction(action, entity).subscribe(r => {
              obs.next(r);
            }, e => {
              this.notificationService.notifyError(e.error.message ? e.error.message : 'Se produjo un error al intentar realizar la acción');
            }, () => {
              obs.complete();
              this.spinnerGeneralControl.hide();
          });
        }else{
            this.genericHttpService.callWs(action.ws, entity).subscribe(r => {
              obs.next(r);
            }, e => {
              this.notificationService.notifyError(e.error.message ? e.error.message : 'Se produjo un error al intentar realizar la acción');
            }, () => {
              obs.complete();
              this.spinnerGeneralControl.hide();
            });
        }
      }
    });
   return observable;
  }
 
  filterActionsByCondition(actions: ActionDef [], conditions: DisplayActionsCondition [], objList: any[]){
    if (conditions === undefined || conditions === null){
      return actions;
    }
    let clone: ActionDef [] = this.localStorageService.clone(actions);
    objList.forEach(obj => {
      clone = clone.filter(a => {
        const condition = conditions.find(c => c.key === a.actionNameKey);
        if (condition){
          return this.expressionService.eval(condition.expression, obj);
        }
        return true;
      });
    });
    return clone;
  }
}
