import { Injectable } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DynamicField, HIDDEN, AUTOCOMPLETE, NUMBER, TEXTBOX, DATEPICKER, SELECT, EMAIL } from '../../model/dynamic-form/dynamic-field';

import { AbstractControl } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import { String, StringBuilder } from 'typescript-string-operations';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {defaultFormat as _rollupMoment, Moment} from 'moment';
import { Observer ,  Observable } from 'rxjs';
import { I18nService } from '../i18n-service/i18n.service';
import { I18n } from '../../model/i18n';
import { CONSTANTS } from '../../../constants';


const moment: any = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
    dateInputHours: 'DD/MM/YYYY HH:mm',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const REGEX_KEY_SPACES_AND_ESPECIAL_LETTERS_NUMBERS_SLASH_DOT = 'spacesAndSpecialLettersNumbersSlashDot';
export const REGEX_KEY_SPACES_AND_ESPECIAL_LETTERS = 'spacesAndSpecialLetters';
export const REGEX_KEY_LETTERS_NUMBERS = 'lettersNumbers';
export const REGEX_KEY_CODIGO_POSTAL = 'codigoPostal';
export const REGEX_KEY_ALIAS_CBU = 'aliasCBU';
export const REGEX_KEY_CUIT = 'cuit';
export const REGEX_KEY_CUIL = 'cuil';
export const REGEX_KEY_USER = 'user';
export const REGEX_VALIDATION = 'regex';
export const OPTION_VALIDATION = 'optionRequired';
export const EQUALS_VALIDATION = 'equals';
export const GT_18_YEARS_OLD_VALIDATION = 'gt18YearsOld';
export const REGEX_KEY_EMAIL = 'email';
export const REGEX_KEY_URL = 'url';
export const REGEX_KEY_NO_WHITE_SPACES = 'whitespace';

@Injectable()
export class FormValidatorService {
  i18n: I18n;
  constructor(i18nService: I18nService) {
    i18nService.addI18n({
      name: 'form-validator',
      lang: 'es',
      dictionary: {
        required_error_message: 'El campo {0} es requerido',
        min_length_error_message: 'El campo {0} debe tener una longitud mínima de {1} caracter/es',
        max_length_error_message: 'El campo {0} debe tener una longitud máxima de {1} caracter/es',
        length_error_message: 'El campo {0} debe tener una longitud de {1} caracter/es',
        min_error_message: 'El campo {0} debe ser de un valor mínimo de {1} ',
        max_error_message: 'El campo {0} debe ser de un valor máximo de {1} ',
        email_format_error_message: 'El campo {0} no tiene un formato válido',
        whitespace_format_error_message: 'El campo {0} no puede iniciar con espacios.',
        user_error_message: 'El campo {0} solo permite letras, números, guion bajo y medio',
        spaces_and_especial_characters_error_message: 'El campo {0} solo permite letras y espacios',
        spaces_and_especial_letters_numbers_slash_dot_error_message: 'El campo {0} solo se permite letras, números, guion medio y punto',
        letter_numbers_dash_undercode_with_first_letter_message: 'El campo {0} debe comenzar con una letra y solo se permite letras, números, guion medio y bajo',
        only_numbers_message: 'El campo {0} solo permite números',
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
        generic_error_message: 'El campo {0} es invalido',
        gt_18_years_old_error_message: 'Debe ser mayor de 18 años para registrarse',
        date_hour_message: 'Debe ingresar una fecha y hora valida ej: 20/08/2018 17:00',
        url_format_error_message: 'El campo {0} no tiene un formato válido',
      }
    });
    i18nService.getByName('form-validator').subscribe(i18n => {
      this.i18n = i18n;
    });
  }

  setUpFieldTextFromI18n(i18n: I18n, fields) {
    fields.forEach(element => {
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
    });
  }

