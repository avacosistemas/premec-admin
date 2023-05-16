
import {distinctUntilChanged, debounceTime} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicField, HIDDEN, AUTOCOMPLETE, NUMBER, TEXTBOX, DATEPICKER, SELECT, EMAIL, CONTROL_TYPE, AUTOCOMPLETE_DESPLEGABLE } from '../../model/dynamic-form/dynamic-field';




// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {defaultFormat as _rollupMoment} from 'moment';
import { Observable } from 'rxjs';
import { I18nService } from '../i18n-service/i18n.service';
import { I18n } from '../../model/i18n';
import { FormValidatorService } from './form.validator.service';
import { DynamicFieldBehavior } from '../../model/dynamic-form/dynamic-field-behavior';
import { WsDef, HTTP_METHODS } from '../../model/ws-def';
import { GenericHttpService } from '../generic-http-service/generic-http.service';
import { GridDef } from '../../model/component-def/grid-def';
import { ActionDef } from '../../model/component-def/action-def';
import { ActivatedRoute } from '@angular/router';
import { DynamicFieldConditionIf } from '../../model/dynamic-form/dynamic-field-condition-if';
import { FilterService, FILTER_TYPE } from '../filter-service/filter.service';
import { FormDef } from '../../model/form-def';


const moment: any = _rollupMoment || _moment;

@Injectable()
export class FormService {

  i18n: I18n;
  constructor(i18nService: I18nService,
              private filterService: FilterService,
              public formValidatorService: FormValidatorService,
              private genericHttpService: GenericHttpService,
              private activatedRoute: ActivatedRoute) {
    i18nService.addI18n({
      name: 'form',
      lang: 'es',
      dictionary: {
        required_error_message: 'El campo {0} es requerido',
        min_length_error_message: 'El campo {0} debe tener una longitud mínima de {1} caracter/es',
        max_length_error_message: 'El campo {0} debe tener una longitud máxima de {1} caracter/es',
        length_error_message: 'El campo {0} debe tener una longitud de {1} caracter/es',
        min_error_message: 'El campo {0} debe ser de un valor mínimo de {1} ',
        max_error_message: 'El campo {0} debe ser de un valor máximo de {1} ',
        email_format_error_message: 'El campo {0} no tiene un formato válido',
        user_error_message: 'El campo {0} solo permite letras, números, guion bajo y medio',
        spaces_and_especial_characters_error_message: 'El campo {0} solo permite letras y espacios',
        spaces_and_especial_letters_numbers_slash_dot_error_message: 'El campo {0} solo se permite letras, números, guion medio y punto',
        letter_numbers_dash_undercode_with_first_letter_message: 'El campo {0} debe comenzar con una letra y solo se permite letras, números, guion medio y bajo',
        letters_numbers_error_message: 'El campo {0} solo permite números y letras',
        datepattern_error_message: 'El campo {0} debe tener un formato: {1}',
        date_error_required_or_invalidmessage: 'El campo {0} es requerido y debe tener un formato: {1}',
        cuil_error_message: 'El campo {0} debe comenzar con 20, 23, 24 o 27.',
        cuit_error_message: 'El campo {0} debe comenzar con 20, 23, 24, 27, 30, 33 o 34',
        alias_cbu_error_message: 'El campo {0} debe ser alfanumerico incluyendo guión medio y punto. No incluye la letra Ñ',
        codigo_postal_error_message: 'El campo {0} debe ser de 4 dígitos (1234) o 1 letra, 4 dígitos y 3 letras al final (A1324CDE)',
        phone_error_message: 'El campo {0} debe contener exactamente {1} dígitos sin incluir el 0 de código de área. (Ej: 1148001234)',
        cellphone_error_message: 'El campo {0} debe contener exactamente {1} dígitos incluyendo el 15 después del código de área sin 0. (Ej: 111560001234)',
        error_message_not_set: 'Error desconocido',
        generic_error_message: 'El campo {0} es invalido'

      }
    });
    i18nService.getByName('form').subscribe(i18n => {
      this.i18n = i18n;
    });
  }

