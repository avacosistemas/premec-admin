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

export const VALIDATIONS_ERRORS = 'VALIDATIONS_ERRORS';
/**
 * @title Dialog Overview
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-html-modal-component',
  templateUrl: './html-modal.component.html',
  styleUrls: ['./html-modal.component.css'],
})

export class HtmlModalComponent extends AbstractFormComponent implements OnInit {

  html: string;
  i18nComponent: I18n;
  modalName: string;
  titleKey: string;
  activatedRoute: ActivatedRoute;

  constructor(public injector: Injector,
    public dialogRef: MatDialogRef<HtmlModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      super(injector);
      this.activatedRoute = injector.get(ActivatedRoute);
      this.dialogRef.disableClose = true;
      this.html = this.data.html;
      this.modalName = this.data.modalName;
      this.i18nComponent = this.data.i18n;
  }
  
  getUrl(){
    return this.activatedRoute.snapshot.children[0].routeConfig.path;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onInit() {}

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

    if (this.titleKey){
      return this.translate(this.titleKey);
    }
    return '';
  }
}
