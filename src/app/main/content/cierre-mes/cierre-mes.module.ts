import { NgModule } from '@angular/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { FwkModule } from 'app/modules/fwk/core/fwk.module';
import { CierreMesComponent } from './cierre-mes.component';
import { CierreMesService } from './cierre-mes.service';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
    declarations: [
        CierreMesComponent
    ],
    imports: [
        FuseSharedModule,
        FwkModule,
        MatTableModule,
        MatExpansionModule,
        MatSlideToggleModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatPaginatorModule
    ],
    exports: [
        CierreMesComponent
    ],
    providers: [
        CierreMesService,
    ]
})
export class CierreMesModule {
}