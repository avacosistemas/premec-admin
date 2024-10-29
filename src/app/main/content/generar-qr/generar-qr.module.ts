import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { GenerarQrComponent } from './generar-qr.component';
import { FwkModule } from '../../../modules/fwk/core/fwk.module';


@NgModule({
    declarations: [
        GenerarQrComponent
    ],
    imports: [
        FuseSharedModule,
        FwkModule,
    ],
    exports: [
        GenerarQrComponent
    ]
})

export class GenerarQrModule {
}
