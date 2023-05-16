import { Component, Injector, OnInit } from '@angular/core';
import { DynamicFieldFormComponent } from '../dynamic-field-form/dynamic-field-form.component';

@Component({
  selector: 'app-datepicker-time',
  templateUrl: './datepicker-time.component.html'
})
export class DatepickerTimeComponent extends DynamicFieldFormComponent implements OnInit  {

  constructor(public injector: Injector) { super(injector); }
  config = {
    firstDayOfWeek: 'su',
    monthFormat: 'MMM, YYYY',
    disableKeypress: false,
    allowMultiSelect: false,
    closeOnSelect: undefined,
    closeOnSelectDelay: 100,
    onOpenDelay: 0,
    weekDayFormat: 'ddd',
    appendTo: document.body,
    drops: 'up',
    opens: 'right',
    showNearMonthDays: true,
    showWeekNumbers: false,
    enableMonthSelector: true,
    format: 'DD/MM/YYYY HH:mm',
    yearFormat: 'YYYY',
    showGoToCurrent: true,
    dayBtnFormat: 'DD',
    monthBtnFormat: 'MMM',
    hours12Format: 'hh',
    hours24Format: 'HH',
    meridiemFormat: 'A',
    minutesFormat: 'mm',
    minutesInterval: 1,
    secondsFormat: 'ss',
    secondsInterval: 1,
    showSeconds: false,
    showTwentyFourHours: true,
    timeSeparator: ':',
    multipleYearsNavigateBy: 10,
    showMultipleYearsNavigation: true,
    locale: 'es-AR',
  };

  ngOnInit() {
    // if (this.parentForm && this.parentForm.controls[this.field.key] && !this.parentForm.controls[this.field.key].value) {
    //   const date = new Date();
    //   const dateFormat = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
    //   this.parentForm.controls[this.field.key].patchValue(dateFormat + ' 00:00:00');
    // }
  }

  remove(){
    if (this.parentForm.value) {
      this.formService.patchField(this.field.key,  undefined, this.parentForm);
    }
  }
}
