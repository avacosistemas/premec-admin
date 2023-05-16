import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'back-button',
    template: `<button (click)="goBack()" class="icon-button_style- mat-mini-fab mat-accent ng-tns-c20-4 ng-star-inserted btn-back" title='Volver'>
                <mat-icon aria-label="icon">reply</mat-icon>    
               </button>`,
  styleUrls: ['./backbutton.component.scss']
})
export class BackButtonComponent {
    @Input()color: string;

  constructor(private location: Location) { }

  goBack() {
    this.location.back();
  }
}