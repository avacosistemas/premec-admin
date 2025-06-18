import { Component, OnDestroy, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { Injector } from '@angular/core';
import { environment } from 'environments/environment';
import { AuthService } from '../../modules/fwk/core/service/security/auth.service';
import { User } from '../../modules/fwk/core/model/user';
import { SpinnerService } from '../../modules/fwk/core/module/spinner/service/spinner.service';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from '../../modules/fwk/core/service/local-storage/local-storage.service';
import { HTTP_METHODS } from '../../modules/fwk/core/model/ws-def';
import { CrudComponent } from 'app/modules/fwk/core/component/crud/crud.component';
import { Observable, of, Subscription } from 'rxjs';
import { PageTitleService } from '../../modules/fwk/core/service/page-title.service';
import JwtDecode from 'jwt-decode';
import { filter, map, startWith, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'fuse-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuseToolbarComponent extends CrudComponent implements OnInit, OnDestroy {
    userStatusOptions: any[];
    languages: any;
    selectedLanguage: any;
    showLoadingBar: boolean;
    horizontalNav: boolean;
    noNav: boolean;

    pageTitle$: Observable<string>;
    parentTitle$: Observable<string>;

    public crudDef$: Observable<any>;

    urls: any;
    user: User;
    userDetailUrl: string;
    spinnerControl: any;

    constructor(
        dialog: MatDialog,
        private spinnerService: SpinnerService,
        localStorageService: LocalStorageService,
        private sidebarService: FuseSidebarService,
        private translateFuse: TranslateService,
        private authService: AuthService,
        injector: Injector,
        configService: FuseConfigService,
        private titleService: PageTitleService,
        public router: Router,
        private changeDetectorRef: ChangeDetectorRef,
    ) {
        super(configService, dialog, localStorageService, injector);

        this.setUpI18n({
            name: 'toolbar',
            lang: 'es',
            dictionary: {
                menu_text: 'sort',
                menu_user_icon: 'account_circle',
                menu_user_item_1: 'Mis Datos',
                menu_user_item_4: 'Cambiar contraseña',
                menu_user_item_5: 'Cerrar sesión',
                'page_title_default': 'Aplicación',
            }
        });
        this.userStatusOptions = [
            {
                'title': 'Online',
                'icon': 'icon-checkbox-marked-circle',
                'color': '#4CAF50'
            },
            {
                'title': 'Away',
                'icon': 'icon-clock',
                'color': '#FFC107'
            },
            {
                'title': 'Do not Disturb',
                'icon': 'icon-minus-circle',
                'color': '#F44336'
            },
            {
                'title': 'Invisible',
                'icon': 'icon-checkbox-blank-circle-outline',
                'color': '#BDBDBD'
            },
            {
                'title': 'Offline',
                'icon': 'icon-checkbox-blank-circle-outline',
                'color': '#616161'
            }
        ];

        this.languages = [
            {
                'id': 'es',
                'title': 'Spanish',
                'flag': 'es'
            }
        ];

        this.selectedLanguage = this.languages[0];

        this.router.events.subscribe(
            (event) => {
                if (event instanceof NavigationStart) {
                    this.showLoadingBar = true;
                }
                if (event instanceof NavigationEnd) {
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

        this.crudDef$ = this.componentDefService.componentDefObs$.pipe(
            distinctUntilChanged((prev, curr) => prev?.name === curr?.name),
            switchMap(data => {
                if (!data || !data.name) {
                    return of(undefined);
                }
                return this.componentDefService.getByName(data.name).pipe(
                    tap(def => {
                        if (def) {
                            this.setUpCRUDDef(def);
                        }
                    }),
                    startWith(undefined)
                );
            }),
            distinctUntilChanged((prev, curr) => prev?.name === curr?.name && prev?.backButton === curr?.backButton),
            startWith(undefined)
        );
    }

    onChangePassword(): void {
        this.router.navigate(['/auth/password-update']);
    }

    toggleSidebarOpened(key: string): void {
        this.sidebarService.getSidebar(key).toggleOpen();
    }

    search(value: any): void {
    }

    ngOnInit(): void {
        super.ngOnInit();

        this.pageTitle$ = this.titleService.currentTitle$;

        this.parentTitle$ = this.activatedRoute.queryParams.pipe(
            map(params => (params && params.parentTitle) ? " - " + params.parentTitle : ''),
            startWith('')
        );
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    setLanguage(lang: any): void {
        this.selectedLanguage = lang;
        this.translateFuse.use(lang.id);
    }

    getUsername(): string {
        interface JwtPayload {
            sub: string;
            exp: number;
            iat: number;
        }

        const token = this.localStorageService.getTokenData();
        if (token) {
            try {
                const decoded = JwtDecode<JwtPayload>(token);
                return decoded.sub;
            } catch (e) {
                console.error('Error decoding JWT token:', e);
            }
        }

        if (this.user && this.user.username) {
            return this.user.username;
        }
        return '';
    }

    onLogout(): void {
        this.authService.logout();
    }

    goUserDetails(): void {
        this.showDialogProfile();
    }

    showDialogProfile(): void {
        this.spinnerControl.show();
        this.componentDefService.getByName('usuario_user_detail_definition').subscribe(componentDef => {
            if (componentDef.ws) {
                const wsDef = this.localStorageService.clone(componentDef.ws);
                wsDef.method = HTTP_METHODS.get;
                this.genericHttpService.callWs(wsDef).subscribe(userdata => {
                    this.spinnerControl.hide();
                    const dialogRef = this.dialogService.showFormDialog(this.dialog,
                        componentDef.i18n,
                        componentDef.formsDef.update,
                        { width: '470px' },
                        userdata[0]);
                });
            }
        });
    }

    getI18nName(): string {
        return 'toolbar';
    }
}