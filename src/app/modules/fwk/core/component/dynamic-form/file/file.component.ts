import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Input } from '@angular/core';

import { Injector } from '@angular/core';
import { DynamicFieldFormComponent } from '../dynamic-field-form/dynamic-field-form.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent extends DynamicFieldFormComponent{


  fileName: string;
  constructor(public injector: Injector) { super(injector); }

  onFileChange(event){
    const reader = new FileReader();
    
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.fileName = file.name;
      console.log(file);
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => {
        const arrayBuffer: any = reader.result,
        array = new Uint8Array(arrayBuffer);
        const fileByteArray = [];
        for (let i = 0; i < array.length; i++) {
            fileByteArray.push(array[i]);
        }
        this.parentForm.controls[this.field.key].setValue(fileByteArray);
        if (this.parentForm.controls['fileName']){
          this.parentForm.controls['fileName'].setValue(this.fileName);
        }
      };
      // reader.onload = () => {
      //   this.parentForm.controls[this.field.key].setValue(reader.result);
      //   // need to run CD since file load runs outside of zone
      //   this.cd.markForCheck();
      // };
    }
  }

  acceptTypes(){
    if (this.field.options && this.field.options.acceptTypes){
      return this.field.options.acceptTypes;
    }
    return undefined;
  }
  
}
