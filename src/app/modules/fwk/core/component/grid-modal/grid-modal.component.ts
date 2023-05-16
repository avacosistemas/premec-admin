import {Component, Inject} from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Field } from '../../model/field';
import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { DynamicField } from '../../model/dynamic-form/dynamic-field';
import { AbstractClassPart } from '@angular/compiler/src/output/output_ast';
import { GridDef } from '../../model/component-def/grid-def';

/**
 * @title Dialog Overview
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-grid-modal-component',
  templateUrl: './grid-modal.component.html',
  styleUrls: ['./grid-modal.component.css'],
})

export class GridModalComponent  implements OnInit {
  dataSource: MatTableDataSource<any>;
  constructor(
    public dialogRef: MatDialogRef<GridModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.data.entities);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
