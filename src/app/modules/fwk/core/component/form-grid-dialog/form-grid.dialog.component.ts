import { Component, OnInit, Injector, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Entity } from '../../model/entity';
import { GridDef } from '../../model/component-def/grid-def';
import { ActionDef } from '../../model/component-def/action-def';
import { ActionDefService } from '../../service/action-def-service/action-def.service';

/**
 * @title Dialog Overview
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-form-grid-modal-component',
  templateUrl: './form-grid.dialog.component.html',
  styleUrls: ['./form-grid.dialog.component.scss'],
})

export class FormGridModalComponent implements OnInit {

  entity: Entity;
  form: FormGroup;
  dialog: any;
  activatedRoute: ActivatedRoute;
  isEdit: boolean;
  actionDefService: ActionDefService;
  customSubmitActions: any;
  constructor(public injector: Injector,
    public dialogRef: MatDialogRef<FormGridModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.activatedRoute = injector.get(ActivatedRoute);
      this.actionDefService = injector.get(ActionDefService);
      this.dialogRef.disableClose = true;
      this.isEdit = this.data.isEdit ? this.data.isEdit : false;
      this.entity = this.data.entity;
      this.dialog = this.data.dialog;
      this.customSubmitActions = this.data.onSubmitActions;
      this.form = new FormGroup({});
  }

  getDataSource(grid: GridDef, entity){
    if (grid.fromArrayField){
      return new MatTableDataSource<any>(entity[grid.fromArrayField]);
    }
    return new MatTableDataSource<any>();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getUrl(){
    return this.activatedRoute.snapshot.children[0].routeConfig.path;
  }

  ngOnInit() {}
  
  
  submitAction(action: ActionDef){
    if (this.customSubmitActions){
      this.customSubmitActions(action, this.entity);
    }else{
      this.actionDefService.submitAction(action, this.entity, this.data.i18n, undefined).subscribe(r => {});
    }
  }

  get titleLabel() {
    if (this.dialog.modalName){
      return this.dialog.modalName;
    }else {
      return '';
    }
  }
}
