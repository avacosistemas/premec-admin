import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { PasswordUpdateComponent } from './password-update.component';
import { environment } from 'environments/environment';
import { FuseSharedModule } from '@fuse/shared.module';
import { FwkModule } from 'app/modules/fwk/core/fwk.module';


@NgModule({
    declarations: [PasswordUpdateComponent],
    entryComponents: [PasswordUpdateComponent],
    exports: [PasswordUpdateComponent],
    imports     : [
        FuseSharedModule,
        FwkModule
    ]
})
export class PasswordUpdateModule {
}