  getMessageErrorValidation(form, field: DynamicField<any>) {
    const errors = form.controls[field.key].errors;

    const nameField = field.label.toLowerCase();
    if (errors['required']) {
      if (field['requiredMessage'] !== undefined) {
        return field['requiredMessage'];
      }
      if (field.controlType === DATEPICKER) {
        if (field.options && field.options.format){

          return String.Format(this.i18n.translate('date_error_required_or_invalidmessage'), nameField, field.options.format);
        }else{

          return String.Format(this.i18n.translate('date_error_required_or_invalidmessage'), nameField, MY_FORMATS.parse.dateInput);
        }
      }
      return String.Format(this.i18n.translate('required_error_message'), nameField);
    } else if (errors['maxlength']) {
      if (field['maxLengthMessage'] !== undefined) {
        return field['maxLengthMessage'];
      }
      return this.getMessageMaxLengthField(nameField, field.maxLength);
    } else if (errors['minlength']) {
      if (field['minLengthMessage'] !== undefined) {
        return field['minLengthMessage'];
      }
      return this.getMessageMinLengthField(nameField, field.minLength);
    } else if (errors['length']) {
      if (field['lengthMessage'] !== undefined) {
        return field['lengthMessage'];
      }
      return this.getMessageLengthField(nameField, field);
    } else if (errors['min']) {
      if (field['minValueMessage'] !== undefined) {
        return field['minValueMessage'];
      }
      return this.getMessageMinField(nameField, field.minValue);
    }else if (errors['max']) {
      if (field['maxValueMessage'] !== undefined) {
        return field['maxValueMessage'];
      }
      return this.getMessageMaxField(nameField, field.minValue);
    }  else if (errors['email']) {
        return this.getMessageEmailField(nameField);
    } else if (errors['date'] || errors['matDatepickerParse']) {
      if (field.options && field.options.format){
        return String.Format(this.i18n.translate('datepattern_error_message'), field.label.toLowerCase(), field.options.format);
      }else{
        return String.Format(this.i18n.translate('datepattern_error_message'), field.label.toLowerCase(), MY_FORMATS.display.dateInput);
      }
    } else if (errors['customError']) {
      return errors['customError'].errorMessage;
    } else if (errors['regexError']) {
      return errors['regexError'].errorMessage;
    } else if (errors['whitespace']) {
      return String.Format(this.i18n.translate('whitespace_format_error_message'), nameField);
    } else if (errors['pattern']){ /* OLD IMPLEMENTATION REGEX PATTERN CODE */
      if (field.validation.regexKey === undefined && field.validation.errorMessage){
        return String.Format(field.validation.errorMessage, nameField, field.validation.regex); 
      }
      if (field.validation.regexKey === REGEX_KEY_SPACES_AND_ESPECIAL_LETTERS){
        return String.Format(this.i18n.translate('spaces_and_especial_characters_error_message'), nameField); 
      } else if (field.validation.regexKey === REGEX_KEY_ALIAS_CBU){
        return String.Format(this.i18n.translate('alias_cbu_error_message'), nameField); 
      } else if (field.validation.regexKey === REGEX_KEY_USER){
        return String.Format(this.i18n.translate('user_error_message'), nameField); 
      } else if (field.validation.regexKey === REGEX_KEY_LETTERS_NUMBERS){
        return String.Format(this.i18n.translate('letters_numbers_error_message'), nameField); 
      } else if (field.validation.regexKey === REGEX_KEY_SPACES_AND_ESPECIAL_LETTERS_NUMBERS_SLASH_DOT){
        return String.Format(this.i18n.translate('spaces_and_especial_letters_numbers_slash_dot_error_message'), nameField); 
      } else if (field.validation.regexKey === REGEX_KEY_CODIGO_POSTAL){
        return String.Format(this.i18n.translate('codigo_postal_error_message'), nameField); 
      } else if (field.validation.regexKey === REGEX_KEY_CUIT){
        return String.Format(this.i18n.translate('cuit_error_message'), nameField); 
      } else if (field.validation.regexKey === REGEX_KEY_CUIL){
        return String.Format(this.i18n.translate('cuil_error_message'), nameField);
      } else if (field.validation.regexKey === REGEX_KEY_EMAIL){
        return String.Format(this.i18n.translate('email_format_error_message'), nameField);
      } else if (field.validation.regexKey === REGEX_KEY_URL){
        return String.Format(this.i18n.translate('url_format_error_message'), nameField); 
      }else{
        /* NEW IMPLEMENTATION MESSAGE REGEX PATTERN CODE */
        let message;
        CONSTANTS.REGEXS.forEach(regex => {
          if (field.validation.regexKey === regex.key){
            message = String.Format(this.i18n.translate(regex.messageKey), nameField);
            return;
          }
        });
        if (message){
          return message;
        }
      } 
    } else {
      let msg = null;
      /** LAST IMPLEMENTATION ERROR MESSAGE HELPER REPLACE VALIDATION REGEX */
      Object.getOwnPropertyNames(ERROR_MESSAGES_HELPER).forEach((prop, idx) => {
        if (errors[prop]){
          msg = ERROR_MESSAGES_HELPER[prop](this.i18n, field);
          return;
        }
      });
      if (msg){
        return msg;
      }
    }

    console.log(errors);
    return String.Format(this.i18n.translate('error_message_not_set'));
  }

