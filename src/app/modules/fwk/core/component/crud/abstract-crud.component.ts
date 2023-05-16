import { Component, OnInit, ViewChild, Directive } from '@angular/core';
import { Entity } from '../../model/entity';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup } from '@angular/forms';
import { Injector } from '@angular/core';
import { Observable ,  Subscription } from 'rxjs';
import { FormService } from '../../service/dynamic-form/form.service';
import { CrudDefService } from '../../service/crud-def-service/crud-def.service';
import { CRUD } from '../../service/crud-service/crud';
import { AbstractComponent } from '../abstract-component.component';
import { GenericHttpService } from '../../service/generic-http-service/generic-http.service';
import { BaseCrudService } from '../../service/base-crud-service/base.crud.service';
import { I18n } from '../../model/i18n';
import { ActionDefService } from '../../service/action-def-service/action-def.service';
import { ExpressionService } from '../../service/expression-service/expression.service';
import { CrudDef } from '../../model/component-def/crud-def';
import { GridDef } from '../../model/component-def/grid-def';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from '../../module/spinner/service/spinner.service';
import * as moment from 'moment';


@Directive()
export  abstract class AbstractCrudComponent<E extends Entity, Service extends CRUD<E>> extends AbstractComponent implements OnInit {
  entity: E;
  entities: E[];
  service: Service;
  formService: FormService;
  crudService: any;
  crudDefService: CrudDefService;
  dataSource = new MatTableDataSource<E>();
  onFieldsChanges: any;
  dialog: MatDialog;
  addForm: FormGroup;
  editForm: FormGroup;
  // Deprecated replaced for componentDef
  crudDef: CrudDef;
  genericHttpService: GenericHttpService;
  filterEntity: any;
  i18nComponent: I18n;
  actionDefService: ActionDefService;
  expressionService: ExpressionService;
  activatedRoute: ActivatedRoute;
  spinnerControl: any;

  constructor(injector: Injector) {
    super(injector);
    this.crudDefService = injector.get(CrudDefService);
    this.formService = injector.get(FormService);
    this.crudService = injector.get(BaseCrudService);
    this.actionDefService = injector.get(ActionDefService);
    this.genericHttpService = injector.get(GenericHttpService);
    this.expressionService = injector.get(ExpressionService);
    this.activatedRoute = injector.get(ActivatedRoute);
    const spinnerService = injector.get(SpinnerService);
    this.spinnerControl = spinnerService.getControlGlobalSpinner();
    
  }

  // DEPRECADO USAR VALIDACION DE SERVICIO SUBMIT View Validations 
  validationAdd(entity: E): Observable<any> {
    const url = this.crudDef.forms.validationAddURL;
    return url ? this.genericHttpService.basicPost(url, entity) : new Observable(o => (o.next(), o.complete()));
  }
  // DEPRECADO USAR VALIDACION DE SERVICIO SUBMIT
  validationEdit(entity: E): Observable<any> {
    const url = this.crudDef.forms.validationEditURL;
    return url ? this.genericHttpService.basicPost(url, entity) : new Observable(o => (o.next(), o.complete()));
  }

  abstract newObjectEntity(): E;
  abstract getCRUDName(): string;

  ngOnInit() {
    super.ngOnInit();
    //
    this.componentDefService.getByName(this.getName()).subscribe(
          def => {
            if (def === null){
              return;
            }
            this.activatedRoute.queryParams.subscribe(params => {
              this.applyParamsToFilter(params, def);
              this.setUpCRUDDef(def); 
            });
          }
    );

    // Deprecated replace for ComponentDefService
    this.getCrudDefService().getByName(this.getCRUDName()).subscribe(
          def => {
            if (def === null){
              return;
            }
            this.activatedRoute.queryParams.subscribe(params => {
              this.applyParamsToFilter(params, def);
              this.setUpCRUDDef(def); 
            });
          }
    );
  }
  applyParamsToFilter(params: any, def: CrudDef) {
    if (def) {
      if (def.formsDef && def.formsDef.filter && def.formsDef.filter.fields) {
        def.formsDef.filter.fields.forEach(f => {
          const value = params[f.key];
          if (value) {
            f.value = value;
          }
        });
      }
      if (def.forms && def.forms.filter) {
        def.forms.filter.forEach(f => {
          const value = params[f.key];
          if (value) {
            f.value = value;
          }
        });
      }
    }
  }
  executeAction(key, successCallback = null){
    const action = this.getActionByKey(key);
    if (action){
      this.actionDefService.submitAction(action, undefined, undefined, undefined).subscribe(r => {
        if (successCallback != null && successCallback){
          successCallback(r);
        }
      });
    }
  }

