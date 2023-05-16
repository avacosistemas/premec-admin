import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseQuickPanelComponent } from 'app/main/quick-panel/quick-panel.component';

@NgModule({
    declarations: [
        FuseQuickPanelComponent
    ],
    imports     : [
        RouterModule,

        MatDividerModule,
        MatListModule,
        MatSlideToggleModule,

        FuseSharedModule,
    ],
    exports: [
        FuseQuickPanelComponent
    ]
})
export class FuseQuickPanelModule
{
}
