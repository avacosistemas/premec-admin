import { Injectable } from '@angular/core';
import { Observable ,  Subject } from 'rxjs';
import { CrudDef } from '../../model/component-def/crud-def';
import { COMPONENTS } from '../../../../../main/content/pages/integration.components';
import { I18nService } from '../i18n-service/i18n.service';
import { FormService } from '../dynamic-form/form.service';
import { FormsDef } from '../../model/component-def/form-def';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { navigation } from '../../../../../navigation/navigation';
import { ComponentDef } from '../../model/component-def/component-def';
import { ToolbarComponentDef } from '../../model/component-def/toolbar-comp-def';
import { componentFactoryName } from '@angular/compiler';

@Injectable()
export class ComponentDefService{
  charged = {};
  originalComps: any;
  copyComps: any;
  componentDefObs = new Subject<any>();
  componentDefObs$ = this.componentDefObs.asObservable();
  constructor(private i18nService: I18nService,
              private localStorageService: LocalStorageService,
              private formService: FormService) {
  }

  create(componentDef){
    this.componentDefObs.next(componentDef);
    this.getByName(componentDef.name).subscribe(r => {
        if (r === null || r === undefined){
            COMPONENTS.push(componentDef);
        }else{
            console.warn('component def exist');
        }
    });
  }
  getComponentDefByUrl(url){
    const components = this.getComponents();
    if (components){
        return components.find(c => c.navigation ? c.navigation.url === url : false);
    }
    return undefined;
  }
  // tslint:disable-next-line:no-shadowed-variable
   getByName(crudName: string): Observable<CrudDef> {
    const obs = new Observable<any>((observer) => {
        if (crudName){
            const charged = this.charged[crudName];
            if (charged){
                observer.next(this.localStorageService.clone(charged)); 
            }else{
                const componentDef: any = this.dummy(crudName);
                if (charged === undefined && componentDef && componentDef !== null){
                    if (componentDef.i18n){
                        this.i18nService.getByName(componentDef.i18n.name).subscribe(i18n => {
                            componentDef.i18n = i18n;
                            this.setUpkeysi18n(componentDef);
                            this.setUpUrls(componentDef);
                            this.setToolbarData(componentDef);
                            this.charged[crudName] = componentDef;
                            observer.next(this.localStorageService.clone(this.charged[crudName]));      
                        });
                    }else{
                        this.charged[crudName] = componentDef;
                    }
                }else{
                    observer.next(componentDef);      
                }
            }
        }else{
            observer.next(null);      
        }
    });
    return obs;
  }
    setToolbarData(componentDef: ToolbarComponentDef): any {
        if (componentDef.contextMenu){
            componentDef.contextMenu.forEach(ctx => {
                if (ctx.labelKey){
                    ctx.label = componentDef.i18n.translate(ctx.labelKey);
                }
            });
        }
    }

    setUpUrls(componentDef: ComponentDef): any {
        if (componentDef.ws){
            const ws = componentDef.ws;
            ws.url = ws.url;
        }
    }

  getUrlNavById(id){
    let url;
    let i = 0;
    const length = navigation.length;
    while (url === undefined && i < length){
        url = this.getUrlNavByIdAndObj(id, navigation[i]);
        i++;
    }
    return url;
  }

  private getUrlNavByIdAndObj(id, nav){
    let url;
    if (nav.id === id){
        url = nav.url;
    }else{
        if (nav.children){
            const length = nav.children.length;
            let i = 0;
            while (url === undefined && i < length){
                url = this.getUrlNavByIdAndObj(id, nav.children[i]);
                i++;
            }
        }
    }
    return url;
  }

  getComponents(){
      return this.localStorageService.clone(this.copyComps);
  }

  setComponentUser(components){
    this.originalComps = components;
    this.resetComponent();
    this.charged = {};
  }

  resetComponent(){
      if (this.originalComps){
        this.copyComps = this.localStorageService.clone(this.originalComps);
      }else{
        this.copyComps = this.originalComps;
      }
      
  }
  private setUpkeysi18n(componentDef: CrudDef){
    if (componentDef.formsDef){
        this.setUpkeysi18nOfFormsDef(componentDef.i18n, componentDef.formsDef);
    }

    if (componentDef.actions){
        this.formService.setUpActionsFromI18n(componentDef.i18n, componentDef.actions);
    }

    if (componentDef.dialogs){
        this.formService.setUpDialogsFromI18n(componentDef.i18n, componentDef.dialogs);   
    }
    if (componentDef.forms){
        this.formService.setUpFieldTextFromI18n(componentDef.i18n, componentDef.forms.create);
        this.formService.setUpFieldTextFromI18n(componentDef.i18n, componentDef.forms.filter);
        this.formService.setUpFieldTextFromI18n(componentDef.i18n, componentDef.forms.read);
        this.formService.setUpFieldTextFromI18n(componentDef.i18n, componentDef.forms.update);
        this.formService.setUpBehaviorTextFromI18n(componentDef.i18n, componentDef.forms.updateBehavior);        
        this.formService.setUpBehaviorTextFromI18n(componentDef.i18n, componentDef.forms.createBehavior);        
        this.formService.setUpBehaviorTextFromI18n(componentDef.i18n, componentDef.forms.updateBehavior);        
    }
    if (componentDef.grid){
        this.formService.setUpkeysi18nOfGrid(componentDef.i18n, componentDef.grid);
    }
    if (componentDef.crudActions){
        this.formService.setUpActionsFromI18n(componentDef.i18n, componentDef.crudActions);
    }

  }


  private setUpkeysi18nOfFormsDef(i18n, formsDef: FormsDef){
      this.formService.setUpFormDef(i18n, formsDef.create);
      this.formService.setUpFormDef(i18n, formsDef.update);
      this.formService.setUpFormDef(i18n, formsDef.filter);
      this.formService.setUpFormDef(i18n, formsDef.read);
  }
  dummy(byName) {
    if (this.copyComps){
        for (let i = 0; i < this.copyComps.length; i++) {
            let e;
            e = this.copyComps[i];
            if (e.name === byName) {
                return this.localStorageService.clone(e);
            }
        }
    }
    return null;
  }
}
