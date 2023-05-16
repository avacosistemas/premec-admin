import { OnInit, Component, Injector, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { AbstractComponent } from '../../abstract-component.component';
import { DynamicField } from '../../../model/dynamic-form/dynamic-field';
import { FormGroup, NgForm } from '@angular/forms';
import { DynamicFormComponent } from '../../dynamic-form/dynamic-form.component';
import { MatButton } from '@angular/material/button';
import { DialogService } from '../../../service/dialog-service/dialog.service';
import { LocalStorageService } from '../../../service/local-storage/local-storage.service';
import { FormService } from '../../../service/dynamic-form/form.service';
import { CrudDef } from '../../../model/component-def/crud-def';


const SEARCH_COMPONENT = 'search-component';
const I18N_SEARCH_COMPONENT = {
  name: SEARCH_COMPONENT,
  lang: 'es',
  dictionary: {
    search_title: 'Filtrar',
    search_submit: 'buscar',
    search_modal_title: 'Otros filtros',
    custom_modal_button_confirm: 'Filtrar'
  }
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends AbstractComponent implements OnInit {

  @Input()
  title: string;
  @Input()
  description: string;
  @Input()
  forceFirstSubmit: boolean;
  firstSubmitForced: boolean;
  @Input()
  fields: DynamicField<any>[];
  @Input() crudDef: CrudDef;
  cacheFields: DynamicField<any>[];
  @Output()
  onChangeSearchEntity =  new EventEmitter(true);
  form: FormGroup;
  entity: any;
  @ViewChild('ngformElement',{static: false})
  ngFormElement: NgForm;
  dialogService: DialogService;
  generalField: DynamicField<any>[];
  generalFields: DynamicField<any>[];
  localStorageService: LocalStorageService;
  fieldsOptions: DynamicField<any>[];
  constructor(private injector: Injector, private formService: FormService){
    super(injector);
    this.setUpI18n(I18N_SEARCH_COMPONENT);
    this.dialogService = injector.get(DialogService);
    this.localStorageService = injector.get(LocalStorageService);
  }

  getI18nName(): string {
    return SEARCH_COMPONENT;
  }  
  onInit() {
    this.form = new FormGroup({});
    this.reInit();
  }
  private reInit() {
    this.entity = {};
    this.resetCacheFields();
    this.generalField = this.getGeneralField(this.cacheFields);
    if (this.generalField != undefined) {
      this.generalFields = this.generalField;
    } else {
      this.generalFields = undefined;
    }
    this.fieldsOptions = this.cacheFields.filter(f => {
      if (f.options){
        if (f.options.baseFilter){
          return false;
        }
      }
      return true;
    });
    if (this.title) {
      this.title = this.translate('search_title');
    }
    this.entity = this.formService.getEntityFromFields(this.cacheFields);
    if (this.forceFirstSubmit != null && this.forceFirstSubmit && this.firstSubmitForced === undefined) {
      if (!this.crudDef.cancelInitSearch || this.userChangeOptions())
        setTimeout(() => {
          this.onSubmitSearch();
        }, 1);
    }
  }

  resetCacheFields(): any {
    this.cacheFields = this.localStorageService.clone(this.fields);
  }
  getGeneralField(fields: DynamicField<any>[]): any {
    const filtered = fields.filter(f => {
        if (f.options){
          if (f.options.baseFilter){
            return true;
          }
        }
        return false;
    });
    let fieldx;
    if (filtered && filtered.length > 0){
      fieldx = filtered[0];
    }else{
      // field = fields[0];
      fields.forEach(field => {
        if (field !== undefined) {
          if (field.options === undefined){
            field.options = {};
          }
          field.options.baseFilter = true;
        }
      });
    }
    return fields;
  }

  onChangeEntity(entity){
    Object.getOwnPropertyNames(entity).forEach((val, idx) => {
      this.entity[val] = entity[val];
    });
    //if (this.forceFirstSubmit != null && this.forceFirstSubmit && this.firstSubmitForced === undefined){
    //  this.onSubmitSearch();
    //  this.firstSubmitForced = true;
    //}
  }

  clearForm() {
    this.reInit();
    const form: any = this.form.controls['subForm'];
    this.generalFields.forEach(f => {
      this.formService.patchField(f.key, f.value, form);
    });
  }

  onSubmitSearch(){
    this.onChangeSearchEntity.emit(this.entity);
  }

  submitOnEnter(value){
    if (this.form.valid && value.keyCode === 13){
      this.onSubmitSearch();
    }
  }
  hasOptions(){
    return this.fieldsOptions && this.fieldsOptions.length > 0 ? true : false;
  }

  userChangeOptions() {
    if (this.fieldsOptions && this.entity) {
      const fieldsChanges = this.fieldsOptions.filter(field => this.entity[field.key] !== undefined && this.entity[field.key] !== '' && this.entity[field.key] !== null);
      return fieldsChanges.length > 0;
    }
    return false;
  }

  openOptions(){
    const formDef = {
      key: 'searchOptions',
      fields: this.fieldsOptions
    };
    const submitObj = { 
      component: this,
      onSubmitModal(entity, dialogDef) {
        submitObj.component.onChangeEntity(entity);
        submitObj.component.onSubmitSearch();
        dialogDef.close();
      }
    };
    this.dialogService.showFormDialogCustomSubmit(this.i18n, formDef, undefined, submitObj, undefined, this.translate('search_modal_title'));
  }
}