  private getMessageEmailField(nameField) {
    return String.Format(this.i18n.translate('email_format_error_message'), nameField);
  }

  private getMessageMinField(nameField, minValue) {
    return String.Format(this.i18n.translate('min_error_message'), nameField, minValue);
  }

  private getMessageMaxField(nameField, minValue) {
    return String.Format(this.i18n.translate('max_error_message'), nameField, minValue);
  }

  private getMessageMaxLengthField(nameField, maxLength) {
    return String.Format(this.i18n.translate('max_length_error_message'), nameField, maxLength);
  }

  private getMessageMinLengthField(nameField, minLength) {
    return String.Format(this.i18n.translate('min_length_error_message'), nameField, minLength);
  }

  private getMessageLengthField(nameField, field) {
    let msg = null;
    if (field.lengthErrorMsg){
      msg = field.lengthErrorMsg;
    } else if (field.lengthErrorMsgKey){
      msg = this.i18n.translate(field.lengthErrorMsgKey);
    }else{
      msg = this.i18n.translate('length_error_message');
    }
    return String.Format(msg, nameField, field.length);
  }

  public getValidators(field) {
    const validators = [];
    if (field.required && field.controlType !== HIDDEN) {
      validators.push(Validators.required);
    }
    if (field.controlType === EMAIL && field.options && (field.options.ignoreNatValidation === false || field.options.ignoreNatValidation === undefined)) {
      validators.push(CUSTOMS_VALIDATORS_HELPER.email());
    }
    if (field.maxLength) {
      validators.push(Validators.maxLength(field.maxLength));
    }
    if (field.minLength) {
      validators.push(Validators.minLength(field.minLength));
    }
    if (field.minValue !== undefined) {
      validators.push(Validators.min(field.minValue));
    }
    if (field.maxValue !== undefined) {
      validators.push(Validators.max(field.maxValue));
    }
    if (field.length !== undefined) {
      validators.push(CUSTOMS_VALIDATORS_HELPER.length(field.length, field.required));
    }
    if (field.controlType === DATEPICKER) {
      if (field.options && field.options.format){
        validators.push(CUSTOMS_VALIDATORS_HELPER.date(field.options.format));
      }else{
        validators.push(CUSTOMS_VALIDATORS_HELPER.date(MY_FORMATS.parse.dateInput));
      }
    }
    if (field.validations){
      field.validations.forEach(validation => {
        const validator = VALIDATIONS_HELPER[validation.key];
        if (validator){
          if (validation.input){
            validators.push(validator(validation.input, validation.message));
          }else{
            validators.push(validator());
          }
        }else{
          console.warn('validation key ' + validation.key + ' not found in the validations map');
        }
      });
    }
    /** PROP VALIDATION DEPRECATED USE VALIDATIONS*/
    if (field.validation) {
      if (field.validation.regex){ /* OLD IMPLEMENTATION REGEX CODE */
        validators.push(CUSTOMS_VALIDATORS_HELPER.regex(field.validation.regex, field.validation.errorMessage));
      }else if (field.validation.regexKey === REGEX_KEY_SPACES_AND_ESPECIAL_LETTERS){
        validators.push(Validators.pattern(CONSTANTS.REGEX_SPACES_AND_SPECIAL_LETTERS));
      }else if (field.validation.regexKey === REGEX_KEY_ALIAS_CBU){
        validators.push(Validators.pattern(CONSTANTS.REGEX_ALIAS_CBU));
      }else if (field.validation.regexKey === REGEX_KEY_USER){
        validators.push(Validators.pattern(CONSTANTS.REGEX_USER));
      }else if (field.validation.regexKey === REGEX_KEY_SPACES_AND_ESPECIAL_LETTERS_NUMBERS_SLASH_DOT){
        validators.push(Validators.pattern(CONSTANTS.REGEX_SPACES_AND_SPECIAL_LETTERS_NUMBERS_SLASH_DOT));
      }else if (field.validation.regexKey === REGEX_KEY_LETTERS_NUMBERS){
        validators.push(Validators.pattern(CONSTANTS.REGEX_LETTERS_NUMBERS));
      }else if (field.validation.regexKey === REGEX_KEY_CODIGO_POSTAL){
        validators.push(Validators.pattern(CONSTANTS.REGEX_CODIGO_POSTAL));
      }else if (field.validation.regexKey === REGEX_KEY_CUIT){
        validators.push(Validators.pattern(CONSTANTS.REGEX_CUIT));
      }else if (field.validation.regexKey === REGEX_KEY_CUIL){
        validators.push(Validators.pattern(CONSTANTS.REGEX_CUIL));
      }else if (field.validation.regexKey === REGEX_KEY_EMAIL){
        validators.push(Validators.email);
      }else if (field.validation.regexKey === REGEX_KEY_NO_WHITE_SPACES){
        validators.push(CustomValidator.noWhitespaceValidator);
      }else if (field.validation.regexKey === REGEX_KEY_URL){
        validators.push(Validators.pattern(CONSTANTS.REGEX_URL));
      }else{
        /* NEW IMPLEMENTATION REGEX CODE */
        CONSTANTS.REGEXS.forEach(regex => {
          if (field.validation.regexKey === regex.key){
            validators.push(Validators.pattern(regex.regex));
            return;
          }
        });
      }
    }
    return validators;
  }
}
export const CUSTOMS_VALIDATORS_HELPER = {
  optionRequired: function (): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const result = control.value === {} || control.value === null || control.value === undefined;
      return result ? {'required': {requiredMessage: ''}} : null ;
      };
  },
  equals: function (input: string, errorMessage: string ): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      return control.value === input ? null : {'customError': {errorMessage: errorMessage}};
      };
  },

  date: function (patternDate: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    return isValidDate(control, patternDate, '');
    };
  },

  gt18YearsOld: function (patternDate: string = MY_FORMATS.parse.dateInput): ValidatorFn{
    return (control: AbstractControl): {[key: string]: any} | null => {
      let error = false;
      if (control){
        if (control.value && control.value._f && isValidDate(control, patternDate) === null && control.value._isAMomentObject) {
          error = _moment().diff(control.value, 'years') < 18;
        } 
      }
      return error ? {[GT_18_YEARS_OLD_VALIDATION]: {error: true} } : null;
    };
  },  
  regex: function (regex: string, errorMessage: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const error = new RegExp(regex).test(control.value);
      return !error ? {'regexError': {errorMessage: errorMessage}} : null;
      };
    },
  email: function (): ValidatorFn {
      return (control: AbstractControl): {[key: string]: any} | null => {
        const error = new RegExp(CONSTANTS.REGEX_EMAIL).test(control.value);
        return !error ? {'email': {error: true} } : null;
      };
  },
  noWhitespaceValidator: function (): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const isWhitespace = (control.value || '').trim().length === 0;
      return isWhitespace ? {'whitespace': true } : null;
    };
  },
  length: function (length: number, required: boolean): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      let valueString = control.value;
      if (valueString === undefined || valueString === null){
        return null;
      }
      if (typeof valueString === 'number'){
        valueString = valueString.toString();
      }
      if (valueString.length === 0 && required === false){
        return null;
      }
      return valueString !== undefined && valueString.length !== length ? {'length': true } : null;
    };
  }

};

