import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';

import { Injector } from '@angular/core';
import { DynamicFieldFormComponent } from '../dynamic-field-form/dynamic-field-form.component';
import { DialogService } from '../../../service/dialog-service/dialog.service';
import { ActionDefService } from '../../../service/action-def-service/action-def.service';
import { ActionDef } from '../../../model/component-def/action-def';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.scss']
})
export class DisclaimerComponent extends DynamicFieldFormComponent {
  constructor(public injector: Injector,
              private dialogService: DialogService) { 
    super(injector);
  }

  openDisclaimer(){
    const data = {
      html: this.field.options.disclaimer.content
    };
    this.dialogService.openHtmlModal(data, {width: '900px'});
  }
}
