import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PasswordUpdateComponent } from './password-update.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { FwkModule } from 'app/modules/fwk/core/fwk.module';


@NgModule({
    declarations: [PasswordUpdateComponent],
    exports: [PasswordUpdateComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FuseSharedModule,
        FwkModule
    ]
})
export class PasswordUpdateModule {
}