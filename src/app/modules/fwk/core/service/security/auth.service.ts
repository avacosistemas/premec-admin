import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Injector } from '@angular/core';
import { User } from '../../model/user';
import { HttpService } from '../http-service/http.service';
import { environment } from 'environments/environment';
import { GenericHttpService } from '../generic-http-service/generic-http.service';
import { SpinnerService } from '../../module/spinner/service/spinner.service';
import { Router } from '@angular/router';


const USER_DATA = 'currentUser';

@Injectable()
export class AuthService extends HttpService {
  
  private genericHttpService: GenericHttpService;
  private spinnerService: SpinnerService;
  constructor(protected injector: Injector, private router: Router) { 
    super(injector, '');
    this.spinnerService = injector.get(SpinnerService);
    this.genericHttpService = injector.get(GenericHttpService);
  }


  logout() {
    this.spinnerService.getControlGlobalSpinner().show();
    this.genericHttpService.basicPost(environment.URL_LOGOUT_API, {}).subscribe(() => {
      this.localStorageService.remove(USER_DATA);
      this.localStorageService.cleanUserSession();
      if(environment["localAuth"] == true){
        this.router.navigate(['/auth/login']);
      } else {
        window.location.href = environment.URL_LOGIN; 
      }
      this.spinnerService.getControlGlobalSpinner().hide();
    });
  }

  isTokenExpired(): Observable<any> {
    return new Observable<any>(obs => {
      const token = this.getToken();
      if (token) {
        this.genericHttpService.basicPost(environment.AUTHENTICATION_REFRESH_TOKEN_URL, {token}).subscribe(response => {
          this.setToken(response.token);
          obs.next(false);
        }, e => {
          obs.next(true);
        });
      } else {
        obs.next(true);
      }
    });
  }

  login(username, password): Observable<any> {
    return new Observable((observer) => {
      this.genericHttpService.basicPost(environment.AUTHENTICATION_URL, {username, password}).subscribe(response => {
        this.setUser(response);
        this.setToken(response.token);
        observer.next(response);
      }, e => {
        observer.error(e);
      });
    });
  }

  getToken(): string {
    return this.localStorageService.getTokenData();
  }

  setToken(token: any): void{
    this.localStorageService.saveTokenData(token);
  }

  setUser(user: User): void {
    this.localStorageService.save(USER_DATA, user);
  }

  getUserLocalStorage(): any {
    return this.localStorageService.get(USER_DATA);
  }

  getUserAdmin(): any {
    return this.localStorageService.get(USER_DATA);
  }
}

