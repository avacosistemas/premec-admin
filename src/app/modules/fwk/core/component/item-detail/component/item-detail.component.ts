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
// import { AbstractFormComponent } from '../../abstract-form.component';
// import { ItemDetail } from '../model/item-detail';
// import { NotificationService } from '../../../service/notification/notification.service';
// import { LocalStorageService } from '../../../service/local-storage/local-storage.service';
// import { fuseAnimations } from '@fuse/animations';


// @Component({
//     // tslint:disable-next-line:component-selector
//     selector     : 'app-item-detail',
//     templateUrl  : './item-detail.component.html',
//     styleUrls    : ['./item-detail.component.scss'],
//     encapsulation: ViewEncapsulation.None,
//     animations   : fuseAnimations
// })
// export class ItemDetailComponent extends AbstractFormComponent implements OnInit, OnDestroy {

//     data: any;
//     itemDetail: ItemDetail;
//     pageType: string;
//     form: FormGroup;
//     submitObserver: any;
//     routeParams: any;
//     onFieldsChangesHandler: any;
//     notificationService: NotificationService;
//     localStorageService: LocalStorageService;
//     router: Router;
//     redirect: any;
//     constructor(
//         injector: Injector
//     ) {
//         super(injector);
//         this.router = injector.get(Router);
//         this.notificationService = injector.get(NotificationService);
//         this.localStorageService = injector.get(LocalStorageService);

//         this.setUpI18n({
//             name: 'item-detail',
//             lang: 'es',
//             dictionary: {
//                 page_detail_update_button: 'Actualizar',
//                 form_submitted_successfully: 'Actualización exitosa!'
//             }
//         });

//         this.data = {};
//         this.form = new FormGroup({});
//         this.pageType = 'edit';
//     }

//     onInit() {
//         /*
//         this.activatedRoute.queryParams.subscribe(params => {
//             this.service.getById(this.routeParams['id']).subscribe(data => {
//                 this.data = data;
//             });
//         });
//         */
//     }

//     ngOnDestroy() {

//     }

//     getI18nName(): string {
//         return 'item-detail';
//     }

//     onChangeEntity(dtoKey, data) {
//         Object.getOwnPropertyNames(data).forEach((val, idx) => {
//             this.data[dtoKey][val] = data[val];
//         });
//     }

//     onFieldsChanges(dtoName, fields, data) {
//         const copyData = this.localStorageService.clone(this.data);
//         const tab = this.itemDetail.tabs.find(e => e.dtoName === dtoName);
//         tab.fields = data.fields;
//         const clone = this.localStorageService.clone(data.entity);
//         Object.getOwnPropertyNames(clone).forEach((val, idx) => {
//             copyData[dtoName][val] = clone[val];
//         });
//         const toConsume = {
//             data: copyData,
//             forms: {},
//             fields: {}
//         };
//         this.itemDetail.tabs.forEach(e => {
//             toConsume.forms[e.formName] = this.form.controls[e.formName];
//             toConsume.fields[e.fieldsName] = e.fields;
//         });
//         this.onFieldsChangesHandler(toConsume);
//     }

//     update() {
//         this.submitObserver(this.data, this.itemDetail.tabs, this.form.controls).subscribe(r => {
//             this.notificationService.notifySuccess(this.translate('form_submitted_successfully'));
//         }, (e) => {
//             this.notificationService.notifyError(this.translate('form_submitted_error_validations'));
//         });
//     }

//     returnLink() {
//         if (this.redirect) {
//             this.router.navigate([this.redirect]);
//         }
//     }
// }
