import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

import { Subscription ,  Observable } from 'rxjs';
import { OnDestroy } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Injector } from '@angular/core';

import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { AbstractCrudComponent } from './abstract-crud.component';
import { LocalStorageService } from '../../service/local-storage/local-storage.service';

import { StatusTable } from './crud-table/crud-table.component';
import { CrudModalComponent } from './crud-modal/crud-modal.component';
import { FuseConfigService } from '@fuse/services/config.service';
import { I18n } from '../../model/i18n';
import { CrudDef } from '../../model/component-def/crud-def';
import { FormDef } from '../../model/form-def';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from '../../service/dialog-service/dialog.service';
import { ActionDef } from '../../model/component-def/action-def';
import { FileService } from '../../service/file/file.service';
import { ActivatedRoute } from '@angular/router';
import { DynamicField } from '../../model/dynamic-form/dynamic-field';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class CrudComponent extends AbstractCrudComponent<any, any> implements OnInit, OnDestroy {

  // Deprecated
  @Input()
  title: string;

  // Deprecated
  @Input()
  crudName: string;
  _config: string;

  @Input()
  handlerFieldSourceData = new EventEmitter(true);
  @Input()
  onClickRow: any;
  setting: any;
  configService: any;
  onConfigChanged: Subscription;
  display: any;
  selects: any;
  dialog: MatDialog;
  localStorageService: LocalStorageService;
  i18nCurrentCrudComponent: I18n;
  dialogService: DialogService;
  fileService: FileService;
  activatedRoute: ActivatedRoute;
  @Input()
  set componentName(componentName: string){
    this.name = componentName;
    super.ngOnInit();
  }

  @Output()
  onChangeSearchEntity =  new EventEmitter(true);
  
  constructor(configService: FuseConfigService,
              dialog: MatDialog,
              localStorageService: LocalStorageService,
              injector: Injector) {
    super(injector);
    this.activatedRoute = injector.get(ActivatedRoute);
    this.dialogService = injector.get(DialogService);
    this.dialog = dialog;
    this.configService = configService;
    this.localStorageService = localStorageService;
    
    this.onConfigChanged =
    this.configService.onConfigChanged
        .subscribe(
            (newSettings) => {
                this.setting = newSettings;
            }
        );
    this.display =  {
                      deleteButton: false
                    };
    this.fileService = injector.get(FileService);
    
  }
  
  postSetUpCrud(crudDef){
    if (this.crudDef.forms === undefined){  
      this.findAll()  ;
    }else if (this.crudDef.forms.filter === undefined){
      this.findAll();
    }
    if (this.crudDef.grid){
      if (this.crudDef.grid.deleteAction || this.crudDef.grid.deleteColumn){
        this.display.deleteButton = true;
      }
    }
  }

  onInit() {}

  statusChanged(status: StatusTable<any>) {
    this.displayGlobalButtons(status.existSelectedItems());
    this.selects = status.selects;
  }
  
  displayGlobalButtons(hasElementsSelected: boolean): any {
    // this.display.deleteButton = hasElementsSelected;
    this.display.selects = hasElementsSelected;
  }

  openAddDialog(): void {
    this.getFormCreate(this.crudDef).subscribe((formCreate: FormDef) => {
      let funcName = this.crudDef.name;
      if (funcName === undefined){
        funcName = '';
      }
      const fieldsBehavior = formCreate.fieldsBehavior;
      const dialogRef = this.dialog.open(CrudModalComponent, {
        width: this.crudDef.dialogConfig &&
                this.crudDef.dialogConfig.width ?
                    this.crudDef.dialogConfig.width :
                      '320px',
        panelClass: 'control-mat-dialog',
        data: { isAdd: true,
                formDef: this.clone(formCreate),
                translate: (key) => { 
                              return this.translate(key);
                            },
                form: this.addForm,
                formName: 'formCreate',
                funcName: funcName,
                fields: this.clone(formCreate.fields),
                fieldsBehavior: fieldsBehavior,
                handlerFieldSourceData: this.handlerFieldSourceData,
                crud: this}
      });
  
      dialogRef.afterClosed().subscribe(reopen => {
        if(reopen) {
          this.openAddDialog();
        }
      });
    });
  }

  showCrudActions(){
    return this.display.selects ? true : false;
  }

  executeCrudAction(action: ActionDef){
    if (action.formDef){
      let funcName = this.crudDef.name;
      if (funcName === undefined){
        funcName = '';
      }
      if (action.ws){
        this.genericHttpService.callWs(action.ws, this.selects).subscribe( r => {
          this.callCrudDialog(action, r, funcName);
        });
      }else{
        this.callCrudDialog(action, undefined, funcName);
      }
    }else{
      this.actionDefService.submitAction(action, this.selects, this.i18nCurrentCrudComponent, undefined).subscribe(r => {
        this.findAll();
        this.notificationService.notifySuccess(this.translate('success_message'));
      });
    }
  }

  private callCrudDialog(action: ActionDef, entity, funcName: string) {
    const ref = this;
    const dialogRef = this.dialog.open(CrudModalComponent, {
      width: this.crudDef.dialogConfig &&
        this.crudDef.dialogConfig.width ?
        this.crudDef.dialogConfig.width :
        '320px',
      panelClass: 'control-mat-dialog',
      data: {
        entity : entity,
        translate: (key) => {
          return this.translate(key);
        },
        submitActions: (actionDef) => {
          ref.actionDefService.submitAction(actionDef, this.selects, this.i18nCurrentCrudComponent, this.crudDef.dialogConfig).subscribe(r => { }, e => { }, () => {
            this.findAll();
            this.notificationService.notifySuccess(this.translate('success_message'));
            dialogRef.close();
          });
        },
        formDef: this.localStorageService.clone(action.formDef),
        funcName: funcName
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getCrudActions(){
    return this.actionDefService.filterActionsByCondition(this.crudDef.crudActions, this.crudDef.displayGlobalActions, this.selects);
  }
  getFormCreate(crudDef: CrudDef): Observable<FormDef> {
    return new Observable( obs => {
      let form: FormDef;
      if (crudDef.formsDef && crudDef.formsDef.create){
        form = crudDef.formsDef.create;
      } else if (crudDef.forms && crudDef.forms.create){
        form = new FormDef();
        form.fields = crudDef.forms.create;
        form.fieldsBehavior = crudDef.forms.createBehavior;
      }

      if (form.initWs && form.initWs.url){
        this.genericHttpService.basicGet(form.initWs.url, undefined, undefined, undefined).subscribe(r => {
          r = r[0];
          Object.getOwnPropertyNames(r).forEach(attribute => {
            const attributeFields: DynamicField<any>[] = form.fields.filter(f => f.key === attribute);
            if (attributeFields.length > 0) {
              const attributeField: DynamicField<any> = attributeFields[0];
              attributeField.value = r[attribute];
            }
          });
          obs.next(form);
        });
      } else {
        obs.next(form);
      }
    });
    
  }

  clone(obj) {
    return this.localStorageService.clone(obj);
  }

  delete(selects){
    this.deleteAll(selects).subscribe(
      r => {},
      e => {},
      () => {
        this.findAll();
        this.notificationService.notifySuccess(this.translate('success_message'));
      }
    );
  }

  openDeleteDialog(): void {
    const title = this.translate('modal_delete_title');
    const message = `Estas seguro que deseas eliminar ${this.selects.length} registro/s?`;
    const acceptButtonLabel = this.translate('modal_delete_button_accept');
    const onSubmit = () => {
      this.delete(this.selects);
    };
    this.dialogService.showQuestionModal(title, message, acceptButtonLabel, onSubmit, undefined);
  }

  ngOnDestroy() {
      this.onConfigChanged.unsubscribe();
  }

  getI18nName(): string {
    return 'crud';
  }

  getCRUDName(): string {
    return this.crudName;
  }
  newObjectEntity() {
    return {};
  }
  @Input('service')
  set injectService(service) {
    this.service = service;
  }

  showDeleteButton() {
    return this.display.deleteButton;
  }

  showAddButton() {
    return this.addForm !== undefined;
  }

  setUpCRUDDef(def){
    super.setUpCRUDDef(def);
  }

  exportCsv(){
    if (this.crudDef.exportCsv && this.crudDef.exportCsv.csvExportFileName) {
      const data = this.entities.map(e => {
        const reg = {}; 
        Object.getOwnPropertyNames(e).forEach( prop => {
          const column = this.crudDef.grid.columnsDef.find( c => c.columnDef === prop);
          if (column) {
            const colname = column.columnName;
            reg[colname] = e[prop];
          }
        });
        return reg;
      });
      this.fileService.downloadCsv(data, this.crudDef.exportCsv.csvExportFileName);
    }
  }

  translate(key: string){
    let word = super.translate(key);
    // Hago esto para guardar compatibilidad sobre el titulo a mostrar
    if (word === key && 'page_title' === key){
      word = this.title;
    }
    return word;
  }
}
