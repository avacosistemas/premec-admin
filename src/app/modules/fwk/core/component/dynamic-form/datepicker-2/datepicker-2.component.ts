import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';

import { Injector } from '@angular/core';
import { DynamicFieldFormComponent } from '../dynamic-field-form/dynamic-field-form.component';
import { DynamicField } from '../../../model/dynamic-form/dynamic-field';
import { LocalStorageService } from '../../../service/local-storage/local-storage.service';
import { FormService } from '../../../service/dynamic-form/form.service';
import * as _moment from 'moment';
import { String } from 'typescript-string-operations';
import { I18n } from '../../../model/i18n';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BasicModalComponent } from '../../crud/basic-modal/basic-modal.component';
import { EventEmitter } from 'protractor';
import { MY_FORMATS } from '../../../service/dynamic-form/form.validator.service';
_moment.locale('es-es');
const I18N: I18n = {
  name: 'datepicker-2',
  lang: 'es',
  words: {
    input_button: 'cargar',
    change_input: 'Cambiar fecha'
  }
};
function getMonth(){
  const objMap = Array.apply(0, Array(12)).map((_, i) => {
    return {
             label: _moment().month(i).format('MMMM'),
             value: i + 1
            };
          });
    console.log(objMap);
  return objMap;
}
const FORM_VISUAL_INPUT: DynamicField<any> [] = [
  {
    key: 'visual_field',
    labelKey: 'date_picker_visual_field',
    label: 'Ingresar Fecha',
    controlType: 'textbox',
    disabled: true,
    requiredMessage: ''
  }
];
const DATEPICKER_ERROR_MESSAGE = 'El campo {0} es invalido';
const FORM_DATE_PICKER_2_YYYY_MM_DD: DynamicField<any> [] = [
  {
    key: 'day',
    labelKey: 'date_picker_field_day',
    label: 'Dia',
    controlType: 'number',
    required: true,
    minValue: 1,
    maxValue: 31,
    maxLength: 2,
    maxLengthMessage: '',
    minValueMessage: '',
    maxValueMessage: '',
    requiredMessage: ''
  },
  {
    key: 'month',
    labelKey: 'date_picker_field_month',
    label: 'Mes',
    controlType: 'select',
    required: true,
    requiredMessage: '',
    options: {
      elementLabel: 'label',
      elementValue: 'value',
      fromData: getMonth(),
    }

  },
  { 
    key: 'year',
    labelKey: 'date_picker_field_day',
    label: 'Año',
    controlType: 'number',
    length: 4,
    required: true,
    lengthMessage: '',
    minValueMessage: '',
    maxValueMessage: '',
    requiredMessage: ''
  }];
