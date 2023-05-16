import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseContentComponent } from 'app/main/content/content.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseThemeOptionsModule, FuseNavigationModule, FuseSearchBarModule, FuseShortcutsModule, FuseSidebarModule } from '@fuse/components';
import { FuseFooterModule } from '../footer/footer.module';
import { FuseNavbarModule } from '../navbar/navbar.module';
import { FuseQuickPanelModule } from '../quick-panel/quick-panel.module';
import { FuseToolbarModule } from '../toolbar/toolbar.module';
import { LoginModule } from './authentication/login/login.module';
import { IntegrationModule } from './integration/integration.module';
import { UploadComponent } from './upload/upload.component';
import { UploadService } from './upload/upload.service';

@NgModule({
    declarations: [
        FuseContentComponent,
        UploadComponent
    ],
    imports     : [
        RouterModule,
        FuseSharedModule,
        RouterModule,
        MatSidenavModule,
        FuseThemeOptionsModule,
        FuseNavigationModule,
        FuseSearchBarModule,
        FuseShortcutsModule,
        FuseSidebarModule,
        FuseFooterModule,
        FuseNavbarModule,
        FuseQuickPanelModule,
        FuseToolbarModule,
        LoginModule,
        IntegrationModule,
        MatCardModule,
        MatProgressBarModule,
        MatDividerModule
    ],
    exports: [
        FuseContentComponent
    ],
    providers: [UploadService]
})
export class FuseContentModule
{
}
