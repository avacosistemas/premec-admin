// import { OnInit, Component, Injector, Input, Output, EventEmitter} from '@angular/core';
// import { DynamicField } from '../../../model/dynamic-form/dynamic-field';
// import { FormGroup } from '@angular/forms';
// import { AbstractComponent } from '../../../component/abstract-component.component';
// import { BackgroundTouchService } from '../service/background-touch.service';


// @Component({
//   // tslint:disable-next-line:component-selector
//   selector: 'app-background-touch',
//   templateUrl: './background-touch.component.html',
//   styleUrls: ['./background-touch.component.scss']
// })
// export class BackgroundTouchComponent extends AbstractComponent implements OnInit {

//   @Input()
//   backgroundKey: string;  
//   backgroundService: BackgroundTouchService;
//   zIndex: any;
//   controlBgnTouch: any;

//   constructor(private injector: Injector){
//     super(injector);
//     this.backgroundService = injector.get(BackgroundTouchService);
//     this.zIndex = 0;
//   }

//   onInit(){
//     this.controlBgnTouch = this.backgroundService.addBgnTouch(this.backgroundKey);
//   }

//   get show(){
//     if (this.controlBgnTouch){
//       return this.controlBgnTouch.isShow();
//     }
//     return false;
//   }

//   backgroundClick(){
//     this.controlBgnTouch.hide();
//   }
// }