  getActionByKey(key){
    if (this.crudDef){
      if (this.crudDef.actions){
        return this.crudDef.actions.find(a => a.actionNameKey === key);
      }
    }
  }


  protected setUpCRUDDef(def) {
    this.crudDef = def;
    this.name = def.name;

    if (this.crudDef.forms.filter === undefined){
      this.crudDef.forms.filter = this.crudDef.searchFields;
    }

    if (this.crudDef.formsDef && this.crudDef.formsDef.create && this.crudDef.formsDef.create.fields){
      this.crudDef.forms.create = this.crudDef.formsDef.create.fields;
    }

    if (this.crudDef.forms.create) {
      this.addForm = this.formService.toFormGroup(this.crudDef.forms.create, {}, this.onFieldsChanges);
    } else {
      this.addForm = undefined;
    }
    if (this.crudDef.forms.update) {
      this.editForm = this.formService.toFormGroup(this.crudDef.forms.update, {}, this.onFieldsChanges);
    }
    else {
      this.editForm = undefined;
    }
    /* New implementation */
    const ws = this.crudDef.ws;
    // Si la nueva propiedad no tiene nada asignado agregar la nueva
    if (ws) {
      this.crudService.setBaseURL(ws.url);
      this.service = this.crudService;
    }

    if (this.crudDef.i18n){
      this.i18nService.getByName(this.crudDef.i18n.name).subscribe(
        i18n => {
          if (i18n === null){
            return;
          }
          this.i18nComponent = new I18n();
          this.i18nComponent.clone(i18n);
          if (this.crudDef.grid){
            this.setUpI18nGrid(this.crudDef.grid, this.i18nComponent);
          }
          if (this.crudDef.forms){
            this.setUpI18nForms(this.crudDef.forms, this.i18nComponent);
          }
          this.postSetUpCrud(this.crudDef);
        }
      );
    }
  }

  postSetUpCrud(crudDef){
    
  }

  private setUpI18nForms(forms, i18n){
    if (forms){
      Object.getOwnPropertyNames(forms).forEach(propName => {
        if (forms[propName]){
          if (Array.isArray(forms[propName])){
            forms[propName].forEach(field => {
              field.label = i18n.translate(field.labelKey);

              if (field.required != undefined && (field.required == true || field.required == 'true')) {
                field.label = field.label + ' (*)';
              }

            });
          }
        }
      });
    }
  }
  private setUpI18nGrid(grid: GridDef, i18n){
    if (grid.columnsDef){
      grid.columnsDef.forEach(column => {
        column.columnName = i18n.translate(column.columnNameKey);
      });
    }
    if (grid.actions){
      grid.actions.forEach(action => {
        action.actionName = i18n.translate(action.actionNameKey);
        if (action.form){
          this.formService.setUpFieldTextFromI18n(this.i18nComponent, action.form);
        }
      });
    }
  }
  private initService(){

  }

