import { Routes } from '@angular/router';
import { AuthGuardService } from '../../../modules/fwk/core/service/security/auth-guard.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { GenerarQrComponent } from '../generar-qr/generar-qr.component';
import { IntegrationComponent } from '../integration/integration.component';
import { USUARIOS_DEF } from './usuarios/usuarios.def';
export const ROUTES: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: USUARIOS_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService]  
  },
  {
    path: 'generarqr',
    component: GenerarQrComponent,
    canActivate: [AuthGuardService]  
  }
];