export const VALIDATIONS_HELPER = {
  [OPTION_VALIDATION]: CUSTOMS_VALIDATORS_HELPER.optionRequired,
  [REGEX_VALIDATION]: Validators.pattern,
  [EQUALS_VALIDATION]: CUSTOMS_VALIDATORS_HELPER.equals,
  [GT_18_YEARS_OLD_VALIDATION]: CUSTOMS_VALIDATORS_HELPER.gt18YearsOld,
  [REGEX_KEY_SPACES_AND_ESPECIAL_LETTERS]: Validators.pattern(CONSTANTS.REGEX_SPACES_AND_SPECIAL_LETTERS),
  [REGEX_KEY_ALIAS_CBU]: Validators.pattern(CONSTANTS.REGEX_ALIAS_CBU),
  [REGEX_KEY_USER]: Validators.pattern(CONSTANTS.REGEX_USER),
  [REGEX_KEY_SPACES_AND_ESPECIAL_LETTERS_NUMBERS_SLASH_DOT]: Validators.pattern(CONSTANTS.REGEX_SPACES_AND_SPECIAL_LETTERS_NUMBERS_SLASH_DOT),
  [REGEX_KEY_LETTERS_NUMBERS]: Validators.pattern(CONSTANTS.REGEX_LETTERS_NUMBERS),
  [REGEX_KEY_CODIGO_POSTAL]: Validators.pattern(CONSTANTS.REGEX_CODIGO_POSTAL),
  [REGEX_KEY_CUIT]: Validators.pattern(CONSTANTS.REGEX_CUIT),
  [REGEX_KEY_CUIL]: Validators.pattern(CONSTANTS.REGEX_CUIL),
  [REGEX_KEY_EMAIL]: Validators.email,
  [REGEX_KEY_URL]: Validators.pattern(CONSTANTS.REGEX_URL),
  [REGEX_KEY_NO_WHITE_SPACES]: CUSTOMS_VALIDATORS_HELPER.noWhitespaceValidator,
};