  findAll() {
    if (!this.crudDef.initSearch) {
      if (this.service) {
        let filterInMemory = true;
        let filter;
        if (this.crudDef){
          if (this.crudDef.filterInMemory !== undefined){
            filterInMemory = this.crudDef.filterInMemory;
          } 
          if (this.crudDef.forms.filter){
            filter = this.crudDef.forms.filter;
          }
        }
        let page: {page: number, pageSize: number};
        if (this.crudDef.filterInMemory == false && this.crudDef.serverPagination == true) {
          page = {
            page:  this.crudDef.pagination.page,
            pageSize: this.crudDef.pagination.pageSize
          };
        }
        this.spinnerControl.show();
        this.service.findAll(this.filterEntity, filter, filterInMemory, page)
        .subscribe(entities => {
                this.entities = entities,
                setTimeout(() => {
                  this.dataSource = new MatTableDataSource<E>(this.entities);

                  this.dataSource.sortingDataAccessor = (item, property) => {
                    var fecha = moment(item[property], 'DD/MM/YYYY');
                    if (fecha.isValid()) {
                      return fecha.format('YYYYMMDD');
                    }
                    if (isNaN(item[property])) {
                      return item[property].toUpperCase();
                    }
                    return item[property];
                  };

                  this.postFindAll();
                  this.dataSource._renderChangesSubscription = new Subscription();
                  this.dataSource._renderChangesSubscription.add(() => {
                    this.spinnerControl.hide();
                  });
                }, 1);
              });
        }
    }
    this.crudDef.initSearch = false;
  }
  postFindAll(){
    
  }
  add(entity: E): Observable<any> {
    if (!entity) {
      return new Observable(o => (o.next(), o.complete()));
    }

    const observable = new Observable(o => {
      this.service.add(entity)
      .subscribe(resultEntity => {
        // this.entities.push(resultEntity);
        this.findAll();
        o.next(resultEntity);
      }, err => o.error(err) , () => o.complete());
    });
    return observable;
  }

  edit(entity: E): Observable<any> {
    if (!entity) {
      return new Observable(o => (o.next(), o.complete()));
    }
    const observable = new Observable(o => {
      this.service.update(entity)
        .subscribe(e => {
          this.entities = this.entities.map(function(item) { return item.id === entity.id ? entity : item; });
          this.findAll();
          o.next(e);
        }, err => o.error(err) , () => o.complete());
    });
    return observable;
  }

  delete(entity: E): void {
    this.entities = this.entities.filter(e => e.id !== entity.id);
    this.service.delete(entity).subscribe();
    this.findAll();
  }

  del(entity: E) {
    this.entities = this.entities.filter(e => e.id !== entity.id);
  }

  deleteAll(entities: E[]): Observable<E> {
    let observable: Observable<E>;
    if(this.crudDef.grid.deleteTernaria == true){
      const columnDefSingleId = this.crudDef.grid.columnsDef.find(c => c.singleId).columnDef;
      const columnDefMultiId = this.crudDef.grid.columnsDef.find(c => c.multiId).columnDef;
      entities.forEach((element) => {
        if (columnDefSingleId){
          element.singleId = element[columnDefSingleId];
        }
        if (columnDefMultiId){
          element.multiId = element[columnDefMultiId];
        } 
      }); 
      observable = new Observable<E>((observer) => {
        this.service.deleteAllTernario(entities, columnDefSingleId, columnDefMultiId).subscribe(response => {
            observer.next(response);
          }, error => {
            observer.error(error);
          }, () => {  
            observer.complete();
          });
      });
    }else{
      const columnDefId = this.crudDef.grid.columnsDef.find(c => c.id)
      entities.forEach((element) => {
        if (columnDefId){
          element.id = element[columnDefId.columnDef];
        }
        this.del(element);
      });
      observable = new Observable<E>((observer) => {
        this.service.deleteAll(entities).subscribe(response => {
            observer.next(response);
          }, error => {
            observer.error(error);
          }, () => {
  
            observer.complete();
          });
      });
    }    
    return observable;
  }

  getValue(element, attribute) {
    return element[attribute];
  }

  getCrudDefService(): CrudDefService {
    return this.crudDefService;
  }

  filterSearchEntity(filterEntity){
    this.filterEntity = filterEntity;
    if (this.crudDef.pagination) {
      this.crudDef.pagination.page = 0;
    }
    this.findAll();
  }

  translate(key: string){
    let word = key; 
    if (this.i18nComponent){
      word = this.i18nComponent.translate(key);
    }
    if (word === key){
      word = super.translate(word);
    }
    return word;
  }
}
