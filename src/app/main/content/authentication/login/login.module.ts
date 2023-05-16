import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { FwkModule } from 'app/modules/fwk/core/fwk.module';



@NgModule({
    declarations: [LoginComponent],
    entryComponents: [LoginComponent],
    exports: [LoginComponent],
    imports     : [
        FuseSharedModule,
        FwkModule
    ]
})
export class LoginModule {
}
