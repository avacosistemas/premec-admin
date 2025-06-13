import { Routes } from '@angular/router';
import { AuthGuardService } from '../../../modules/fwk/core/service/security/auth-guard.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { GenerarQrComponent } from '../generar-qr/generar-qr.component';
import { IntegrationComponent } from '../integration/integration.component';
import { USUARIOS_DEF } from './usuarios/usuarios.def';
import { ITEM_CHECKLIST_GRUPO_DEF } from './item_checklist_grupo/item_checklist_grupo.def';
import { GRUPOS_TIPO_ACTIVIDAD_DEF } from './grupos_tipo_actividad/grupos_tipo_actividad.def';
import { RECIBOS_DEF } from './recibos/recibos.def';
import { RecibosProcesamientoComponent } from '../recibos-procesamiento/recibos-procesamiento.component';
import { PasswordUpdateComponent } from '../authentication/password-update/password-update.component';

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
  },
  {
    path: 'reporteHorasMaquina',
    component: IntegrationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: ITEM_CHECKLIST_GRUPO_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: GRUPOS_TIPO_ACTIVIDAD_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: RECIBOS_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'recibos-procesamiento',
    component: RecibosProcesamientoComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'auth/password-update',
    component: PasswordUpdateComponent,
    canActivate: [AuthGuardService]
  },
];