import { Injector, Injectable } from '@angular/core';

@Injectable()
export class SpinnerService {
  spinnerMapKey: any;

  constructor(protected injector: Injector) { 
    this.spinnerMapKey = {};
  }
  
  addSpinner(spinnerKey: string){
    if (this.spinnerMapKey[spinnerKey] === undefined){
      this.spinnerMapKey[spinnerKey] = this.createControl(spinnerKey);
    }
    return this.getControlSpinner(spinnerKey);
  }

  getControlSpinner(spinnerKey){
    return this.spinnerMapKey[spinnerKey];
  }

  getControlGlobalSpinner(){
    return this.spinnerMapKey['global'];
  }

  private createControl(spinnerKey: string){
   const props = {
    _show: false
   };
   return {
     key: spinnerKey,
     show: () => props._show = true, 
     hide: () => props._show = false ,
     isShow: () => props._show
   };   
  }
}
