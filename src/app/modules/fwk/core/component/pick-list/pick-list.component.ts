import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { Injector } from '@angular/core';

import { MatSelectionList } from '@angular/material/list';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AbstractComponent } from '../abstract-component.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-pick-list',
  templateUrl: './pick-list.component.html',
  styleUrls: ['./pick-list.component.scss']
})
export class PickListComponent extends AbstractComponent {

  @Input()
  controlName = '';
  @Input()
  elementLabel = 'name';
  @Input()
  titleFrom = 'Permisos totales';
  @Input()
  titleTo = 'Permisos cargados';
  @Input()
  compositeKey = [];
  fromDataSelected = [];
  toDataSelected = [];
  _fromData = [];
  _toData = [];
  @Output() onChangeControl = new EventEmitter(true);

  @ViewChild('from', { static: true }) from: MatSelectionList;
  @ViewChild('to', { static: true }) to: MatSelectionList;

  constructor(injector: Injector) {
    super(injector);
    this.setUpI18n({
      name: this.getI18nName(),
      lang: 'es',
      dictionary: {}
    });
   }

  transferTo() {
    this.fromDataSelected.forEach(element => {
      this._toData.push(element);
      this._fromData = this._fromData.filter(e => e.id !== element.id);
    });
    this.onChangeControl.emit(this._toData);
  }

  transferFrom() {
    this.toDataSelected.forEach(element => {
      this._fromData.push(element);
      this._toData = this._toData.filter(e => e.id !== element.id);
    });
    this.onChangeControl.emit(this._toData);
  }

  transferToAll() {
    this._fromData.forEach(element => {
      this._toData.push(element);
    });
    this._fromData = [];
    this.onChangeControl.emit(this._toData);
  }

  transferFromAll() {
   this._toData.forEach(element => {
      this._fromData.push(element);
    });
    this._toData = [];
    this.onChangeControl.emit(this._toData);
  }

  getI18nName(): string {
    return 'pick-list';
  }

  getNameElementList(el: any) {
    return el[this.elementLabel];
  }

  onNgModelChangeFromList(elements: any[]) {

  }

  onNgModelChangeToList(elements: any[]) {

  }

  onInit() {

  }

  @Input()
  set fromData(value) {
    if (value === undefined || value === '') {
      value = [];
    }
    this._fromData = [];
    value.forEach(element => {
      this._fromData.push(element);
    });
    this._fromData =  value;
    this.deleteDuplicated();
  }

  deleteDuplicated() {
    if (this.compositeKey && this._toData && this._fromData) {
      if (this.compositeKey.length > 0) {
        this._toData.forEach(e => {
          this._fromData = this._fromData.filter(subE => subE.id !== e.id);
        });
      }
    }
  }

  @Input()
  set toData(value) {
    if (value === undefined || value === '') {
      value = [];
    }
    this._toData = [];
    value.forEach(element => {
      this._toData.push(element);
    });
    this.deleteDuplicated();
  }

}
