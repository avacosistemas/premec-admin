import {Component, Inject, Output, EventEmitter} from '@angular/core';
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
import { Entity } from '../../../model/entity';
import { AbstractFormComponent } from '../../abstract-form.component';
import { WsDef, HTTP_METHODS } from '../../../model/ws-def';
import { I18n } from '../../../model/i18n';
import { ActivatedRoute } from '@angular/router';
import { FormDef } from '../../../model/form-def';

export const VALIDATIONS_ERRORS = 'VALIDATIONS_ERRORS';
/**
 * @title Dialog Overview
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-basic-modal-component',
  templateUrl: './basic-modal.component.html',
  styleUrls: ['./basic-modal.component.css'],
})

export class BasicModalComponent extends AbstractFormComponent implements OnInit {

  entity: Entity;
  config: any;
  fields: DynamicField<any>[];
  form: FormGroup;
  isObjectModified: boolean;
  i18nComponent: I18n;
  submit: any;
  modalName: string;
  formKey: string;
  activatedRoute: ActivatedRoute;
  notShowButton: boolean;
  labelTitle: string;
  formDef: FormDef;
  constructor(public injector: Injector,
    public dialogRef: MatDialogRef<BasicModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      super(injector);
      this.notShowButton = this.data.config.notShowButton === undefined ? false : this.data.config.notShowButton;
      this.activatedRoute = injector.get(ActivatedRoute);
      this.dialogRef.disableClose = true;
      this.entity = this.data.entity;
      this.config = this.data.config;
      this.fields = this.data.config.form;
      this.submit = this.data.submit;
      this.modalName = this.data.modalName;
      this.i18nComponent = this.data.i18n;
      this.formKey = this.data.config.formKey;
      this.form = new FormGroup({});
      this.isObjectModified = false;
      this.labelTitle = this.data.config.labelTitle;
      this.formDef = this.data.config.formDef;
      if (this.formDef){
        this.fields = this.formDef.fields;
      }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getUrl(){
    const url: string = this.activatedRoute['_routerState']['snapshot']['url'].slice(1);
    if (url.includes('?')) {
      return url.split('?')[0];
    }
    return this.activatedRoute['_routerState']['snapshot']['url'];
  }

  onInit() {}

  isNotShowButton() {
    return this.notShowButton;
  }

  onChangeEntity(entity) {
    if (this.config.ws && (this.config.ws.method === HTTP_METHODS.put || 
          this.config.ws.method === HTTP_METHODS.delete)) {
      entity.id = this.entity.id;
      this.entity = entity;
    } else if (this.config.ws && this.config.ws.method === HTTP_METHODS.post) {
      this.entity = entity;
    } else {
      this.entity = entity;
    }
  }
  
  isEdit(){
    return true;
  }

  onSubmitNoClose(){
    this.callSubmit(() => {});
  }

  onSubmit(){
    this.callSubmit(() => {
        this.dialogRef.close();
    });
  }

  callSubmit(callback): void {
    if (this.submit && this.submit.onSubmitModal){
      this.submit.onSubmitModal(this.entity, this.dialogRef);
    }else{
      if (this.config && this.config.ws){
          this.genericSubmitWithWsDef(this.config.ws, this.entity, this.form.controls.subForm).subscribe(r => {
            this.notificationService.notifySuccess(this.translate('success_message'));
            callback();
        });
      }
    }
  }

  objectModified(isObjectModified){
    this.isObjectModified = isObjectModified;
  }

  getI18nName(): string {
    return 'crud';
  }

  translate(key: string) {
    let word = key;
    if (this.i18nComponent){
      word = this.i18nComponent.translate(key);
    }
    if (word === key && this.i18n){
      word = this.i18n.translate(key);
    }
    if (word === key){
      word = super.translate(key);
    }
    return word;
  }

  get titleLabel() {
    if (this.labelTitle) {
      return this.labelTitle;
    }
    if (this.modalName){
      return this.modalName;
    }else if (this.config.titleKey){
      return this.translate(this.config.titleKey);
    }
    return this.translate('modal_title_confirm_operation');
  }

  get closeLabel() {
    if (this.config.closeButtonKey){
      return this.translate(this.config.closeButtonKey);
    }
    return this.translate('edit_modal_button_cancel');
  }

  get submitLabel() {
    if (this.config.submitButtonKey){
      return this.translate(this.config.submitButtonKey);
    }
    return this.translate('custom_modal_button_confirm');
  }

}
