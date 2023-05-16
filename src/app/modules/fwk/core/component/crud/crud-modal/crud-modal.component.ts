import {Component, Inject} from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Injector } from '@angular/core';

import { startWith ,  map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AbstractComponent } from '../../abstract-component.component';
import { DynamicField } from '../../../model/dynamic-form/dynamic-field';
import { FormService } from '../../../service/dynamic-form/form.service';
import { DynamicFieldBehavior } from '../../../model/dynamic-form/dynamic-field-behavior';
import { SpinnerService } from '../../../module/spinner/service/spinner.service';
import { FormDef } from '../../../model/form-def';
import { ActionDef } from '../../../model/component-def/action-def';
import { ActionDefService } from '../../../service/action-def-service/action-def.service';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from '../../../service/dialog-service/dialog.service';

export const VALIDATIONS_ERRORS = 'VALIDATIONS_ERRORS';
/**
 * @title Dialog Overview
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-crud-modal-component',
  templateUrl: './crud-modal.component.html',
  styleUrls: ['./crud-modal.component.css'],
})

export class CrudModalComponent extends AbstractComponent implements OnInit {

  _fields: DynamicField<any>[];
  fieldsBehavior: DynamicFieldBehavior[];
  form: FormGroup;
  formError: any;
  entity: {};
  isAdd: boolean;
  _isEdit: boolean;
  isRead: boolean;
  handlerFieldSourceData: any;
  filteredData: Observable<any>;
  submitting: boolean;
  isObjectModified: boolean;
  globalSpinnerControl: any;
  formDef: FormDef;
  customSubmitActions: any;
  constructor(public injector: Injector,
    private formService: FormService,
    private spinnerService: SpinnerService,
    public dialogRef: MatDialogRef<CrudModalComponent>,
    private activatedRoute: ActivatedRoute,
    private actionDefService: ActionDefService,
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      super(injector);
      this.dialogRef.disableClose = true;
      this.entity = this.data.entity;
      this.formDef = this.data.formDef;
      this.isAdd = this.data.isAdd;
      this.isRead = this.data.isRead;
      this.isEdit = this.data.isEdit;
      this.formDef = this.data.formDef;
      this.customSubmitActions = this.data.submitActions;
      if (this.formDef){
        this.fields = this.data.formDef.fields;
        this.fieldsBehavior = this.data.formDef.fieldsBehavior;
      } else{
        this.fields = this.data.fields;
        this.fieldsBehavior = this.data.fieldsBehavior;
      }
      this.handlerFieldSourceData = this.data.handlerFieldSourceData;
      this.form = new FormGroup({});
      this.formError = this.formService.toFormError(this.fields);
      this.isObjectModified = false;
  }

  onNoClick(): void {

    const onSubmit = () => {
      this.dialogRef.close();
    }

    if (this.isObjectModified) {
      this.dialogService.showQuestionModal('Confirmación', '¿Está seguro que desea cerrar? Si lo hace perderá los cambios.', undefined, onSubmit, undefined);
    } else {
      onSubmit();
    }

  }

  onInit() {
    this.submitting = false;
    this.globalSpinnerControl = this.spinnerService.getControlGlobalSpinner();
  }

  onChangeEntity(entity) {
    if (this._isEdit) {
      entity.id = this.entity['id'];
      this.entity = entity;
    } else {
      this.entity = entity;
    }
  }

  getFormName(){
    return this.data.formName;
  }

  getFuncName(){
    return this.data.funcName;
  }

  fieldsChanges(fields, data){
    const form: any = this.form.controls.subForm;
    this.formService.fieldsChangesBehavior(fields, this.fieldsBehavior, data, form);
  }

  submitAction(action: ActionDef){
    if (this.customSubmitActions){
      this.customSubmitActions(action, this.entity);
    }else{
      this.actionDefService.submitAction(action, this.entity, this.data.i18n, undefined).subscribe(r => {}, e => {}, () => {
        // Chequear accion posterior a esta      
      });
    }
  }

  onSubmit(): void {
    this.globalSpinnerControl.show();
    this.submitting = true;
    if (this.isAdd) {
      this.data.crud.validationAdd(this.entity).subscribe(r => {
        this.data.crud.add(this.entity).subscribe(ok => {
          const hasProperty = ok.hasOwnProperty('success');
          if ((ok && !hasProperty) || (hasProperty && ok.success)) {
            this.dialogRef.close();
            this.globalSpinnerControl.hide();
            this.notificationService.notifySuccess(this.translate('success_message'));
          } else {
            this.submitting = false;
            this.globalSpinnerControl.hide();
            this.notificationService.notifyError(ok.message);
          }
        }, error => {
          this.handlerError(error); 
          this.globalSpinnerControl.hide();
        }) ;
      }, error => {
        if (VALIDATIONS_ERRORS === error.error.status) {
          this.formService.addErrorToFields(this.form.controls.subForm, error.error.errors);
        }
        this.submitting = false;
        this.globalSpinnerControl.hide();
      });
    } else if (this.isEdit) {
      this.data.crud.validationEdit(this.entity).subscribe(r => {
        this.data.crud.edit(this.entity).subscribe(ok => {
          const hasProperty = ok.hasOwnProperty('success');
          if ((ok && !hasProperty) || (hasProperty && ok.success)) {
            this.dialogRef.close();
            this.globalSpinnerControl.hide();
            this.notificationService.notifySuccess(this.translate('success_message'));
          } else {
            this.submitting = false;
            this.globalSpinnerControl.hide();
            this.notificationService.notifyError(ok.message);
          }
        }, error => {
          this.handlerError(error); 
          this.globalSpinnerControl.hide();
        });
      }, error => {
        this.handlerError(error);
        this.globalSpinnerControl.hide();
      }, () => {
        this.globalSpinnerControl.hide();
      });
    }
  }
  onSubmitNoClose(): void {
    this.globalSpinnerControl.show();
    if (this.isAdd) {
      this.data.crud.validationAdd(this.entity).subscribe(r => {
        this.data.crud.add(this.entity).subscribe(ok => {
            this.dialogRef.close(true);
            this.notificationService.notifySuccess(this.translate('success_message'));
            this.globalSpinnerControl.hide();
            this.isObjectModified = false;
        }, error => {
          this.handlerError(error); 
          this.globalSpinnerControl.hide();
        }) ;
      }, error => {
        if (VALIDATIONS_ERRORS === error.error.status) {
          this.formService.addErrorToFields(this.form.controls.subForm, error.error.errors);
        }
        this.submitting = false;
        this.globalSpinnerControl.hide();
      });
    } else if (this.isEdit) {
      this.data.crud.validationEdit(this.entity).subscribe(r => {
        this.data.crud.edit(this.entity).subscribe(ok => {
          //this.dialogRef.close();
          this.isObjectModified = false;
          this.globalSpinnerControl.hide();
          this.notificationService.notifySuccess(this.translate('success_message'));
        }, error => {
          this.handlerError(error); 
          this.globalSpinnerControl.hide();
        });
      }, error => {
        this.handlerError(error);
        this.globalSpinnerControl.hide();
      }, () => {
        this.globalSpinnerControl.hide();
      });
    }
  }
  getActions(form){
    let actions;
    if (form){
      if (form.displayActionsCondition){
        return this.actionDefService.getActions(form.displayActionsCondition, form.actions, this.entity);
      }
      actions = form.actions;
    }
    return actions;
  }
  objectModified(isObjectModified){
    this.isObjectModified = isObjectModified;
  }
  handlerError(error){
    if (error.error){
     if (VALIDATIONS_ERRORS === error.error.status) {
      this.formService.addErrorToFields(this.form.controls.subForm, error.error.errors);
      if (error.error.message) {
        this.notificationService.notifyError(error.error.message);  
      }
     }
    }
    this.submitting = false;
  }
  getI18nName(): string {
    return 'crud';
  }

  translate(key){
    let value = key;
    if (this.data.translate){
      value = this.data.translate(key);
    }
    if (value === key){
      value = super.translate(key);
    }
    return value;
  }

  getUrl(){
    return this.activatedRoute.snapshot.children[0].routeConfig.path;
  }

  get titleLabel() {
    if (this.formDef){
      if (this.formDef.title){
        return this.formDef.title;
      }
    }
    if (this.isAdd) {
      return this.translate('add_modal_title');
    } else if (this.isEdit) {
      return this.translate('edit_modal_title');
    }
    return this.translate('view_modal_title');
  }

  get closeLabel() {
    if (this.isAdd) {
      return this.translate('add_modal_button_cancel');
    } else if (this.isEdit) {
      return this.translate('edit_modal_button_cancel');
    }
    return this.translate('view_modal_button_close');
  }

  get saveLabel() {
    if (this.isAdd) {
      return this.translate('add_modal_button_save');
    } else if (this.isEdit) {
      return this.translate('edit_modal_button_save');
    }
    return '';
  }

  get fields() {
    return this._fields;
  }

  set fields(data) {
    this._fields = [];
    if (data) {
      data.forEach(element => {
        this._fields.push(element);
      });
    }
  }

  set isEdit(value) {
    this._isEdit = value;
  }

  get isEdit() {
    return this.isAdd || this._isEdit;
  }
}