export const ERROR_MESSAGES_HELPER = {
  [GT_18_YEARS_OLD_VALIDATION]: function(i18n: I18n, field: DynamicField<any>){
    return i18n.translate('gt_18_years_old_error_message');
  }
};

function isValidDate(control: AbstractControl, patternDate: string, errorMessage = ''){
  let error = false;
  if (control.value && control.value._f) {
    error = !_moment(control.value._i, patternDate, true).isValid();

  }
  return error ? {'date': {errorMessage: errorMessage, format: patternDate}} : null;
}

export class CustomValidator {
   // Validates URL
   static urlValidator(url): any {
      if (url.pristine) {
         return null;
      }
      const urlpattern = new RegExp('^((https?:\\/\\/)|(http?:\\/\\/))' + // protocol
         '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
         '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
         '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
         '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
         '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
      url.markAsTouched();
      if (urlpattern.test(url.value)) {
         return null;
      }
      return {
         invalidUrl: true
      };
   }
   // Validates passwords
   static matchPassword(group): any {
      const password = group.controls.password;
      const confirm = group.controls.confirm;
      if (password.pristine || confirm.pristine) {
         return null;
      }
      group.markAsTouched();
      if (password.value === confirm.value) {
         return null;
      }
      return {
         invalidPassword: true
      };
   }
   // Validates numbers
   static numberValidator(num: any): any {
      if (num.pristine) {
         return null;
      }
      const NUMBER_REGEXP = /^-?[\d.]+(?:e-?\d+)?$/;
      num.markAsTouched();
      if (NUMBER_REGEXP.test(num.value)) {
         return null;
      }
      return {
         invalidNumber: true
      };
   }
   // Validates US SSN
   static ssnValidator(ssn): any {
      if (ssn.pristine) {
         return null;
      }
      const SSN_REGEXP = /^(?!219-09-9999|078-05-1120)(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/;
      ssn.markAsTouched();
      if (SSN_REGEXP.test(ssn.value)) {
         return null;
      }
      return {
         invalidSsn: true
      };
   }
   // Validates US phone numbers
   static phoneValidator(num: any): any {
      if (num.pristine) {
         return null;
      }
      const PHONE_REGEXP = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
      num.markAsTouched();
      if (PHONE_REGEXP.test(num.value)) {
         return null;
      }
      return {
         invalidNumber: true
      };
   }
   // Validates zip codes
   static zipCodeValidator(zip): any {
      if (zip.pristine) {
         return null;
      }
      const ZIP_REGEXP = /^[0-9]{5}(?:-[0-9]{4})?$/;
      zip.markAsTouched();
      if (ZIP_REGEXP.test(zip.value)) {
         return null;
      }
      return {
         invalidZip: true
      };
   }

   static noWhitespaceValidator(control: FormControl) {
      if (control.value && control.value.length > 0) {

         const isWhitespace = (control.value || '').trim().length === 0;
         const isValid = !isWhitespace;
         return isValid ? null : { 'whitespace': true };
      }
      return null;
   }
}