  setUpGridFromI18n(i18n: I18n, gridDef: GridDef){
    if (gridDef.columnsDef){
      gridDef.columnsDef.forEach(column => {
        column.columnName = i18n.translate(column.columnNameKey);
      });
    }
    if (gridDef.actions){
      gridDef.actions.forEach(action => {
        action.actionName = i18n.translate(action.actionNameKey);
        if (action.form){
          this.setUpFieldTextFromI18n(this.i18n, action.form);
        }
      });
    }
    if (gridDef.actions) {
      this.setUpActionsFromI18n(i18n, gridDef.actions);
    }
    if (gridDef.titleKey) {
      gridDef.title = i18n.translate(gridDef.titleKey);
    }
  }

  setUpActionsFromI18n(i18n: I18n, actions: ActionDef[]){
    if (actions) {
      actions.forEach(action => {
        if (action.actionNameKey){
          action.actionName = i18n.translate(action.actionNameKey);
        }
        if (action.actionType === 'notification'){
          if (action.input.messageKey){
            action.input.message = i18n.translate(action.input.messageKey);
          } 
          if (action.input.modalNameKey){
            action.input.modalName = i18n.translate(action.input.modalNameKey);
          }
        }
        if (action.form){
          this.setUpFieldTextFromI18n(i18n, action.form);
        }
        if (action.formDef){
          this.setUpFormDef(i18n, action.formDef);
        }
        if (action.gridModal){
          this.setUpGridFromI18n(i18n, action.gridModal.gridDef);
        }
        
        if (action.confirm && typeof action.confirm === 'object'){
          if (action.confirm.messageKey) {
            action.confirm.message = i18n.translate(action.confirm.messageKey);
          }
        }
      });
    }
  }
  setUpFormDef(i18n, formDef: FormDef) {
      if (formDef){
        if (formDef.titleKey){
          formDef.title = i18n.translate(formDef.titleKey);
        }
        this.setUpFieldTextFromI18n(i18n, formDef.fields);
        this.setUpActionsFromI18n(i18n, formDef.actions);
      }
  }
  setUpkeysi18nOfGrid(i18n, gridDef: GridDef){
    if (gridDef){
        this.setUpGridFromI18n(i18n, gridDef);
    }
  }
  setUpDialogsFromI18n(i18n: I18n, dialogs: any): any {
    if (dialogs.read){
      if (dialogs.read.modalNameKey){
        dialogs.read.modalName = i18n.translate(dialogs.read.modalNameKey);
      }
      dialogs.read.grids.forEach(grid => {
        this.setUpGridFromI18n(i18n, grid);
      });
      this.setUpFieldTextFromI18n(i18n, dialogs.read.form.fields);
      if (dialogs.read.actions){
          this.setUpActionsFromI18n(i18n, dialogs.read.actions);
      }
    }
  }

  setUpFieldTextFromI18n(i18n: I18n, fields) {
    if (fields){
      fields.forEach(element => {
        if (element.labelKey){
          const result = i18n.translate(element.labelKey);
          if (element.label === undefined || result !== element.labelKey){
            element.label = result;
          }
          if (element.required != undefined && (element.required == true || element.required == 'true')) {
            element.label = element.label + ' (*)';
          }
        }
        if (element.validation) {
          if (element.validation.errorMessageKey) {
            element.validation.errorMessage = i18n.translate(element.validation.errorMessageKey);
            if (element.validation.errorMessage === element.validation.errorMessageKey) {
              element.validation.errorMessage = this.i18n.translate(element.validation.errorMessageKey);
            }
          }
          if (element.validation.regexKey) {
            let regex = i18n.translate(element.validation.regexKey);
            if (regex === element.validation.regexKey) {
              regex = this.i18n.translate(element.validation.regexKey);
            }
            if (regex !== element.validation.regexKey){
              element.validation.regex = regex;
            }
          }
        }
        if (element.validations){
          element.validations.forEach(validation => {
              if (validation.messageKey){
                validation.message = i18n.translate(validation.messageKey);
              }
          });
        }
        this.setUpPickListTextFromI18n(i18n, element);
        this.setUpDisclaimerTextFromI18n(i18n, element);
      }); 
    }
  }
  setUpDisclaimerTextFromI18n(i18n: I18n, element: any): any {
    if (CONTROL_TYPE.disclaimer.toUpperCase() === element.controlType.toUpperCase()){
      if (element.options){
        if (element.options.disclaimer){
          const disclaimer = element.options.disclaimer;
          if (disclaimer.labelKey){
            disclaimer.label = i18n.translate(disclaimer.labelKey);
          }
        }
      }
    }
  }
  private setUpPickListTextFromI18n(i18n: I18n, element: DynamicField<any>){
    if (element.controlType === CONTROL_TYPE.picklist){
      if (element.options){
        if (element.options.titleFromKey){
          element.options.titleFrom = i18n.translate(element.options.titleFromKey);
        }
        if (element.options.titleToKey){
          element.options.titleTo = i18n.translate(element.options.titleToKey);
        }
      }
    }
  }
  // DEPRECATED USE form.validator.service.ts getMessageErrorValidation
  getMessageErrorValidation(form, field: DynamicField<any>) {
    return this.formValidatorService.getMessageErrorValidation(form, field);
  }

