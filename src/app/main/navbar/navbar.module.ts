import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseNavbarComponent } from './navbar.component';
import { FuseNavigationModule } from '@fuse/components';

@NgModule({
    declarations: [
        FuseNavbarComponent
    ],
    imports     : [
        RouterModule,

        MatButtonModule,
        MatIconModule,

        FuseSharedModule,
        FuseNavigationModule
    ],
    exports     : [
        FuseNavbarComponent
    ]
})
export class FuseNavbarModule
{
}
