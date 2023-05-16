import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class AppConfigAuthGuardService implements CanActivate {
  
  private callbacks = [];
  constructor() {}

  addCallbackGuard(data: {next(url)}){
    this.callbacks.push(data);
  }
  canActivate(route: ActivatedRouteSnapshot){
    this.callbacks.forEach(c => {
      c.next(route.routeConfig.path);
    });
    return true;
  }
}