  toFormGroupEntity(entity, fields: DynamicField<any>[], options, onFieldsChanges) {
    fields.forEach(field => {
      if (entity !== undefined) {
        if (entity[field.key] !== undefined) {
          field.value = entity[field.key];
        } else if (field.value !== undefined) {
          entity[field.key] = field.value;
        }
      }
    });
    return this.toFormGroup(fields, options, onFieldsChanges);
  }

  toFormGroup(fields: DynamicField<any>[], options, onFieldsChanges) {
    return this.getGroupControls(fields, options, onFieldsChanges);
  }

  getGroupControls(fields: DynamicField<any>[], options, onFieldsChanges): FormGroup {
    const params = this.activatedRoute.queryParams['value'];
    const form = new FormGroup({});
    // const group: any = {};
    fields = fields.filter(field => {
      this.applyParamsToFilter(params, field);
      const existField = this.implementedField(field);
      if (existField === undefined || !existField){
        console.warn('el tipo de campo -> ' + field.controlType + ' no se encuentra implementado en el fwk');
        return false;
      }  
      return true;
    });
    fields.forEach(field => {
        
        if (field.options === undefined) {
          field.options = {};
        }
        if (field.controlType === 'datepicker') {
          // if (field.value) {
          //     field.value = _moment(field.value, MY_FORMATS.parse.dateInput, true);
          // }
          // this.disabledInputDatePicker(field);
        }

        if ((field.controlType === 'autocomplete' || field.controlType === 'autocomplete-desplegable') && field.options.fromData === undefined) {
          field.options.fromData  = [];
        }

        if (field.controlType === 'checkbox' && (field.value === undefined || field.value === null)) {
          field.value = false;
        }
      
        const value = {
          value: field.value !== undefined ? field.value : '',
          disabled: field.disabled
        };

        // if (field.options.floatLabel){
        //   value['floatLabel'] = field.options.floatLabel;
        // }
        if (options) {
          Object.getOwnPropertyNames(options).forEach((val, idx) => {
            if ('disabled' === val && field.disabled === undefined) {
              value[val] = options[val];
            } else if ('disabled' === val && options[val]) {
              value[val] = options[val];
            } else if ('disabled' !== val) {
              value[val] = options[val];
            }
          });
        }

       this.setUpWsDef(field, form);
       const validators = this.formValidatorService.getValidators(field);
        form.addControl(field.key, validators.length > 0 ? new FormControl(value, validators)
        : new FormControl(value));

        // onFieldsChanges
        if (onFieldsChanges) {
          if (field.controlType === EMAIL ||
            field.controlType === TEXTBOX ||
            field.controlType === NUMBER ||
            field.controlType === DATEPICKER) {
              form.controls[field.key].valueChanges.pipe(debounceTime(1000),distinctUntilChanged(),)
              .subscribe(newValue => {
                const data = {fieldKey: field.key, entity: this.injectToEntity({}, form, fields),
                fields: fields};
                onFieldsChanges.emit(data);
              });

            } else {
              form.controls[field.key].valueChanges.subscribe(newValue => {
                const data = {fieldKey: field.key, entity: this.injectToEntity({}, form, fields),
                fields: fields};
                onFieldsChanges.emit(data);
              });
            }
          }
        });
      if (onFieldsChanges) {
        const data = {entity: this.injectToEntity({}, form, fields),
                fields: fields};
        onFieldsChanges.emit(data);
      }
      return form;
  }
  applyParamsToFilter(params: any, field: any) {
    if (field.mappingQuerystring === true) {
      const value = params[field.key];
      if (value) {
        field.value = value;
      }
    }
  }

