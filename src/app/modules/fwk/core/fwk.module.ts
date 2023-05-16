import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormService } from './service/dynamic-form/form.service';
import { QuestionModalComponent } from './component/question-modal/question-modal.component';
import { AuthGuardService } from './service/security/auth-guard.service';
import { AuthService } from './service/security/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler } from '@angular/core';
import { PickListComponent } from './component/pick-list/pick-list.component';
import { RouterModule } from '@angular/router';
import { DatepickerComponent } from './component/dynamic-form/datepicker/datepicker.component';
import { MaterialModule } from '../material/material.module';
import { DynamicFormComponent } from './component/dynamic-form/dynamic-form.component';
import { CrudModalComponent } from './component/crud/crud-modal/crud-modal.component';
import { CrudTableComponent } from './component/crud/crud-table/crud-table.component';
import { CrudComponent } from './component/crud/crud.component';
import { GenericHttpService } from './service/generic-http-service/generic-http.service';
import { MessageService } from './service/message/message.service';
import { I18nService } from './service/i18n-service/i18n.service';
import { CrudDefService } from './service/crud-def-service/crud-def.service';
import { GeneralErrorHandlerService } from './service/security/general-error-handler.service';
import { ErrorMessageService } from './service/message/error-message.service';
import { LocalStorageService } from './service/local-storage/local-storage.service';
import { NotificationService } from './service/notification/notification.service';
import { JwkInterceptor } from './service/security/jwk-interceptor';
import { FuseConfigService } from '@fuse/services/config.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchComponent } from './component/crud/crud-search/search.component';
import { FormValidatorService } from './service/dynamic-form/form.validator.service';
import { NavigationService } from './service/navigation/navigation.service';
import { DummyService } from './service/dummy-service/dummy.service';
import { BaseCrudService } from './service/base-crud-service/base.crud.service';
import { ComponentDefService } from './service/component-def-service/component-def.service';
import { FileComponent } from './component/dynamic-form/file/file.component';
import { BasicModalComponent } from './component/crud/basic-modal/basic-modal.component';
import { Datepicker2Component } from './component/dynamic-form/datepicker-2/datepicker-2.component';
import { RestrictionKeysDirective } from './directive/restriction-keys.directive';
import { SpinnerComponent } from './module/spinner/component/spinner.component';
import { SpinnerService } from './module/spinner/service/spinner.service';
import { DialogService } from './service/dialog-service/dialog.service';
import { FileService } from './service/file/file.service';
import { ActionDefService } from './service/action-def-service/action-def.service';
import { HtmlModalComponent } from './component/crud/html-modal/html-modal.component';
import { DisclaimerComponent } from './component/dynamic-form/disclaimer/disclaimer.component';
import { FilterService } from './service/filter-service/filter.service';
import { GridModalComponent } from './component/grid-modal/grid-modal.component';
import { ExpressionService } from './service/expression-service/expression.service';
import { FormGridModalComponent } from './component/form-grid-dialog/form-grid.dialog.component';
import { SanitizeHtmlPipe } from './directive/sanitize-html.pipe';
import { FloatComponent } from './component/dynamic-form/float/float.component';
import { ColorPickerComponent } from './component/color-picker/color-picker.component';
import { TagsComponent } from './component/tags/tags.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ImportImageComponent } from './component/import-image/import-image.component';
import { AppCrudComponent } from './shared/view/crud/app-crud.component';
import { AutocompleteComponent } from './component/autocomplete/autocomplete.component';
import { AutocompleteService } from './component/autocomplete/autocomplete.service';
import { AutocompleteDesplegableComponent } from './component/autocomplete-desplegable/autocomplete-desplegable.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { DatepickerTimeComponent } from './component/dynamic-form/datepicker-time/datepicker-time.component';
import { EditorModule} from '@tinymce/tinymce-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ColorPickerModule,
    RouterModule,
    DpDatePickerModule,
    EditorModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    ColorPickerComponent,
    ImportImageComponent,
    TagsComponent,
    DynamicFormComponent,
    DatepickerComponent,
    Datepicker2Component,
    CrudModalComponent,
    BasicModalComponent,
    CrudTableComponent,
    CrudComponent,
    QuestionModalComponent,
    GridModalComponent,
    PickListComponent,
    SearchComponent,
    FileComponent,
    SpinnerComponent,
    HtmlModalComponent,
    DisclaimerComponent,
    AutocompleteComponent,
    AppCrudComponent,
    FormGridModalComponent,
    FloatComponent,
    AutocompleteDesplegableComponent,
    DatepickerTimeComponent
  ],
  declarations: [
    DynamicFormComponent,
    CrudModalComponent,
    ImportImageComponent,
    BasicModalComponent,
    AutocompleteComponent,
    CrudTableComponent,
    CrudComponent,
    QuestionModalComponent,
    GridModalComponent,
    PickListComponent,
    DatepickerComponent,
    Datepicker2Component,
    SearchComponent,
    FileComponent,
    RestrictionKeysDirective,
    SpinnerComponent,
    HtmlModalComponent,
    DisclaimerComponent,
    SanitizeHtmlPipe,
    AppCrudComponent,
    FormGridModalComponent,
    ColorPickerComponent,
    TagsComponent,
    FloatComponent,
    AutocompleteDesplegableComponent,
    DatepickerTimeComponent,
  ],

  exports: [
    DynamicFormComponent,
    CrudModalComponent,
    ImportImageComponent,
    BasicModalComponent,
    CrudTableComponent,
    AutocompleteComponent,
    CrudComponent,
    QuestionModalComponent,
    GridModalComponent,
    PickListComponent,
    SearchComponent,
    SanitizeHtmlPipe,
    FileComponent,
    CommonModule,
    MaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    SpinnerComponent,
    HtmlModalComponent,
    RouterModule,
    DisclaimerComponent,
    AppCrudComponent,
    FormGridModalComponent,
    ColorPickerComponent,
    TagsComponent,
    FloatComponent,
    AutocompleteDesplegableComponent,
    DatepickerTimeComponent
  ],
  providers: [
    FuseConfigService,
    GenericHttpService,
    DummyService,
    MessageService,
    I18nService,
    CrudDefService,
    FormService,
    FormValidatorService,
    AuthGuardService,
    AuthService,
    GeneralErrorHandlerService,
    ErrorMessageService,
    LocalStorageService,
    NotificationService,
    NavigationService,
    BaseCrudService,
    AutocompleteService,
    ComponentDefService,
    SpinnerService,
    DialogService,
    FileService,
    ActionDefService,
    FilterService,
    ExpressionService,
    {
      provide: ErrorHandler,
      useClass: GeneralErrorHandlerService,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwkInterceptor,
      multi: true,
    },
  ],
})
export class FwkModule { }
