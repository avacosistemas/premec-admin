import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseToolbarComponent } from 'app/main/toolbar/toolbar.component';
import { FuseSearchBarModule, FuseShortcutsModule } from '@fuse/components';
import { BackButtonComponent } from 'app/modules/fwk/core/component/back-button/backbutton.component';

@NgModule({
    declarations: [
        FuseToolbarComponent,
        BackButtonComponent
    ],
    imports     : [
        RouterModule,

        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatToolbarModule,

        FuseSharedModule,
        FuseSearchBarModule,
        FuseShortcutsModule,
    ],
    exports     : [
        FuseToolbarComponent
    ],
    entryComponents: [BackButtonComponent]
})
export class FuseToolbarModule
{
}
