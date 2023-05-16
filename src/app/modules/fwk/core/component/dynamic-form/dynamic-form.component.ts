import {Component, ViewChild} from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import {defaultFormat as _rollupMoment} from 'moment';
import { ViewChildren } from '@angular/core';
import { QueryList } from '@angular/core';
import { FormService } from '../../service/dynamic-form/form.service';
import { AbstractComponent } from '../abstract-component.component';
import { DynamicField, CONTROL_TYPE } from '../../model/dynamic-form/dynamic-field';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatError } from '@angular/material/form-field';
import { MY_FORMATS } from '../../service/dynamic-form/form.validator.service';
import { GenericHttpService } from '../../service/generic-http-service/generic-http.service';
import { ApiAutocompleteConfiguration } from '../autocomplete/autocomplete.interface';
import { AutocompleteService } from '../autocomplete/autocomplete.service';
/**
 * @title Dialog Overview
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-dynamic-form-component',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class DynamicFormComponent extends AbstractComponent implements OnInit {
  public searchTermInterface(field: ApiAutocompleteConfiguration) {
    return {
      search: (term) => this.autocompleteService.autocompleteSearch(this.form, field)
    };
  }

  form: FormGroup;
  formError: any;
  filteredData: Observable<any>;

  _fields: DynamicField<any>[];
  formValidated: boolean;
  initStateObject: any;
  @Input()
  subFormName: string;
  @Input()
  parentForm: FormGroup;
  @Input()
  entity: any;
  entityInit: any;
  @Input()
  isEdit: boolean;
  @Input()
  handlerFieldSourceData: any;
  @Input()
  validate: any;
  @Output()
  onChangeEntity = new EventEmitter(true);
  @Output()
  objectModified = new EventEmitter(true);
  @Output()
  onFieldsChanges = new EventEmitter(true);
  initialized: boolean;
  @ViewChildren(MatError) matErrors: QueryList<MatError>;
  @ViewChild('formDirective',{static: false}) private formDirective: NgForm;
  constructor(public injector: Injector,
    private formService: FormService,
    private genericHttpService: GenericHttpService,
    private autocompleteService: AutocompleteService) {
    super(injector);
  }

  onInit(): void {
    this.onInitWithFields(this.fields, this.entity);
  }

  onInitWithFields(fields, entity): void {
    this.form = this.formService.toFormGroupEntity(entity, fields, { disabled: !this.isEdit }, this.onFieldsChanges);
    if (this.subFormName === undefined) {
      this.subFormName = 'subForm';
    }
    this.parentForm.addControl(this.subFormName, this.form);
    this.formError = this.formService.toFormError(this.fields);
    this.fields = fields;
    this.entityInit = entity;
    this.entity = entity;
    // this.resetValues();
    this.setUpFields();
    // this.injectValuesStart();
    this.setValueChagesListeners();
    this.saveInitialStateObject();
  }

  saveInitialStateObject() {
    this.initStateObject = this.formService.injectToEntity({}, this.form, this.fields);
  }

  setValueChagesListeners() {
    this.form.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
    });
  }

  // getEditor() {
  //   return ClassicEditor;
  // }

  setUpFields() {
    this.entity = this.formService.injectToEntity({}, this.form, this.fields);
    this.fields.forEach((element, idx) => {
      if (element.options) {
        if (element.options.handlerSourceData) {
          if (this.entity[element.key] && this.entity[element.key] !== '') {
            this.fields[idx].options.toData = this.entity[element.key];
          }
          this.handlerFieldSourceData(element.key, this.entity, this.injector).subscribe(r => {
            if (this.fields[idx].controlType === 'hidden') {
              this.fields[idx].value = r;
              this.entity[this.fields[idx].key] = r;
            } else {
              this.fields[idx].options.fromData = r;
            }
            this.form.patchValue(this.entity);
          });
        }
      }
      if (element.controlType === 'color_picker' || element.controlType === 'tags') {
        element.options.requiredMessage = 'El campo ' + element.label.toLowerCase() + ' es requerido';
        element.options.invalidValueMessage = 'El campo ' + element.label.toLowerCase() + ' es invalido';
      }
      if (element.controlType === 'pick-list' && this.entity[element.key] !== '') {
        element.options.toData = this.entity[element.key];
      }
    });
  }

  getMessageErrorValidation(field) {
    return this.formService.getMessageErrorValidation(this.form, field);
  }

  onFormValuesChanged() {

    for (const field in this.formError) {
      if (!this.formError.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.formError[field] = {};

      // Get the control
      const control = this.form.get(field);

      if (control && control.dirty && !control.valid) {
        this.formError[field] = control.errors;
      }

    }

    if (this.form.valid) {
      this.forceEmitChangeEntity();
    }

  }

  forceEmitChangeEntity() {
    const obj = this.formService.injectToEntity({}, this.form, this.fields);
    this.onChangeEntity.emit(obj);
    this.checkObjectModified(obj);
  }

  checkObjectModified(obj) {
    if (this.initStateObject) {
      let isObjectModified = false;
      this.fields.forEach(field => {
        if (isObjectModified === false) {
          if (field.controlType === 'pick-list') {
            if ((this.initStateObject[field.key] === undefined && obj[field.key] !== undefined) ||
              (this.initStateObject[field.key] !== undefined && obj[field.key] === undefined) ||
              (this.initStateObject[field.key].length !== obj[field.key].length)) {
              isObjectModified = true;
            } else if (field.options.compositeKey && field.options.compositeKey.length > 0) {
            }
          } else if (this.initStateObject[field.key] !== obj[field.key]) {
            isObjectModified = true;
          }
        }
      });
      this.objectModified.emit(isObjectModified);
    }
  }
  existControlTypeField(field: DynamicField<any>) {
    return this.formService.implementedField(field);
  }
  isSubmited() {
    return this.form.updateOn === 'submit';
  }

  onCustomControlChange(key, value) {
    this.entity = this.formService.injectToEntity({}, this.form, this.fields);
    this.entity[key] = value;
    this.form.reset(this.entity);
  }

  hasErrorRequired(key) {
    return this.form.controls[key].hasError('required');
  }

  isValid(key) { return this.form.controls[key].valid; }

  getI18nName(): string {
    return 'dynamic-form';
  }

  checkValueAutocomple(field) {
    setTimeout(() => {
      const value = this.form.controls[field.key].value;
      if (value) {
        let match = false;
        field.options.fromData.forEach(element => {
          if (element === value) {
            match = true;
          }
        });
        if (!match) {
          this.form.controls[field.key].setValue('');
        }
      }
    }, 300);
  }
  // Date Picker
  getIdDatePicker(fieldKey) {
    return 'dp' + fieldKey;
  }
  get fields() {
    return this._fields;
  }

  @Input()
  set fields(data) {
    // this._fields = this.getOnlyFields(data);
    this._fields = data;
  }

  hideField(field) {
    const exist = this.existControlTypeField(field);
    const hide = {
      hide: field.controlType === 'hidden' || (exist === undefined || !exist),
    };
    return hide;
  }

  getRestrictionKeys(field: DynamicField<any>) {
    if (field.options.restrictionKeys) {
      return field.options.restrictionKeys;
    } else {

      if (field.controlType === CONTROL_TYPE.number) {
        return '[0-9]';
      }
      return '';
    }
  }

  getFloatLabel(field: DynamicField<any>) {
    return field.options['floatLabel'] ? field.options['floatLabel'] : 'auto';
  }

  onChangeSelect(obj, event) {
    console.log(event, obj);
    this.forceEmitChangeEntity();
  }

  getOptionsWidth(options: any[]) {
    return (Math.floor(100 / options.length) - 3) + '%';
  }
}