  private setUpWsDef(field, form: FormGroup){
    if ((field.controlType === CONTROL_TYPE.select || 
          field.controlType === CONTROL_TYPE.autocomplete || 
          field.controlType === CONTROL_TYPE.autocomplete_desplegable || 
          field.controlType === CONTROL_TYPE.picklist) &&
            field.options.fromWs) {
      const fromWs: WsDef = field.options.fromWs;
      fromWs.method = HTTP_METHODS.get;
      if (fromWs.querystring) {
        let querystring = '';
        let andString = '';
        Object.keys(fromWs.querystring).forEach(key => {
          if (form.controls[fromWs.querystring[key]]) {
            querystring += andString + key + '=' + form.controls[fromWs.querystring[key]].value;
            andString = '&';
          }
        });
        fromWs.url += querystring === '' ? '' : querystring;
      }
      this.genericHttpService.callWs(fromWs).subscribe(r => {
        field.options.fromData = r;
      });
    }
  }

  public implementedField(field: DynamicField<any>){
    return Object.getOwnPropertyNames(CONTROL_TYPE).find(name => {
      return CONTROL_TYPE[name].toLowerCase() === field.controlType.toLowerCase();
    });
  }

  private disabledInputDatePicker(field) {
    if (field.disabled) {
      field.options.disabledPicker = true;
    } else {
        field.disabled = true;
        field.options.disabledPicker = false;
    }
  }

  resetFormWithFields(form: FormGroup, fields: DynamicField<any>[], options, onFieldsChanges) {
    form.reset(this.getGroupControls(fields, options, onFieldsChanges));
  }

  toFormError(fields: DynamicField<any>[] ) {
    const group: any = {};

    fields.forEach(field => {
      group[field.key] = {};
    });
    return group;
  }

  patchField(fieldKey: string, value: any, form) {
    this.patchFields(form, {[fieldKey]: value});
}

  patchFields(form: FormGroup, fields: any) {
      Object.getOwnPropertyNames(fields).forEach((val, idx) => {
        const obj = {};
        obj[val] = fields[val];
        form.patchValue(obj);
      });
  }

  addErrorToFields(form: any, errorsFields: any) {
    Object.getOwnPropertyNames(errorsFields).forEach((val, idx) => {
        const error = {};
        error['customError'] = {errorMessage: errorsFields[val]};
        if (form.controls){
          form.controls[val].setErrors(error);
          form.controls[val].markAsTouched();
        }else{
          console.warn('no form was provided...');
        }
    });
  }

  getFieldControl(keyField, form: any, fields: any []) {
    const field = fields.find(f => f.key === keyField);
    const service = this;
    return {
      field: field,
      isHide: function() { return field.controlType === HIDDEN; },
      hide: function() { service.hideField(form, field); },
      setLabel: function (label: string) {field.label = label; },
      setValue: function(value: string) { service.setValueField(form, field, value); },
      setValues: function(observable: Observable<any>) { service.setValues(observable, field); },
      changeToRequired: function() { service.changeToRequired(form, field); },
      changeToAutoComplete : function () { service.changeFieldToAutocomplete(form, field); },
      changeToAutoCompleteDesplegable : function () { service.changeFieldToAutocompleteDesplegable(form, field); },
      changeFieldToSelect : function () {service.changeFieldToSelect(form, field); },
      changeFieldToNumber: function () {service.changeFieldToNumber(form, field); },
      changeFieldToTextbox: function () {service.changeFieldToTextbox (form, field); },
      changeFieldToDatepicker: function () {service.changeFieldToDatepicker(form, field); },
      changeRegexKey: function (regexKey) {service.changeRegexKey(form, field, regexKey); },
      changeRemoveRegex: function () {service.changeRemoveRegex(form, field); },
      changeMaxLength: function (length) {service.changeMaxLength(form, field, length); },
      changeMinLength: function (length) {service.changeMinLength(form, field, length); },
      changeLength: function (length) {service.changeLength(form, field, length); },
      updateByDef: function (def: any) {service.updateByDef(form, field, def); },
    };
  }

