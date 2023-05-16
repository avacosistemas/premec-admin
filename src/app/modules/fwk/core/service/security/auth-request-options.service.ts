import { HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';

const AUTH_HEADER_KEY = 'Authorization';
const AUTH_PREFIX = 'Bearer';

export class AuthRequestOptionsService extends HttpParams {

  constructor(private authService: AuthService) {
    super();

  const token = this.authService.getToken();
    if (token) {
      this.headers.append(AUTH_HEADER_KEY, `${AUTH_PREFIX} ${token}`);
    }
    console.log(this.headers);
  }
}

