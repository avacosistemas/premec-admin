import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';


import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class JwkInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService,
              private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const headers = request.headers;
      if (this.auth.getToken()) {
        request = request.clone({
            headers: request.headers.set('Authorization', 'Bearer ' + this.auth.getToken())
        });
      }
      return next.handle(request);
  }
}
