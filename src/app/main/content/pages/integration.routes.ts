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

import { locale as generarQrLocale } from '../generar-qr/i18n/es';
import { locale as recibosProcesamientoLocale } from '../recibos-procesamiento/i18n/es';
import { PERMISO_DEF } from './permiso/permiso.def';
import { SEGURIDAD_GRUPO_PERMISO_DEF } from './seguridad_grupo_permiso/seguridad_grupo_permiso.def';
import { SEGURIDAD_GRUPO_USUARIO_DEF } from './seguridad_grupo_usuario/seguridad_grupo_usuario.def';
import { SEGURIDAD_GRUPO_DEF } from './seguridad_grupo/seguridad_grupo.def';
import { FichadoProcesamientoComponent } from '../fichado-procesamiento/fichado-procesamiento.component';
import { CierreMesComponent } from 'app/main/content/cierre-mes/cierre-mes.component';
import { NovedadesContadorComponent } from 'app/main/content/novedades-contador/novedades-contador.component';
import { NOVEDADES_CONTADOR_SECURITY_DEF } from '../novedades-contador/security/novedades-contador.security';
import { locale as fichadoLocale } from '../fichado-procesamiento/i18n/es';
// import { PermissionGuard } from 'app/modules/fwk/core/service/security/permission-guard.service';

export const ROUTES: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    data: { title: 'Dashboard' }
  },
  {
    path: USUARIOS_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService],
    data: { title: USUARIOS_DEF.i18n.words.page_title }
  },
  {
    path: 'generarqr',
    component: GenerarQrComponent,
    canActivate: [AuthGuardService],
    data: { title: generarQrLocale.data.GENERAR_QR.TITULO_CORTO }
  },
  {
    path: 'reporteHorasMaquina',
    component: IntegrationComponent,
    canActivate: [AuthGuardService],
    data: { title: 'Reporte Horas Máquina' }
  },
  {
    path: ITEM_CHECKLIST_GRUPO_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService],
    data: { title: ITEM_CHECKLIST_GRUPO_DEF.i18n.words.page_title }
  },
  {
    path: GRUPOS_TIPO_ACTIVIDAD_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService],
    data: { title: GRUPOS_TIPO_ACTIVIDAD_DEF.i18n.words.page_title }
  },
  {
    path: RECIBOS_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService],
    data: { title: RECIBOS_DEF.i18n.words.page_title }
  },
  {
    path: 'recibos-procesamiento',
    component: RecibosProcesamientoComponent,
    canActivate: [AuthGuardService],
    data: { title: recibosProcesamientoLocale.data.RECIBOS_PROCESAMIENTO.TITULO_CORTO }
  },
  {
    path: 'fichado-procesamiento',
    component: FichadoProcesamientoComponent,
    canActivate: [AuthGuardService],
    data: { title: fichadoLocale.data.FICHADO_PROCESAMIENTO.TITULO_CORTO }
  },
  {
    path: 'cierre-mes',
    component: CierreMesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'novedades-contador',
    component: NovedadesContadorComponent,
    canActivate: [
      AuthGuardService, 
      // PermissionGuard
    ],
    // data: {
    //   permission: NOVEDADES_CONTADOR_SECURITY_DEF.readAccess
    // }
  },
  {
    path: 'auth/password-update',
    component: PasswordUpdateComponent,
    canActivate: [AuthGuardService],
    data: { title: 'Cambiar Contraseña' }
  },
  {
    path: PERMISO_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService],
    data: { title: 'Permisos' }
  },
  {
    path: SEGURIDAD_GRUPO_PERMISO_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService],
    data: { title: 'Permisos asignados al grupo' }
  },
  {
    path: SEGURIDAD_GRUPO_USUARIO_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService],
    data: { title: 'Grupos asignados al usuario' }
  },
  {
    path: SEGURIDAD_GRUPO_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService],
    data: { title: 'Grupos' }
  },
];