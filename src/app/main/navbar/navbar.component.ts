import { Component, Input, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';


import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { Injector } from '@angular/core';
import { AbstractComponent } from '../../modules/fwk/core/component/abstract-component.component';
import { navigation } from '../../navigation/navigation';
import { NavigationService } from 'app/modules/fwk/core/service/navigation/navigation.service';


@Component({
    selector     : 'fuse-navbar',
    templateUrl  : './navbar.component.html',
    styleUrls    : ['./navbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FuseNavbarComponent extends AbstractComponent implements OnDestroy
{

    private fusePerfectScrollbar: FusePerfectScrollbarDirective;
    onConfigChanged: Subscription;
    fuseSettings: any;

    @ViewChild(FusePerfectScrollbarDirective,{static: false}) set directive(theDirective: FusePerfectScrollbarDirective)
    {
        if ( !theDirective )
        {
            return;
        }

        this.fusePerfectScrollbar = theDirective;

        this.navigationServiceWatcher =
            this.navigationService.onItemCollapseToggled.subscribe(() => {
                this.fusePerfectScrollbarUpdateTimeout = setTimeout(() => {
                    this.fusePerfectScrollbar.update();
                }, 310);
            });
    }

    @Input() layout;
    navigation: any;
    navigationServiceWatcher: Subscription;
    fusePerfectScrollbarUpdateTimeout;

    constructor(
        private sidebarService: FuseSidebarService,
        private navigationService: FuseNavigationService,
        private navService: NavigationService,
        injector: Injector
    )
    {
        super(injector);
        this.setUpI18n(    {
            name: 'navbar',
            lang: 'es',
            dictionary: {
              logo_text: 'Administración',
            }
          });
        this.onConfigChanged =
            this.configService.onConfigChanged
                .subscribe(
                    (newSettings) => {
                        this.fuseSettings = newSettings;
                    }
                );
        navService.onChangeNavigation(nav => {
            this.navigation = nav;
        });
        // Navigation data
        // this.navigation = navigation;

        // Default layout
        this.layout = 'vertical';
    }

    ngOnDestroy()
    {
        if ( this.fusePerfectScrollbarUpdateTimeout )
        {
            clearTimeout(this.fusePerfectScrollbarUpdateTimeout);
        }

        if ( this.navigationServiceWatcher )
        {
            this.navigationServiceWatcher.unsubscribe();
        }

        this.onConfigChanged.unsubscribe();
    }

    toggleSidebarOpened(key)
    {
        this.sidebarService.getSidebar(key).toggleOpen();
    }

    toggleSidebarFolded(key)
    {
        this.sidebarService.getSidebar(key).toggleFold();
    }

    getI18nName(): string {
        return 'navbar';
    }
    onInit() {}
}
