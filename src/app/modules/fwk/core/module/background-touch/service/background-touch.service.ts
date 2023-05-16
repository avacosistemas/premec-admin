import { Injector, Injectable } from '@angular/core';

@Injectable()
export class BackgroundTouchService {
  backgroundTouchMapKey: any;

  constructor(protected injector: Injector) { 
    this.backgroundTouchMapKey = {};
  }
  
  addBgnTouch(bgnTouchKey: string){
    if (this.backgroundTouchMapKey[bgnTouchKey] === undefined){
      this.backgroundTouchMapKey[bgnTouchKey] = this.createControl(bgnTouchKey);
    }
    return this.getControlBackground(bgnTouchKey);
  }

  getControlBackground(bgnTouchKey){
    return this.backgroundTouchMapKey[bgnTouchKey];
  }

  getControlGlobalBgnTouch(){
    return this.backgroundTouchMapKey['global'];
  }

  private createControl(bgnTouchKey: string){
    const props = {
     _show: false,
     _z_index: 0
    };
    const callbacks = [];
    const obs =  {
      next: (obj) => {
        callbacks.forEach(c => c(obj));
      }
    };
    const control = {
      key: bgnTouchKey,
      setZIndex(value){
        props._z_index = value;
        obs.next(control);
      },
      getZIndex(){
        return props._z_index;
      },
      show: () => {
        props._show = true;
        obs.next(control);
      },  
      hide: () => {
        props._show = false;
        obs.next(control);
      },
      isShow: () => props._show,
      subscribe: (callbackEntry) => callbacks.push(callbackEntry)
    };
   return control;   
  }
}
