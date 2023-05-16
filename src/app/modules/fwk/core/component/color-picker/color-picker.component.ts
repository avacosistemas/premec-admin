import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, Validators } from '@angular/forms';
import { ColorPickerConfiguration } from './color-picker.interface';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ColorPickerComponent),
  multi: true
};

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class ColorPickerComponent implements OnInit, ControlValueAccessor {

  @Input() config: ColorPickerConfiguration;
  @Input() formGroup: FormGroup;
  @Input() name: string;

  public color: any;
  _value: string;
  pattern = new RegExp('^#+([a-fA-F0-9]{6})$');

  onChange = (_: any) => { };
  onTouch = () => { };

  get value(): any { return this._value; }
  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  ngOnInit() {
    /**Pre-Carga */
    if (!this.formGroup.controls[this.name].value) {
      this.formGroup.controls[this.name].patchValue(this.config.value);
    }
    /**Disabled */
    /*if (this.config.disabled) {
      this.formGroup.controls[this.name].disable();
    }*/

    /**Requerido */
    if (this.config.required) {
      this.formGroup.controls[this.name].setValidators([Validators.required]);
    }

    this.formGroup.controls[this.name].updateValueAndValidity();
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  changeInput() {
    if (!this.pattern.test(this.value) && this.value) {
      this.formGroup.controls[this.name].setErrors({invalidValue: true});
    } else if (this.formGroup.controls[this.name].errors) {
      delete this.formGroup.controls[this.name].errors.invalidValue;
    }

    this.formGroup.updateValueAndValidity();
  }
}
