import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';

import { Injector } from '@angular/core';
import { DynamicFieldFormComponent } from '../dynamic-field-form/dynamic-field-form.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent extends DynamicFieldFormComponent {

  constructor(public injector: Injector) { super(injector); }

}