  getEntityFromFields(fields: DynamicField<any>[]){
    const entity: any = {};
    fields.forEach(element => {
      if (this.implementedField(element)){
        if (entity[element.key] === undefined || entity[element.key] === ''){
          entity[element.key] = element.value;
        }
        if (element.controlType === 'checkbox' && (entity[element.key] === undefined || entity[element.key] === '')) {
          entity[element.key] = false;
        }
        if (element.controlType === 'datepicker' && entity[element.key] && entity[element.key].format !== undefined) {
          
        }
        if (element.controlType === 'number' && 
            (entity[element.key] !== '' && entity[element.key] !== undefined && entity[element.key] !== null)){
          entity[element.key] = Number(entity[element.key]);
          element.value = Number(element.value);
        }
        if (element.id && entity.id === undefined){ // Si es el id, le creo un campo id la entidad, de esta forma el servicio sabe cual es el id del registro
          entity.id = element.value;
        }
     }
    });
    return entity;
  }

  injectToEntity(entity, form: FormGroup, fields: DynamicField<any>[]) {
    fields.forEach(element => {

      if (this.implementedField(element)){
        entity[element.key] = form.controls[element.key].value;
        element.value = form.controls[element.key].value;
        if (element.controlType === 'checkbox' && (entity[element.key] === undefined || entity[element.key] === '')) {
          entity[element.key] = false;
        }
        if (element.controlType === 'datepicker' && entity[element.key] && entity[element.key].format !== undefined) {
          // if (element.options){
          //  if (element.options.format){
          //   entity[element.key] = entity[element.key].format(element.options.format);
          //  }else if ( element.options.withHourAndMin){
          //   entity[element.key] = entity[element.key].format(MY_FORMATS.parse.dateInputHours);
          //  }else{
          //   entity[element.key] = entity[element.key].format(MY_FORMATS.parse.dateInput);
          //  }
          // }else{
          //   entity[element.key] = entity[element.key].format(MY_FORMATS.parse.dateInput);
          // }
        }
        if (element.controlType === 'float' && element.options) {
            const delim = element.options.delim ? element.options.delim : ',';
            const outputDelim = element.options.outputFormatDelim ? element.options.outputFormatDelim : '.'; 
            entity[element.key] =  entity[element.key].replace(delim, outputDelim);
        }
        if (element.controlType === 'number' && 
            (entity[element.key] !== '' && entity[element.key] !== undefined && entity[element.key] !== null)){
          entity[element.key] = Number(entity[element.key]);
          element.value = Number(element.value);
        }
        if (element.id && entity.id === true){ // Si es el id, le creo un campo id la entidad, de esta forma el servicio sabe cual es el id del registro
          entity.id = element.value;
        }
     }
    });
    return entity;
  }

  updateFieldsByField(fields: any [], field) {
    return fields.map(element => element.key === field.key ? field : element);
  }

  updateFormByField(form, field) {
    form.controls[field.key].required = field.required;
  }
  fieldsChangesBehavior( fields: DynamicField<any>[], fieldsBehavior: DynamicFieldBehavior[], data, form: FormGroup){
    if (fields === undefined || fieldsBehavior === null || fieldsBehavior === undefined || form === undefined || data === undefined){
      return;
    }
    const entity = data.entity;
    let fieldsToChange = data.fieldKey ? [data.fieldKey] : [];
    if (fieldsToChange.length === 0){
      fieldsToChange = fields.map(f => f.key);
    }
    fieldsToChange.forEach(fieldKey => this.fieldChangeBehavior(fieldKey, fieldsBehavior,  entity, fields, form));
  }

