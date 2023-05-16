import { Component, OnInit, ViewChild, Directive } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { Subscription ,  Observable } from 'rxjs';

import { Injector } from '@angular/core';
import { ErrorHandler } from '@angular/core';
import { AbstractComponent } from './abstract-component.component';
import { FormService } from '../service/dynamic-form/form.service';
import { WsDef } from '../model/ws-def';
import { GenericHttpService } from '../service/generic-http-service/generic-http.service';
import { SpinnerService } from '../module/spinner/service/spinner.service';

export const VALIDATIONS_ERRORS = 'VALIDATIONS_ERRORS';

@Directive()
export abstract class AbstractFormComponent  extends AbstractComponent implements OnInit {

  protected formService: FormService;
  protected requestQeue: RequestQeue;
  protected genericHttpService: GenericHttpService;
  protected spinnerService: SpinnerService;
  protected spinnerControl: any;
  constructor(injector: Injector) {
    super(injector);
    this.formService = injector.get(FormService);
    this.requestQeue = new RequestQeue();
    this.genericHttpService = injector.get(GenericHttpService);
    this.spinnerService = injector.get(SpinnerService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.spinnerControl = this.spinnerService.getControlGlobalSpinner();
    this.requestQeue = new RequestQeue();
    this.requestQeue.setSpinnerControl(this.spinnerControl);
    
  }

  genericSubmitWithWsDef(ws: WsDef, entity, form) {
    const observable = new Observable(o => {
        const control = this.requestQeue.addRequest();
        this.genericHttpService.callWs(ws, entity).subscribe(r => {
          control.received();
          o.next(r);
        }, e => {
          if (e.error && VALIDATIONS_ERRORS === e.error.status) {
            this.formService.addErrorToFields(form, e.error.errors);
          }
          control.received();
          o.error(e);
        }, () => {
          control.received();
          o.complete();
        });
      });
    return observable;
  }

  genericSubmit(service, wsMethod, entity, form) {
    const observable = new Observable(o => {
        const control = this.requestQeue.addRequest();
        service[wsMethod](entity).subscribe(r => {
          control.received();
          o.next(r);
        }, e => {
          if (e.error && VALIDATIONS_ERRORS === e.error.status) {
            this.formService.addErrorToFields(form, e.error.errors);
          }
          control.received();
          o.error(e);
        }, () => {
          control.received();
          o.complete();
        });
      });
    return observable;
  }

  submitFormStepper(service, method, entity, form, stepper: MatStepper) {
    const observable = new Observable(o => {
      this.genericSubmit(service, method, entity, form).subscribe(
        r => {
          o.next(r);
        },
        e => {
          o.error(e);
        },
        () => {
          stepper.next();
          o.complete();
        });
      });
      return observable;
  }

  setUpTextFromI18n(fields) {
    this.formService.setUpFieldTextFromI18n(this.i18n, fields);
  }

  get submitting() {
    return this.requestQeue.requestsExists();
  }
}
export class RequestQeue {
  private requests: any[] = [];
  private spinnerControl: any;
  setSpinnerControl(spinnerControl: any){
    this.spinnerControl = spinnerControl;
  }

  addRequest(): RequestControl {
    const control = new RequestControl();
    if (this.spinnerControl){
      control.setSpinnerControl(this.spinnerControl);
    }
    control.sent(this.requests);
    console.log(this.requests);
    return control;
  }

  requestsExists() {
    return this.requests.length > 0;
  }
}

export class RequestControl {
  private id: any;
  private requests: any[];
  private spinnerControl: any;
  setSpinnerControl(spinnerControl: any){
    this.spinnerControl = spinnerControl;
  }
  sent(requests) {
    this.requests = requests;
    this.id = this.requests.length;
    console.log('request -> ' + this.id);
    this.requests.push({id: this.id});
    if (this.spinnerControl){
      if (!this.spinnerControl.isShow()){
        this.spinnerControl.show();
      }
    }
  }
  received() {
    const index = this.requests.findIndex(obj => obj.id === this.id);
    if (index >= 0) {
      this.requests.splice(index, 1);
      // console.log('request removed -> ' + this.id);
    }
    if (this.requests.length === 0 && this.spinnerControl){
      if (this.spinnerControl.isShow()){
        this.spinnerControl.hide();
      }
    }
  }
}
