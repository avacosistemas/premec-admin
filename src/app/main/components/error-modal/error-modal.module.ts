import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { ErrorModalComponent } from './error-modal.component';

@NgModule({
  declarations: [
    ErrorModalComponent
  ],
  imports: [
    CommonModule, 
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    ErrorModalComponent 
  ]
})
export class ErrorModalModule { }