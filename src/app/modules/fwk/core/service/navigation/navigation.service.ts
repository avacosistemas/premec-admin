import { Injectable } from '@angular/core';
import { I18n } from '../../model/i18n';
import { I18nService } from '../i18n-service/i18n.service';
import { environment } from 'environments/environment';
import { ComponentDef } from '../../model/component-def/component-def';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Observable } from 'rxjs';

@Injectable()
export class NavigationService {
  i18n: I18n;
  navigationClone: any;
  navigation: any;
  obserbers: {(obj: any)} [] = [];
  constructor(private i18nService: I18nService, private localStorageService: LocalStorageService) {
    this.i18nService.getByName('navigation').subscribe(
      i18n => {
                if (i18n){
                  this.i18n = i18n;
                }else{
                  this.i18n = new I18n();
                }
              },
      e => {}
    );
  }

  onChangeNavigation(observer) {
    this.obserbers.push(observer);
    // this.removeOrphans(this.navigation);
    observer(this.filterOrphans(this.navigation));
  }

  setNavigation(nav) {
    this.navigation = this.localStorageService.clone(nav);
    this.navigationClone = this.localStorageService.clone(nav);
  }

  public setUpByMappingComponent(components: ComponentDef[]){
    Object.getOwnPropertyNames(this.navigationClone).forEach(name => {
        this.navigation[name] = this.navigationClone[name];
    });
    components.forEach(component => {
        this.i18nService.getByName(component.i18n.name).subscribe(
            i18n => {
                if (component.navigation){

                    if (component.navigation.translateKey){
                        component.navigation.translate = i18n.translate(component.navigation.translateKey);
                    }
                }
                if (this.obserbers) {
                    this.obserbers.forEach(obs => {
                        obs(this.filterOrphans(this.navigation));
                    });
                }
            },
            e => {}
        );  
    });
  }

private addToNavigation(element, path = null){
    if (path && path !== null){
        let splitted = path.split('/');
        let find = false;
        let subelement;
        let count = 1;
        while (!find && splitted.length > count){
            const currentSubEl = splitted[count];
            count++;
            subelement = this.navigation.find(el => {
                return el.id === currentSubEl;
            });
            if (subelement && count === splitted.length){
                find = true;
            }
        }
        if (subelement){
            if (subelement.children){
                subelement.children.push(element);
            }else{
                subelement.children = [element];
            }
        }else if (subelement === undefined){
            console.warn('No se encontro elemento de navegacion con el path ' + path);
        }
    } else{
        this.navigation.push(element);
    }
  }

  private existKeyUrlInNavigationConf(element, elementNavigation = null){
      if (elementNavigation === null){
          const exist = this.navigation.find(subElementNavigation => {
              return this.existKeyUrlInNavigationConf(element, subElementNavigation);
          });
          return exist;
      }else if (elementNavigation === undefined){
          return false;
      }else if (elementNavigation.id === element.id){
          return true;
      }else{
          if (elementNavigation['children'] && elementNavigation['children'].length > 0){
              const exist = elementNavigation['children'].find(subElementNavigation => {
                  return this.existKeyUrlInNavigationConf(element, subElementNavigation);
              });
              if (exist){
                  return exist;
              }
          }
          return false;
      }
  }
  removeNavigation(navDef){
    if (this.remove(this.navigation, navDef)){
        this.navigation = this.filterOrphans(this.navigation);
    }
  }
  private filterOrphans(obj){
    return obj.filter(el => {
        let filter = false;
        if (el.type === 'item'){
            filter = true;
        }else if (el.children){
            if (el.children.length === 0){
                filter = false;
            }else{
                const filters = this.filterOrphans(el.children);
                filter = filters.length !== 0;
            }
        }
        return filter;
    });
  }

  private remove(obj: any[], navDef){
    let removed = false;
    for (let i = 0; i < obj.length && !removed; i++){
        const el = obj[i];
        if (el.id === navDef.id){
            obj = obj.splice(i, 1);
            removed = true;
        }
        if (el.children){
            if (Array.isArray(el.children)){
                removed = this.remove(el.children, navDef);
                if (removed && el.children.length === 0){
                    el.children = undefined;
                }
            }
        }
    }
    return removed;
  }
//   addNavigation(navDef, security){
//     this.cleanNavDef(navDef);
//     console.warn('agregar logica de seguridad al menu y url');
//     // if (this.i18n){
//     //   this.addInNavigation(navDef, this.i18n);
//     // }else{
//     //   const controler = this;
//     //   setTimeout(function () {
//     //     controler.addNavigation(navDef, security);
//     //   }, 1000 / 60);
//     // }
//   }
  cleanNavDef(navDef){
      if (navDef.type === undefined){
        navDef.type = 'item';
      }
  }
}

