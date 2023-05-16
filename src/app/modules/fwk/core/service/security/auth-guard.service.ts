import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from 'environments/environment';
import { I18nService } from '../i18n-service/i18n.service';
import { I18n } from '../../model/i18n';
import { Observable } from 'rxjs';



@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return  new Observable<boolean>(obs => {
      console.log('Guard');
      console.log('Guard Security:' + environment["security"]);
      if(environment["security"] == false){
        obs.next(true)
      } else {
        var role = this.authService.getUserAdmin() ? this.authService.getUserAdmin().role : '';
        console.log('Role:' + role);
        if (role != 'Administrators') {
          if(environment["localAuth"] == true){
            console.log('Guard navigated');
            this.router.navigate(['/auth/login']);
          } else {
            window.location.href = 'contenido-no-disponible';
          }
        }

        this.authService.isTokenExpired().subscribe(isTokenExpired => {  
          console.log('Guard isTokenExpired:' + isTokenExpired);
          console.log('Guard path:' + route.routeConfig.path);
          console.log('Guard localAuth:' + environment["localAuth"]);
          if (isTokenExpired && route.routeConfig.path !== environment.URL_LOGIN){
            if(environment["localAuth"] == true){
              console.log('Guard navigated');
              this.router.navigate(['/auth/login']);
            } else {
              console.log('Guard href' + environment.URL_LOGIN);
              window.location.href = environment.URL_LOGIN; 
            }
          } else if (!isTokenExpired && route.routeConfig.path === environment.URL_LOGIN) {
            console.log('Guard /' + environment.URL_ROOT);
            this.router.navigate(['/' + environment.URL_ROOT]);
          }
          obs.next(true);
        });
      }
    });
  }
}