const FORM_DATE_PICKER_2_HH_MM  = [
    { 
      key: 'hour',
      labelKey: 'date_picker_field_hour',
      label: 'Hora (24hs)',
      controlType: 'number',
      required: true,
      minValue: 0,
      maxValue: 23,
      maxLength: 2,
      maxLengthMessage: '',
      minValueMessage: '',
      maxValueMessage: '',
      requiredMessage: '',
    },
    { 
      key: 'minute',
      labelKey: 'date_picker_field_min',
      label: 'Min',
      controlType: 'number',
      required: true,
      minValue: 0,
      maxValue: 59,
      maxLength: 2,
      maxLengthMessage: '',
      minValueMessage: '',
      maxValueMessage: '',
      requiredMessage: '',
    }
  ];

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-datepicker-2',
  templateUrl: './datepicker-2.component.html',
  styleUrls: ['./datepicker-2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Datepicker2Component extends DynamicFieldFormComponent implements OnInit{
  fieldsDatepickerModal: DynamicField<any> [] = [];
  fieldsVisualDatepicker: DynamicField<any> [] = [];
  localStorageService: LocalStorageService;
  formService: FormService;
  form: FormGroup;
  errorMessage: string;
  i18n: I18n;
  fieldLabel: DynamicField<any>;
  constructor(private  dialog: MatDialog, public injector: Injector) { 
    super(injector); 
    this.localStorageService = injector.get(LocalStorageService);
    this.formService = injector.get(FormService);
    this.i18n = new I18n(); 
    this.i18n.clone(I18N);
  }

  ngOnInit() {
    this.form = new FormGroup({});
    this.fieldsDatepickerModal = this.localStorageService.clone(FORM_DATE_PICKER_2_YYYY_MM_DD);
    this.fieldsVisualDatepicker = this.localStorageService.clone(FORM_VISUAL_INPUT);
    if (this.field && this.field.options){
      if (this.field.options.withHourAndMin){
        FORM_DATE_PICKER_2_HH_MM.forEach(f => this.fieldsDatepickerModal.push(this.localStorageService.clone(f)));
      }
    }
    if (this.field){
      const fVF = this.formService.getField('visual_field', this.fieldsVisualDatepicker);         
      this.fieldsVisualDatepicker.forEach(f => {
        f.required = this.field.required;
        f.label = this.field.label;

        if (f.required != undefined && f.required == true) {
          f.label = f.label + ' (*)';
        }

      });
      this.fieldLabel = fVF;
      this.fieldLabel.value = this.field.value;
    }
    
    this.localStorageService.clone(this.fieldsDatepickerModal).forEach(f => {
      f.controlType = 'hidden';
      f.required = false;
      this.fieldsVisualDatepicker.push(f);
    });
    
    this.form = this.formService.getGroupControls(this.fieldsVisualDatepicker, undefined, undefined);
    if (this.field){
      if (this.field.value){
        const entity = this.getFormModalEntityByValue(this.field);
        if (entity){
          this.fieldsDatepickerModal.forEach(f => {
            this.formService.patchField(f.key, entity[f.key], this.form);
          });
        }
      }
    }
  }

  getFormModalEntityByValue(field: DynamicField<any>) {
    let format;
    if (field.options && field.options.format){
      format = field.options.format;
    }else{
      if (field.options && field.options.withHourAndMin){
        format = MY_FORMATS.parse.dateInputHours;
      }else {
        format = MY_FORMATS.parse.dateInput;
      }
    }

    const momentObj = _moment(field.value, format);

    return {
      day: Number.parseInt(momentObj.format('DD')),
      month: Number.parseInt(momentObj.format('MM')),
      year: Number.parseInt(momentObj.format('YYYY')),
      minute: Number.parseInt(momentObj.format('mm')),
      hour: Number.parseInt(momentObj.format('HH')),
    };
  }

  isValid(value){
    return value !== null && value !== undefined && value !== '';
  }

  translate(key: string){
    return this.i18n.translate(key);
  }
  
  onSubmitModal(entity, modal: MatDialogRef<any, any>){
    this.fieldsDatepickerModal.forEach(f => {
      this.formService.patchField(f.key, entity[f.key], this.form);
    });
    modal.close();
    const momentObj = {
      day: entity.day,
      month: entity.month - 1,
      year: entity.year,
      minute: entity.minute,
      hour: entity.hour,
    };
    const value = _moment(momentObj);
    let valueString;
    if (this.field.options.format){
      valueString = value.format(this.field.options.format);
    }else if (this.field.options.withHourAndMin){
      valueString = value.format(MY_FORMATS.parse.dateInputHours);
    }else{
      valueString = value.format(MY_FORMATS.parse.dateInput);
    }
    this.formService.patchField(this.field.key,  valueString, this.parentForm);
    this.formService.patchField('visual_field',  valueString, this.form);
  }

  onChangeDate(){
    const form: FormGroup = this.form;
    const modalKey = this.field.options &&
                        this.field.options.withHourAndMin ? 'datepicker-2-hh-mm' : 'datepicker-2';
    if (form.controls.year.value == undefined || form.controls.year.value == null || form.controls.year.value == "") {
      form.controls.year.setValue(new Date().getFullYear());
    }
    const data = { 
      modalKey: modalKey,
      entity: this.formService.injectToEntity({}, form, this.fieldsDatepickerModal),
      config: {
                titleKey: this.field.label,
                form: this.fieldsDatepickerModal
              },
      i18n: this.i18n,
      submit: this 
   };
   const widthModal = this.field.options &&
                        this.field.options.withHourAndMin ? '380px' : '320px';
    const dialogRef = this.dialog.open(BasicModalComponent, {
      width:  widthModal,
      panelClass: 'control-mat-dialog',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  remove(){
    if (isNaN(this.form.value.year)) {
      this.form.reset();
      this.formService.patchField(this.field.key,  undefined, this.parentForm);
    }
  }
}
