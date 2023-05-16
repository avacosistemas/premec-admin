import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { DashboardComponent } from './dashboard.component';
import { FwkModule } from '../../../modules/fwk/core/fwk.module';




@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports     : [

        TranslateModule,
        FuseSharedModule,
        FwkModule
    ],
    exports     : [
        DashboardComponent
    ]
})

export class DashboardModule
{
}
