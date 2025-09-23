import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const requiredPermission = route.data.permission as string;

    if (!requiredPermission) {
      return true;
    }

    const hasPermission = this.authService.hasPermission(requiredPermission);

    if (hasPermission) {
      return true;
    } else {
      console.warn(`Acceso denegado. Se requiere el permiso: ${requiredPermission}`);
      this.notificationService.notifyError('No tienes permiso para acceder a esta sección.');
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
}