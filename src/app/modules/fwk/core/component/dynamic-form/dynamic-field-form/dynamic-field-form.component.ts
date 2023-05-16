import { Component, OnInit, Directive } from '@angular/core';
import { Injector } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { FormService } from '../../../service/dynamic-form/form.service';
import { DynamicField } from '../../../model/dynamic-form/dynamic-field';

@Directive()
export abstract class DynamicFieldFormComponent {

  @Input()
  field: DynamicField<any>;
  @Input()
  parentForm: FormGroup;

  formService: FormService;

  constructor(injector: Injector) {
    this.formService = injector.get(FormService);
  }

  getMessageErrorValidation(field) {
    return this.formService.getMessageErrorValidation(this.parentForm, field);
  }

  getFloatLabel(field: DynamicField<any>){
    return field.options['floatLabel'] ? field.options['floatLabel'] : 'auto';
  }

  getRestrictionKeys(field: DynamicField<any>){
    if (field.options.restrictionKeys){
      return field.options.restrictionKeys;
    }
  }
}
