import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { TagsConfiguration } from './tags.interface';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, Validators } from '@angular/forms';

export const CUSTOM_TAG_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TagsComponent),
  multi: true
};

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
  providers: [CUSTOM_TAG_CONTROL_VALUE_ACCESSOR]
})
export class TagsComponent implements OnInit, ControlValueAccessor {

  @Input() config: TagsConfiguration;
  @Input() formGroup: FormGroup;
  @Input() name: string;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly separator = ',';

  _value: string[] = [];
  onChange = (_: any) => { };
  onTouch = () => { };

  constructor() { }

  get value(): any { return this._value; }
  set value(v: any) {
    if (v && v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  // use getter method to access courseIds control value easily
  get items() {
    return this.formGroup.get(this.name);
  }

  ngOnInit() {
    if (this.config.value && this.config.value.length > 0 && !this.formGroup.controls[this.name].value) {
     this.formGroup.controls[this.name].patchValue(this.config.value);
    } else if (this.formGroup.controls[this.name].value) {
      this.formGroup.controls[this.name].patchValue(this.formGroup.controls[this.name].value);
    } else if (this.formGroup.controls[this.name]) {
      this.formGroup.controls[this.name].patchValue(null);
    }
    /**Requerido */
    if (this.config.required) {
      this.formGroup.controls[this.name].setValidators([Validators.required]);
    }

    this.items.updateValueAndValidity();
  }

  remove(item: any): void {
    const index = this.items.value.split(this.separator).indexOf(item);

    if (index >= 0) {
      // Remove element from control value array
      const arraySplit = this.items.value.split(this.separator);
      arraySplit.splice(index, 1);    // where index = index of removed element

      this.items.patchValue(arraySplit.join(this.separator) ? arraySplit.join(this.separator) : null);
      this.items.updateValueAndValidity();
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add
    if ((value || '').trim()) {
      // Add new input to items control value
      this.items.patchValue(this.items.value ? `${this.items.value},${value.trim()}` : value.trim());

      this.items.updateValueAndValidity();
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
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

}
