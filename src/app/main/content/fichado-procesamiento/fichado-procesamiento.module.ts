import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FichadoProcesamientoComponent } from './fichado-procesamiento.component';
import { FichadoProcesamientoService } from './fichado-procesamiento.service';

const routes: Routes = [
    {
        path: '',
        component: FichadoProcesamientoComponent
    }
];

@NgModule({
    declarations: [
        FichadoProcesamientoComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,

        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTableModule,

        TranslateModule,
        FlexLayoutModule,
    ],
    providers: [
        FichadoProcesamientoService
    ]
})
export class FichadoProcesamientoModule { }