  fieldChangeBehavior(fieldKey: string, fieldsBehavior: DynamicFieldBehavior[], entity, fields, form: FormGroup){
    const fieldsBehaviorFiltered = fieldsBehavior.filter(fb => fieldKey === fb.fieldKey);
    if(fieldsBehaviorFiltered) {
      fieldsBehaviorFiltered.forEach(fieldBehavior => {
        if (fieldBehavior){
          let result = true;
          const condition = fieldBehavior.condition;
          if (condition.if){
            condition.if.forEach(el => {
              if (result){
                result = this.evalCondition(el, fields, entity);
              }
            });
          }
          const fieldsToChanges = result ? condition.then : condition.else;
          fieldsToChanges.forEach(field => {
            const fieldControl = this.getFieldControl(field.key, form, fields);
            fieldControl.updateByDef(field);
            if (field.showErrorMsg !== undefined && field.showErrorMsg !== '' && field.showErrorMsg !== null){
              this.addErrorToFields(form, {[field.key]: field.showErrorMsg});
            }else if (field.showErrorMsg === ''){
              // Agregar codigo en su momento
            }
          });
        }
      });
    }
  }

  private evalCondition(condition: DynamicFieldConditionIf, fields, entity){
    let result = true;
    if (condition.key !== undefined){
      const compare = condition.compare ? condition.compare : FILTER_TYPE.EQUALS;
      const field = fields.find(f => f.key === condition.key);
      if (condition.toField){
          const entityValue = entity[condition.toField];
            let conditionValue = condition.value;
          if (conditionValue){
            result = this.filterService.filter(entityValue, conditionValue, compare, field);
          }else{
            conditionValue = entity[condition.key];
            if ( (conditionValue === null || conditionValue === 0 || conditionValue === undefined || conditionValue === "" ) && condition.avoidThenOnValueNull){
              result = false;
            }else {
              result = this.filterService.filter(entityValue, conditionValue, compare, field);
            }
          }
      }else{
          result = this.filterService.filter(entity[condition.key], condition.value, compare, field);
      }
    }
    return result;
  }

  private setValues(observable: Observable<any>, field) {
    observable.subscribe(d => {
      if (field.options === undefined) {
        field.options = {};
      }
      field.options.fromData = d;

    });
  }
  
  // Customs Validators
  private hideField(form: FormGroup, field) {
    if (field.controlType !== HIDDEN) {
      this.setUndefinedField(form, field);
      field.controlType = HIDDEN;
      this.changeToUnRequired(form, field);
      this.disable(form, field);
    }
    return field;
  }

  private changeToRequired (form: FormGroup, field) {
    if (field.required === undefined || field.required === false || field.required === null) {
      field.required = true;
      this.updateValidators(form, field);
    }
  }

  private changeMaxLength(form, field, length){
    if (field.maxLength !== length){
      field.maxLength = length;
      this.updateValidators(form, field);
    }
  }

  private changeMinLength(form, field, length){
    if (field.minLength !== length){
      field.minLength = length;
      this.updateValidators(form, field);
    }
  }
  
  private changeRemoveLengths(form, field){
    if (field.length || field.minLength || field.maxLength){
      field.length = undefined;
      field.minLength = undefined;
      field.maxLength = undefined;
      this.updateValidators(form, field);
    }
  }

  private updateByDef(form, field, def){
    let update = true;
    if (def.value !== undefined){
      this.setValueField(form, field, def.value);
      update = true;
    }
    if (def.disabled !== field.disabled){
      field.disabled = def.disabled;
      if (field.disabled === undefined || field.disabled === false){
        this.enabled(form, field);
      }else{
        this.disable(form, field);
      }
      update = true;
    }

    if (field.required !== def.required && def.required !== undefined){
      field.required = def.required;
      update = true;
    }

    if (def.minLength !== field.minLength) {
      field.minLength = def.minLength;
      update = true;
    }

    if (def.maxLength !== field.maxLength) {
      field.maxLength = def.maxLength;
      update = true;
    }
    if (def.length !== field.length) {
      field.length = def.length;
      update = true;
    }
    if ((def.validation !== undefined && field.validation === undefined) ||
          (def.validation === undefined && field.validation !== undefined)){
      field.validation = def.validation;
    }else if (def.validation !== undefined &&  field.validation !== undefined) {
      if ((def.validation.regexKey !== field.validation.regexKey) || 
            (def.validation.regex !== field.validation.regex) || 
              (def.validation.errorMessageKey !== field.validation.errorMessageKey)){
        field.validation = def.validation;
        update = true;
      }
    }

    if (def.controlType !== field.controlType) {
      field.controlType = def.controlType;
      update = true;
    }

    if (update){
      this.updateValidators(form, field);
    }
  }

