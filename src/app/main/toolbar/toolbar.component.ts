import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { Injector } from '@angular/core';
import { AbstractComponent } from '../../modules/fwk/core/component/abstract-component.component';
import { environment } from 'environments/environment';
import { AuthService } from '../../modules/fwk/core/service/security/auth.service';
import { User } from '../../modules/fwk/core/model/user';
import { SpinnerService } from '../../modules/fwk/core/module/spinner/service/spinner.service';
import { DialogService } from '../../modules/fwk/core/service/dialog-service/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { GenericHttpService } from '../../modules/fwk/core/service/generic-http-service/generic-http.service';
import { LocalStorageService } from '../../modules/fwk/core/service/local-storage/local-storage.service';
import { HTTP_METHODS } from '../../modules/fwk/core/model/ws-def';
import { CrudComponent } from 'app/modules/fwk/core/component/crud/crud.component';
import { Subscription } from 'rxjs';

@Component({
    selector   : 'fuse-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls  : ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FuseToolbarComponent extends CrudComponent implements OnInit, OnDestroy
{

    userStatusOptions: any[];
    languages: any;
    selectedLanguage: any;
    showLoadingBar: boolean;
    horizontalNav: boolean;
    noNav: boolean;
    pageTitle: any;
    urls: any;
    user: User;
    userDetailUrl: string;
    spinnerControl: any;
    componentDegSubscription: Subscription;
    constructor(
        dialog: MatDialog,
        dialogService: DialogService,
        private spinnerService: SpinnerService,
        genericHttpService: GenericHttpService,
        localStorage: LocalStorageService,
        private sidebarService: FuseSidebarService,
        private translateFuse: TranslateService,
        private authService: AuthService,
        injector: Injector,
        configService: FuseConfigService,
        activatedRoute: ActivatedRoute
    )
    {
        // super(injector);
        super(configService, dialog, localStorage, injector);
        this.setUpI18n(    {
            name: 'toolbar',
            lang: 'es',
            dictionary: {
                menu_text: 'sort',
                menu_user_icon: 'account_circle',
                menu_user_item_1: 'Mis Datos',
                menu_user_item_4: 'Cambiar contraseña',
                menu_user_item_5: 'Cerrar sesión',
                
            }
          });
        this.userStatusOptions = [
            {
                'title': 'Online',
                'icon' : 'icon-checkbox-marked-circle',
                'color': '#4CAF50'
            },
            {
                'title': 'Away',
                'icon' : 'icon-clock',
                'color': '#FFC107'
            },
            {
                'title': 'Do not Disturb',
                'icon' : 'icon-minus-circle',
                'color': '#F44336'
            },
            {
                'title': 'Invisible',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#BDBDBD'
            },
            {
                'title': 'Offline',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#616161'
            }
        ];

        this.languages = [
            {
                'id'   : 'es',
                'title': 'Spanish',
                'flag' : 'es'
            }
        ];

        this.selectedLanguage = this.languages[0];

        this.router.events.subscribe(
            (event) => {
                if ( event instanceof NavigationStart )
                {
                    this.showLoadingBar = true;
                }
                if ( event instanceof NavigationEnd )
                {
                    this.showLoadingBar = false;
                }
            });

        this.configService.onConfigChanged.subscribe((settings) => {
            this.horizontalNav = settings.layout.navigation === 'top';
            this.noNav = settings.layout.navigation === 'none';
        });
        this.urls = environment;
        this.spinnerControl = this.spinnerService.getControlGlobalSpinner();
        this.user = new User();
        // this.authService.subscribeChangeUser((user) => {
        //     this.user = user;
        // });
        this.componentDegSubscription = this.componentDefService.componentDefObs$.subscribe(data => {
            console.log(data);
            this.componentDefService.getByName(data.name).subscribe(
                def => {
                  if (def === null){
                    return;
                  }
                    this.setUpCRUDDef(def); 
                }
            );
        });
    }

    toggleSidebarOpened(key)
    {
        this.sidebarService.getSidebar(key).toggleOpen();
    }

    search(value)
    {
        // Do your search here...
        console.log(value);
    }

    ngOnDestroy() {
        this.componentDegSubscription.unsubscribe();
    }

    setLanguage(lang)
    {
        // Set the selected language for toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this.translateFuse.use(lang.id);
    }

    getUsername(){
        if (this.user){
            return this.user.username;
        }
        return '';
    }

    onLogout(){
        this.authService.logout();
    }

    goUserDetails(){
        // this.navigate(environment.URL_CLIENTE_DETAIL, undefined);
        this.showDialogProfile();
    }
    
    showDialogProfile(){
        this.spinnerControl.show();
        this.componentDefService.getByName('usuario_user_detail_definition').subscribe(componentDef => {
            if (componentDef.ws){
                const wsDef = localStorage.clone(componentDef.ws);
                wsDef.method = HTTP_METHODS.get;
                this.genericHttpService.callWs(wsDef).subscribe(userdata => {      
                    console.log(userdata);              
                    this.spinnerControl.hide();
                    const dialogRef = this.dialogService.showFormDialog(this.dialog, 
                                                                           componentDef.i18n,
                                                                                componentDef.formsDef.update, 
                                                                                    {width: '470px'},
                                                                                        userdata[0]);
                });
            }
        });
    }

    getI18nName(): string {
        return 'toolbar';
    }
    // onInit() {
    // }
    getParentTitle(){
        var title = '';
        this.activatedRoute.queryParams.subscribe(params => {
           if (params && params.parentTitle) {
            title = params.parentTitle;
           }
        });
        return title ? " - " + title : '';
    }
}
