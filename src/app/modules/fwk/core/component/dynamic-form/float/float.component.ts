import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';

import { Injector } from '@angular/core';
import { DynamicFieldFormComponent } from '../dynamic-field-form/dynamic-field-form.component';

const DEFAULT_RESTRICT_CHARS = '[0-9,]';
const RESTRICT_CHARS = '[0-9';
const RESTRICT_CHARS_END = ']';
interface FloatOptions {
  restrictionKeys?: string;
  decimalMaxLength?: number;
  delim?: string;
}
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-float',
  templateUrl: './float.component.html',
  styleUrls: ['./float.component.scss']
})

export class FloatComponent extends DynamicFieldFormComponent implements OnInit{
  restrictionKeys = DEFAULT_RESTRICT_CHARS;
  decimalMaxLength = 2;
  delim = ',';
  constructor(public injector: Injector) { super(injector); }
  
  
  ngOnInit(): void {
    
    if ( this.field.options){
      const floatOptions: FloatOptions = this.field.options;
      if (floatOptions.delim){
        this.delim = floatOptions.delim;
        this.restrictionKeys = RESTRICT_CHARS + this.delim + RESTRICT_CHARS_END;
      }
      if (floatOptions.restrictionKeys){
        this.restrictionKeys = floatOptions.restrictionKeys;
      }
      if (floatOptions.decimalMaxLength){
        this.decimalMaxLength = floatOptions.decimalMaxLength;
      }
    }
    this.parentForm.controls[this.field.key].valueChanges.subscribe(val => {
      const value = String(val);
      if (value){
        if (value.includes(',')){
          const parts = String(val).split(this.delim);
          if (parts.length !== 2){
            this.parentForm.controls[this.field.key].setErrors({float: 'El campo ' + this.field.label + ' tiene un formato decimal incorrecto'});
          }else {
            if (parts[0].length === 0 ||
                  parts[1].length === 0) {
              this.parentForm.controls[this.field.key].setErrors({float: 'El campo ' + this.field.label + ' tiene un formato decimal incorrecto'});
            }else{
              const error = this.validationDecimalMaxLength(this.field.label, parts[1], this.decimalMaxLength);
              if (error){
                this.parentForm.controls[this.field.key].setErrors(error);
              }
            }
          }    
        }
      }
    });
  }

  getMessageErrorValidation(field) {
    const errors = this.parentForm.controls[this.field.key].errors;
    if (errors){
      const error = errors['float'];
      if (error) {
        return error;
      }
      return super.getMessageErrorValidation(field);
    }
    return '';
  }

  private validationDecimalMaxLength(fieldName, decimalPart, decimalMaxLength): any{
      if (decimalMaxLength){
        if (decimalPart && decimalPart.length > decimalMaxLength){
          return {float: 'El campo ' + fieldName + ' debe contener un máximo de ' + decimalMaxLength + ' decimales'};
        }
      }
  }
}