  private changeLength(form, field, length){
    if (field.length !== length){
      field.length = length;
      this.updateValidators(form, field);
    }
  }
  
  private updateValidators(form, field){
    form.controls[field.key].setValidators(this.formValidatorService.getValidators(field));
    form.controls[field.key].updateValueAndValidity();
  }

  private changeRemoveRegex(form, field){
    if (field.validation){
      field.validation = undefined;
      this.updateValidators(form, field);
    }
  }

  private changeRegexKey(form, field, regexKey){
    if (field.validation){
      if (regexKey !== field.validation.regexKey){
        field.validation.regexKey = regexKey;
        this.updateValidators(form, field);
      }
    } else {
      field.validation = {regexKey: regexKey};
      this.updateValidators(form, field);
    }
  }
  private changeToUnRequired (form: FormGroup, field) {

    if (field.required === undefined || field.required === true || field.required === null) {
      field.required = false;
      this.updateValidators(form, field);
    }
  }

  private changeFieldToAutocomplete(form, field) {
    if (field.controlType !== AUTOCOMPLETE) {
      this.enabled(form, field);
      this.setUndefinedField(form, field);
      field.controlType = AUTOCOMPLETE;
    }
    return field;
  }

  private changeFieldToAutocompleteDesplegable(form, field) {
    if (field.controlType !== AUTOCOMPLETE_DESPLEGABLE) {
      this.enabled(form, field);
      this.setUndefinedField(form, field);
      field.controlType = AUTOCOMPLETE_DESPLEGABLE;
    }
    return field;
  }

  private changeFieldToSelect(form, field) {
    if (field.controlType !== SELECT) {
      this.enabled(form, field);
      this.setUndefinedField(form, field);
      field.controlType = SELECT;
    }
    return field;
  }

  private changeFieldToNumber(form, field) {
    if (field.controlType !== NUMBER) {
      this.enabled(form, field);
      this.setUndefinedField(form, field);
      field.controlType = NUMBER;
    }
  }

  private changeFieldToDisabled(form, field) {
    if (field.disabled !== undefined && field.disabled) {
      field.disabled = true;
    }
  }

  private changeFieldToEnabled(form, field) {
    if (field.disabled === undefined || !field.disabled) {
      field.disabled = false;
    }
  }

  private changeFieldToTextbox(form, field) {
    if (field.controlType !== TEXTBOX) {
      this.enabled(form, field);
      this.setUndefinedField(form, field);
      field.controlType = TEXTBOX;
    }
    return field;
  }

  private changeFieldToDatepicker(form: FormGroup, field) {
    if (field.controlType !== DATEPICKER) {
      this.enabled(form, field);
      field.controlType = DATEPICKER;
      this.setUndefinedField(form, field);
      form.controls[field.key].reset();
    }
    return field;
  }
  
  setUpBehaviorTextFromI18n(i18n: I18n, fieldBehavior: DynamicFieldBehavior[]): any {
    const repeat = (list, i18nP: I18n) => {
      list.forEach(r => {
          if (r.showErrorMsgKey){
            r.showErrorMsg = i18nP.translate(r.showErrorMsgKey);
          }
      });
    };
    if (fieldBehavior){
      fieldBehavior.forEach(f => {
        if (f.condition){
          const th = f.condition.then;
          const el = f.condition.else;
          if (th){
            repeat(th, i18n);
          }
          if (el){
            repeat(el, i18n);
          }
        }
      });
    }
  }

  setUndefinedField(form: FormGroup, field) {
    this.setValueField(form, field, undefined);
  }

  setValueField(form: FormGroup, field, value) {
    if (field.value !== value) {
      field.value = value;
      form.controls[field.key].patchValue(field.value);
    }
  }

  getField(fieldKey: string, fields: DynamicField<any> []): DynamicField<any>{
    return fields.find(f => f.key === fieldKey);
  }
  private disable(form: FormGroup, field){
    form.controls[field.key].disable();
  }

  private enabled(form: FormGroup, field){
    form.controls[field.key].enable();
  }

  
}
