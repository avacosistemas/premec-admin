// import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { MatSnackBar } from '@angular/material';

// import 'rxjs/add/operator/startWith';
// import 'rxjs/add/observable/merge';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/observable/fromEvent';
// import { Subscription } from 'rxjs/Subscription';

// import { Location } from '@angular/common';
// import { Injector } from '@angular/core';
// import { Output } from '@angular/core';
// import { EventEmitter } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
// import { Input } from '@angular/core';
// import { Router } from '@angular/router';
// import { NotificationService } from '../../../service/notification/notification.service';
// import { LocalStorageService } from '../../../service/local-storage/local-storage.service';
// import { fuseAnimations } from '@fuse/animations';
// import { AbstractComponent } from '../../../component/abstract-component.component';
// import { CrudDef } from '../../../model/component-def/crud-def';
// import { I18n } from '../../../model/i18n';
// import { ComponentDef } from '../../../model/component-def/component-def';
// import { GenericHttpService } from '../../../service/generic-http-service/generic-http.service';


// @Component({
//     // tslint:disable-next-line:component-selector
//     selector     : 'app-detail-view',
//     templateUrl  : './detail-view.component.html',
//     styleUrls    : ['./detail-view.component.scss'],
//     encapsulation: ViewEncapsulation.None,
//     animations   : fuseAnimations
// })
// export class DetailViewComponent extends AbstractComponent implements OnInit{
//     @Input()
//     componentName: string;
//     component: CrudDef;
//     i18n: I18n;
//     private genericService: GenericHttpService;
//     constructor(
//             public activatedRoute: ActivatedRoute, 
//             injector: Injector) {
//             super(injector);
//             // this.redirect = 'clienteListado'; Lo cargo en el init
//             // this.onFieldsChangesHandler = this.onFieldsChangesHandlerDef; lo manejo diferente
//             // this.submitObserver = this.submitObserverDef; lo manejo diferente
//         this.genericService = injector.get(GenericHttpService);
//     }

//     onInit(){
//         const params = this.activatedRoute.snapshot.params;
//         const id = params['id'];
//         this.componentDefService.getByName(this.componentName).subscribe(component => {
//             this.component = component;
//             this.i18nService.getByName(this.component.i18n.name).subscribe(i18n => {
//                 this.i18n = i18n;
//                 this.requestData(this.component);
//             });
//         });
//     }

//     requestData(component: ComponentDef){
//         this.genericService.callWs(component.ws).subscribe(dto => {
//             const baseFields = this.component.formsDef.update.fields;
//             if (baseFields){

//             }
//             const subForms = this.component.formsDef.update.subForms;
//             if (subForms){
                
//             }
//         });
//     }

// // initItemDetail(entity: any){
// // const ind = new ItemDetail();
// // ind.title = 'Detalle del cliente';
// // // TAB DATOS PERSONALES EMPRESA
// // const dp = new ItemTab();
// // let dpf: any;
// // if (this.data['datosPersonalesDTO'] && this.data['datosPersonalesDTO'].tipoCliente === 'Empresa'){
// // dpf = CLIENT_DETAIL_EMPRESA_DATOS_PERSONALES_FORM;
// // }else{
// // dpf = CLIENT_DETAIL_PERSONA_DATOS_PERSONALES_FORM;
// // }
// // this.addTab(ind, 
// //           this.translate('form_datos_personales_title'),
// //           'datosPersonalesForm',
// //           'datosPersonalesDTO',
// //           'datosPersonalesFields',
// //           this.data['datosPersonalesDTO'], 
// //           this.localStorageService.clone(dpf));
// // // TAB CONTACTO
// // this.addTab(ind,
// //           this.translate('form_contacto_title'),
// //           'contactoForm',
// //           'contactoDTO',
// //           'contactoFields',
// //           this.data['contactoDTO'],
// //           this.localStorageService.clone(CONTACTO_FORM));

// // // TAB CUENTA BANCARIA
// // this.addTab(ind,
// // this.translate('form_cuenta_bancaria_title'),
// // 'cuentaBancariaForm',
// // 'cuentaBancariaDTO',
// // 'cuentaBancariaFields',
// // this.data['cuentaBancariaDTO'],
// // this.localStorageService.clone(CUENTA_BANCARIA_FORM));

// // // TAB INGRESOS 
// // this.addTab(ind,
// // this.translate('form_ingresos_title'),
// // 'ingresoForm',
// // 'ingresoDTO',
// // 'ingresoFields',
// // this.data['ingresoDTO'],
// // this.localStorageService.clone(CLIENT_DETAIL_INGRESOS_FORM));
// // this.itemDetail = ind;
// // }

// // addTab(detail: ItemDetail, tabName, formName, dtoName, fieldsName, entity, fields: any){
// // const tab = new ItemTab();
// // tab.name = tabName;
// // tab.formName = formName;
// // tab.dtoName = dtoName;
// // tab.fieldsName = fieldsName;
// // tab.entity = entity;
// // tab.isEdit = true;
// // tab.fields = fields;
// // detail.addTab(tab);
// // }

// // onFieldsChangesHandlerDef(toHandlerDto){
// // this.clientFormService.formClientBehavior(toHandlerDto.data, toHandlerDto.forms, toHandlerDto.fields);
// // }

// // submitObserverDef(data, tabs, form){  
// // return new Observable(observer => {
// //   const objFinal = data['datosPersonalesDTO'];
// //   objFinal['contactoDTO'] = data['contactoDTO'];
// //   objFinal['ingresoDTO'] = data['ingresoDTO'];
// //   objFinal['cuentaBancariaDTO'] = data['cuentaBancariaDTO'];
// //   const idEntity = data['datosPersonalesDTO'].id;
// //   const methodValidation = data['datosPersonalesDTO'].genero === 'EMPRESA' ? 'ingresosEmpresaValidation' : 'ingresosPersonaValidation';
// //   const request = [
// //     [this.clienteService, 'datosPersonalesValidation', data['datosPersonalesDTO'], form['datosPersonalesForm']],
// //     [this.clienteService, 'contactoValidation', data['contactoDTO'], form['contactoForm']],
// //     [this.clienteService, 'cuentaBancariaValidation', data['cuentaBancariaDTO'], form['cuentaBancariaForm']],
// //     [this.clienteService, methodValidation, data['ingresoDTO'], form['ingresoForm']],
// //     [this.clienteService, 'update', objFinal, new FormGroup({})]
// //   ];
// //   this.runValidations(idEntity, observer, request);
// // });
// // }

// // runValidations(idEntity: number, observer, validations: any[]) {
// // const data = validations[0];
// // const subV = validations.slice(1, validations.length);
// // const obj = this.localStorageService.clone(data[2]);
// // obj.id = idEntity;
// // if (observer === null || observer === undefined){
// // return new Observable(obs => {
// //   this.runValidations(idEntity, obs, validations);
// // });
// // }else{
// //   this.genericSubmit(data[0], data[1], obj, data[3]).subscribe(r => {
// //     if (subV && subV.length > 0){
// //         this.runValidations(idEntity, observer, subV);
// //     }else{
// //         observer.next();
// //     }
// //   }, e => {
// //     observer.error();
// //   }, () => { 
// //     observer.complete();
// //   });
// // }
// // }

// getI18nName(): string {
// return 'client-detail';
// }
// }
