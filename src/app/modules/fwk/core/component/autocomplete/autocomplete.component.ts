import { Component, OnInit, Input, Output, EventEmitter, forwardRef, OnChanges } from '@angular/core';
import { FormGroup, Validators, NG_VALUE_ACCESSOR, ControlValueAccessor, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { AutocompleteConfiguration, AutocompleteChangeValue, AutocompleteSearchTerm } from './autocomplete.interface';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  delay,
  filter
} from "rxjs/operators";
import { Observable } from 'rxjs';
import { element } from 'protractor';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AutocompleteComponent),
  multi: true
};
@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class AutocompleteComponent implements OnInit, ControlValueAccessor{

  @Input() config: AutocompleteConfiguration;
  @Input() formGroup: FormGroup;
  @Input() name: string;
  @Input() term: string;
  @Input() searchTermInterface: AutocompleteSearchTerm;
  public listObj: any;
  selectedAction: boolean;

  @Output() change = new EventEmitter<AutocompleteChangeValue>();

  public proxyValue = undefined;
  _value: string[] = [];
  onChange = (_: any) => { };
  onTouch = () => { };

  constructor() {
    this.listObj = [];
  }
  
  // ControlValueAccessor implementation
  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
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
     const getListObj = () => this.listObj;
     if (this.config.required) {
       this.formGroup.controls[this.name].setValidators([Validators.required, 
                                                           this.selectedValueIsRequired(getListObj, 
                                                                                         this.config.options.elementValue,
                                                                                         this.config.options.elementLabel)]);
     } else {
       this.formGroup.controls[this.name].setValidators([this.selectValueOrCleanField(getListObj,
                                                                                         this.config.options.elementValue,
                                                                                         this.config.options.elementLabel)]);
     }
 
     this.items.updateValueAndValidity();
     this.formGroup.controls[this.name]
         .valueChanges
         .pipe(
           startWith(''),
           debounceTime(700),
           distinctUntilChanged(), // If previous query is diffent from current
         ).subscribe((term: string) => { // subscription for response
           if (this.selectedAction) {
             this.selectedAction = false;
             return;
           }
           this.term = term;
           if (this.term === undefined 
             || this.term === null 
               || this.term.length < 3) {
               this.term = undefined;
           } else {
            this.search();
           }
         });
 
  }

  private search() {
    this.searchTermInterface.search(this.term).pipe(
      delay(0)
    ).subscribe(listObj => {
      this.listObj = listObj;
      if (this.listObj && this.listObj.length && (this.config.options.useNativeFilter === undefined || this.config.options.useNativeFilter === true)) {
        this.listObj = this.listObj.filter(t => t[this.config.options.elementLabel].includes(this.term));
      }
    });
  }

  // use getter method to access courseIds control value easily
  get items() {
    return this.formGroup.get(this.name);
  }
  
  // Class methods
  displayWith() {
    const self = this;
    return (value: any) => {
      return value === undefined 
              || value === null 
                || !(self.config 
                      && self.config.options 
                        && self.config.options.elementLabel)
                          ? value
                            : value[self.config.options.elementLabel] 
    }
  }

  showList(): any []{
    if (this.term === undefined) {
       return [];
    }
    return this.listObj;
  }

  onChangeSelect(event, obj) {
    this.selectedAction = true;
    if (this.config.options.transferIdToField) {
      const field: AbstractControl = this.formGroup.controls[this.name];
      this.formGroup.controls[this.config.options.transferIdToField].setValue(undefined);
      if (field && field.value) {
        const transferField: AbstractControl = this.formGroup.controls[this.config.options.transferIdToField];
        this.formGroup.controls[this.config.options.transferIdToField].setValue(field.value[this.config.options.elementValue]);
      }
    }
  }
  
  get value(): any { return this._value; }
  set value(v: any) {
    if (v && v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  selectedValueIsRequired(getListObj: Function, elementValue: string, elementLabel :string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value && control.value[elementLabel] && control.value[elementValue]) {
        return null;
      }
      const index = getListObj().findIndex(obj=> {
        return (new RegExp('\^' + obj[elementValue] + '\$')).test(control.value[elementValue]);
      });
      return index < 0 ? { ['required']: { value: control.value } } : null;
    };
  }

  selectValueOrCleanField(getListObj: Function, elementValue: string, elementLabel: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value) {
        if (typeof control.value === 'string' && control.value != "") {
          return  { ['selectOrCleanField']: {} };
        }
      } 
      return null;
    };
  }
}
