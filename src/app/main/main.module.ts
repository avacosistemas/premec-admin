import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseNavigationModule, FuseSearchBarModule, FuseShortcutsModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { FuseContentModule } from './content/content.module';
import { FuseFooterModule } from './footer/footer.module';
import { FuseNavbarModule } from './navbar/navbar.module';
import { FuseQuickPanelModule } from './quick-panel/quick-panel.module';
import { FuseToolbarModule } from './toolbar/toolbar.module';

import { FuseMainComponent } from './main.component';

@NgModule({
    declarations: [
        FuseMainComponent,
    ],
    imports     : [
        RouterModule,

        MatSidenavModule,

        FuseSharedModule,

        FuseThemeOptionsModule,
        FuseNavigationModule,
        FuseSearchBarModule,
        FuseShortcutsModule,
        FuseSidebarModule,

        FuseContentModule,
        FuseFooterModule,
        FuseNavbarModule,
        FuseQuickPanelModule,
        FuseToolbarModule
    ],
    exports     : [
        FuseMainComponent,
        RouterModule
    ]
})
export class FuseMainModule
{
}
