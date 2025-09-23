import { Routes } from '@angular/router';
import { AuthGuardService } from '../../../modules/fwk/core/service/security/auth-guard.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { GenerarQrComponent } from '../generar-qr/generar-qr.component';
import { IntegrationComponent } from '../integration/integration.component';

import { RecibosProcesamientoComponent } from '../recibos-procesamiento/recibos-procesamiento.component';
import { PasswordUpdateComponent } from '../authentication/password-update/password-update.component';
import { NovedadesContadorComponent } from 'app/main/content/novedades-contador/novedades-contador.component';
import { FichadoProcesamientoComponent } from '../fichado-procesamiento/fichado-procesamiento.component';
import { CierreMesComponent } from 'app/main/content/cierre-mes/cierre-mes.component';

import { locale as generarQrLocale } from '../generar-qr/i18n/es';

import { USUARIOS_DEF } from './usuarios/usuarios.def';
import { ITEM_CHECKLIST_GRUPO_DEF } from './item_checklist_grupo/item_checklist_grupo.def';
import { GRUPOS_TIPO_ACTIVIDAD_DEF } from './grupos_tipo_actividad/grupos_tipo_actividad.def';
import { RECIBOS_DEF } from './recibos/recibos.def';
import { RECIBOS_PROCESAMIENTO_DEF } from '../recibos-procesamiento/recibos-procesamiento.def';
import { FICHADO_PROCESAMIENTO_DEF } from '../fichado-procesamiento/fichado-procesamiento.def';
import { CIERRE_MES_DEF } from '../cierre-mes/cierre-mes.def';
import { NOVEDADES_CONTADOR_DEF } from '../novedades-contador/novedades-contador.def';
import { PERMISO_DEF } from './permiso/permiso.def';
import { SEGURIDAD_GRUPO_PERMISO_DEF } from './seguridad_grupo_permiso/seguridad_grupo_permiso.def';
import { SEGURIDAD_GRUPO_USUARIO_DEF } from './seguridad_grupo_usuario/seguridad_grupo_usuario.def';
import { SEGURIDAD_GRUPO_DEF } from './seguridad_grupo/seguridad_grupo.def';
import { GENERAR_QR_DEF } from '../generar-qr/generar-qr.def';
import { REPORTE_HORAS_MAQUINA_DEF } from './reporte_horas_maquina/reporte_horas_maquina.def';

import { PermissionGuard } from 'app/modules/fwk/core/service/security/permission-guard.service';

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
    canActivate: [
      AuthGuardService,
      PermissionGuard
    ],
    data: {
      title: USUARIOS_DEF.i18n.words.page_title,
      // permission: USUARIOS_DEF.security.readAccess,
    }
  },
  {
    path: GENERAR_QR_DEF.navigation.url.split('/')[1],
    component: GenerarQrComponent,
    canActivate: [
      AuthGuardService,
      PermissionGuard
    ],
    data: {
      permission: GENERAR_QR_DEF.security.readAccess,
    }
  },
  {
    path: REPORTE_HORAS_MAQUINA_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [
      AuthGuardService,
      PermissionGuard
    ],
    data: {
      title: REPORTE_HORAS_MAQUINA_DEF.i18n.words.page_title,
      permission: REPORTE_HORAS_MAQUINA_DEF.security.readAccess,
    }
  },
  {
    path: ITEM_CHECKLIST_GRUPO_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [
      AuthGuardService,
      PermissionGuard
    ],
    data: {
      title: ITEM_CHECKLIST_GRUPO_DEF.i18n.words.page_title,
      permission: ITEM_CHECKLIST_GRUPO_DEF.security.readAccess,
    }
  },
  {
    path: GRUPOS_TIPO_ACTIVIDAD_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [
      AuthGuardService,
      PermissionGuard
    ],
    data: {
      title: GRUPOS_TIPO_ACTIVIDAD_DEF.i18n.words.page_title,
      permission: GRUPOS_TIPO_ACTIVIDAD_DEF.security.readAccess,
    }
  },
  {
    path: RECIBOS_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [
      AuthGuardService,
      PermissionGuard
    ],
    data: {
      title: RECIBOS_DEF.i18n.words.page_title,
      permission: RECIBOS_DEF.security.readAccess,
    }
  },
  {
    path: RECIBOS_PROCESAMIENTO_DEF.navigation.url.split('/')[1],
    component: RecibosProcesamientoComponent,
    canActivate: [
      AuthGuardService,
      PermissionGuard
    ],
    data: {
      title: RECIBOS_PROCESAMIENTO_DEF.i18n.words.page_title,
      permission: RECIBOS_PROCESAMIENTO_DEF.security.readAccess,
    }
  },
  {
    path: FICHADO_PROCESAMIENTO_DEF.navigation.url.split('/')[1],
    component: FichadoProcesamientoComponent,
    canActivate: [
      AuthGuardService,
      PermissionGuard
    ],
    data: {
      title: FICHADO_PROCESAMIENTO_DEF.i18n.words.page_title,
      permission: FICHADO_PROCESAMIENTO_DEF.security.readAccess,
    }
  },
  {
    path: CIERRE_MES_DEF.navigation.url.split('/')[1],
    component: CierreMesComponent,
    canActivate: [
      AuthGuardService,
      PermissionGuard
    ],
    data: {
      title: CIERRE_MES_DEF.i18n.words.page_title,
      permission: CIERRE_MES_DEF.security.readAccess,
    }
  },
  {
    path: NOVEDADES_CONTADOR_DEF.navigation.url.split('/')[1],
    component: NovedadesContadorComponent,
    canActivate: [
      AuthGuardService,
      PermissionGuard
    ],
    data: {
      title: NOVEDADES_CONTADOR_DEF.i18n.words.page_title,
      permission: NOVEDADES_CONTADOR_DEF.security.readAccess,
    }
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
    canActivate: [
      AuthGuardService,
      PermissionGuard
    ],
    data: {
      title: PERMISO_DEF.i18n.words.page_title,
      permission: PERMISO_DEF.security.readAccess,
    }
  },
  {
    path: SEGURIDAD_GRUPO_PERMISO_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [
      AuthGuardService,
      PermissionGuard
    ],
    data: {
      title: SEGURIDAD_GRUPO_PERMISO_DEF.i18n.words.page_title,
      permission: SEGURIDAD_GRUPO_PERMISO_DEF.security.readAccess,
    }
  },
  {
    path: SEGURIDAD_GRUPO_USUARIO_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [
      AuthGuardService,
      PermissionGuard
    ],
    data: {
      title: SEGURIDAD_GRUPO_USUARIO_DEF.i18n.words.page_title,
      permission: SEGURIDAD_GRUPO_USUARIO_DEF.security.readAccess,
    }
  },
  {
    path: SEGURIDAD_GRUPO_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [
      AuthGuardService,
      PermissionGuard
    ],
    data: {
      title: SEGURIDAD_GRUPO_DEF.i18n.words.page_title,
      permission: SEGURIDAD_GRUPO_DEF.security.readAccess,
    }
  },
];