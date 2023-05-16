import { Component, OnInit, Input, forwardRef, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, Validators } from '@angular/forms';
import { ImportImageConfiguration } from './import-image.interface';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ImportImageComponent),
  multi: true
};

@Component({
  selector: 'app-import-image',
  templateUrl: './import-image.component.html',
  styleUrls: ['./import-image.component.css'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class ImportImageComponent implements OnInit, ControlValueAccessor {

  @Input() config: ImportImageConfiguration;
  @Input() formGroup: FormGroup;
  @Input() name: string;

  public color: any;
  _value: string;
  // pattern = new RegExp('^#+([a-fA-F0-9]{6})$');

  urlpattern = new RegExp('^((https?:\\/\\/)|(http?:\\/\\/))' + // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
  '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

  emailPattern = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$');

  constructor(protected changeDetectorRef: ChangeDetectorRef){}
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
    /**Requerido */
    if (this.config.required) {
      this.formGroup.controls[this.name].setValidators([Validators.required]);
    }
    // this.formGroup.controls[this.name].setValidators([Validators.pattern(this.urlpattern)]);
    
    this.config.options.invalidValueMessage = 'Formato de URL o Email inválido. Debe comenzar con http:// o https:// o ingresar un email válido';
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

  clickOpenUrl() {
    if (this.value !== undefined && this.value !== '' && (this.urlpattern.test(this.value) || this.emailPattern.test(this.value))) {
        const win = window.open(this.value, '_blank');
        win.focus();
    }
  }

  clickOpenCkfinder() {
  const compName = this.name;
  const resourceType = this.config.options && this.config.options.resourceType ? this.config.options.resourceType + ':' : 'Files:';
  const defaultStartUpFolder = '.newsite';    
  const ckFinderConfig: any = {
      chooseFiles: true,
      chooseFilesClosePopup: true,
      chooseFilesOnDblClick: true,
      rememberLastFolder: false,
      startupPath : resourceType + defaultStartUpFolder,
      onInit: (finder) => {
          finder.on('files:choose', (evt) => {
              const file = evt.data.files.first();
              const url = file.getUrl();
              this.value = url;
              this.formGroup.controls[compName].setValue(url);
              this.formGroup.controls[compName].updateValueAndValidity();
          });
      }
    };

    // @ts-ignore
    CKFinder.popup(ckFinderConfig);
  }

  changeInput() {

    if ((!this.urlpattern.test(this.value) && !this.emailPattern.test(this.value)) && this.value) {
      this.formGroup.controls[this.name].setErrors({invalidValue: true});
    } else if (this.formGroup.controls[this.name].errors) {
      delete this.formGroup.controls[this.name].errors.invalidValue;
    }
    this.formGroup.updateValueAndValidity();
  }
}
