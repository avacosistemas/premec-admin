import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss'],
  template: `
    <h2>Texto recibido</h2>
    <p>{{ data }}</p>
    <button mat-button (click)="close()">Cerrar</button>
  `
})
export class ErrorModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private dialogRef: MatDialogRef<ErrorModalComponent>
  ) {}

  ngOnInit(): void {
    
  }

  objectKeys = Object.keys;

  close() {
    this.dialogRef.close();
  }

}
