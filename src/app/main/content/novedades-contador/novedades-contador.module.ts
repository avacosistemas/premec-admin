import { NgModule } from '@angular/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { FwkModule } from 'app/modules/fwk/core/fwk.module';
import { NovedadesContadorComponent } from './novedades-contador.component';
import { NovedadesContadorService } from './novedades-contador.service';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
    declarations: [
        NovedadesContadorComponent
    ],
    imports: [
        FuseSharedModule,
        FwkModule,
        MatTableModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatTabsModule
    ],
    exports: [
        NovedadesContadorComponent
    ],
    providers: [
        NovedadesContadorService,
    ]
})
export class NovedadesContadorModule { }