import { Injectable } from '@angular/core';
import { I18n } from '../../model/i18n';
import { I18nService } from '../i18n-service/i18n.service';
import { environment } from 'environments/environment';
import { ComponentDef } from '../../model/component-def/component-def';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Observable } from 'rxjs';
import { AuthService } from '../security/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class NavigationService {
    i18n: I18n;
    navigationClone: any;
    navigation: any;
    obserbers: { (obj: any) }[] = [];

    constructor(
        private i18nService: I18nService,
        private localStorageService: LocalStorageService,
        private authService: AuthService,
        private translateService: TranslateService
    ) {
        this.i18nService.getByName('navigation').subscribe(
            i18n => {
                if (i18n) {
                    this.i18n = i18n;
                } else {
                    this.i18n = new I18n();
                }
            },
            e => { }
        );
    }

    onChangeNavigation(observer) {
        this.obserbers.push(observer);
        observer(this.getFilteredNavigation());
    }

    setNavigation(nav) {
        this.navigation = this.localStorageService.clone(nav);
        this.navigationClone = this.localStorageService.clone(nav);
    }

    public setUpByMappingComponent(components: ComponentDef[]) {
        const mapPermissions = (navItems) => {
            if (!navItems) return;
            navItems.forEach(item => {
                if (!item.permission && item.url) {
                    const matchingComponent = components.find(c => c.navigation && c.navigation.url === item.url);
                    if (matchingComponent && matchingComponent.security && matchingComponent.security.readAccess) {
                        item.permission = matchingComponent.security.readAccess;
                    }
                }
                if (item.children) {
                    mapPermissions(item.children);
                }
            });
        };
        mapPermissions(this.navigation);

        this.i18nService.setUpComponentsDef(components).subscribe(() => {

            const translateTitles = (navItems: any[]) => {
                if (!navItems) return;
                for (const item of navItems) {
                    if (item.title) {
                        const translatedTitle = this.translateService.instant(item.title);
                        if (translatedTitle && translatedTitle !== item.title) {
                            item.title = translatedTitle;
                        }
                    }

                    if (item.translate) {
                        const translatedTranslate = this.translateService.instant(item.translate);
                        if (translatedTranslate && translatedTranslate !== item.translate) {
                            item.title = translatedTranslate;
                        }
                    }

                    if (item.children) {
                        translateTitles(item.children);
                    }
                }
            };

            const navToTranslate = this.localStorageService.clone(this.navigation);
            translateTitles(navToTranslate);
            this.navigation = navToTranslate;
            if (this.obserbers) {
                this.obserbers.forEach(obs => {
                    obs(this.getFilteredNavigation());
                });
            }
        });
    }

    private getFilteredNavigation() {
        const navClone = this.localStorageService.clone(this.navigation);
        const filteredByPermission = this.filterByPermission(navClone);
        return this.filterOrphans(filteredByPermission);
    }

    private filterByPermission(navItems: any[]): any[] {
        if (!navItems) {
            return [];
        }

        return navItems.filter(item => {
            if (item.children) {
                item.children = this.filterByPermission(item.children);
            }
            return !item.permission || this.authService.hasPermission(item.permission);
        });
    }

    private addToNavigation(element, path = null) {
        if (path && path !== null) {
            let splitted = path.split('/');
            let find = false;
            let subelement;
            let count = 1;
            while (!find && splitted.length > count) {
                const currentSubEl = splitted[count];
                count++;
                subelement = this.navigation.find(el => {
                    return el.id === currentSubEl;
                });
                if (subelement && count === splitted.length) {
                    find = true;
                }
            }
            if (subelement) {
                if (subelement.children) {
                    subelement.children.push(element);
                } else {
                    subelement.children = [element];
                }
            } else if (subelement === undefined) {
                console.warn('No se encontro elemento de navegacion con el path ' + path);
            }
        } else {
            this.navigation.push(element);
        }
    }

    private existKeyUrlInNavigationConf(element, elementNavigation = null) {
        if (elementNavigation === null) {
            const exist = this.navigation.find(subElementNavigation => {
                return this.existKeyUrlInNavigationConf(element, subElementNavigation);
            });
            return exist;
        } else if (elementNavigation === undefined) {
            return false;
        } else if (elementNavigation.id === element.id) {
            return true;
        } else {
            if (elementNavigation['children'] && elementNavigation['children'].length > 0) {
                const exist = elementNavigation['children'].find(subElementNavigation => {
                    return this.existKeyUrlInNavigationConf(element, subElementNavigation);
                });
                if (exist) {
                    return exist;
                }
            }
            return false;
        }
    }

    removeNavigation(navDef) {
        if (this.remove(this.navigation, navDef)) {
            this.navigation = this.filterOrphans(this.navigation);
        }
    }

    private filterOrphans(obj) {
        if (!obj) { return []; }
        return obj.filter(el => {
            let filter = false;
            if (el.type === 'item') {
                filter = true;
            } else if (el.children) {
                if (el.children.length === 0) {
                    filter = false;
                } else {
                    const visibleChildren = this.filterOrphans(el.children);
                    filter = visibleChildren.length > 0;
                }
            }
            return filter;
        });
    }

    private remove(obj: any[], navDef) {
        let removed = false;
        for (let i = 0; i < obj.length && !removed; i++) {
            const el = obj[i];
            if (el.id === navDef.id) {
                obj.splice(i, 1);
                removed = true;
            }
            if (el.children) {
                if (Array.isArray(el.children)) {
                    removed = this.remove(el.children, navDef);
                    if (removed && el.children.length === 0) {
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
    cleanNavDef(navDef) {
        if (navDef.type === undefined) {
            navDef.type = 'item';
        }
    }
}

