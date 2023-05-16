import { Routes } from '@angular/router';
import { AuthGuardService } from '../../../modules/fwk/core/service/security/auth-guard.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IMAGEN_DEF } from '../pages/imagen/imagen.def';
import { FORMULARIO_DEF } from './formulario/formulario.def';
import { CAMPO_DEF } from './campo/campo.def';
import { OPCION_DEF } from './opcion/opcion.def';
import { INDICE_DEF } from './indice/indice.def';
import { CONTENIDO_DEF } from './contenido/contenido.def';
import { CONTENT_IMAGE_DEF } from './content_image/content_image.def';
import { MAILING_DEF } from './mailing/mailing.def';
import { FORM_RESPONSE_DEF } from './form_response/form_response.def';
import { IntegrationComponent } from '../integration/integration.component';
import { PERFIL_IDENTIFICACION_DEF } from './perfil_identificacion/perfil_identificacion.def';
import { PERFIL_DOMICILIO_DEF } from './perfil_domicilio/perfil_domicilio.def';
import { PERFIL_EMAIL_DEF } from './perfil_email/perfil_email.def';
import { IDENTIFICACION_BUSQUEDA_DEF } from './identificacion_busqueda/identificacion_busqueda.def';
import { UploadComponent } from '../upload/upload.component';
import { EMAIL_ACCOUNT_DEF } from './email_account/email_account.def';
import { MATRICULA_TIPO_DEF } from './matricula_tipo/matricula_tipo.def';
import { CONTACT_LIST_DEF } from './contact_list/contact_list.def';
import { CONTACT_LIST_DESUSCRIPTION_DEF } from './contact_list_desuscription/contact_list_desuscription.def';
import { CONTACT_LIST_MEMBERS_DEF } from './contact_list_members/contact_list_members.def';
import { MATRICULADO_ESTADO_DEF } from './matriculado_estado/matriculado_estado.def';
import { CERTIFICADO_MATRICULADO_DEF } from './certificado_matriculado/certificado_matriculado.def';
import { CATEGORIA_DEF } from './categoria/categoria.def';
import { DETALLE_ENVIO_DEF } from './detalle_envio/detalle_envio.def';
import { CONTENIDO_HISTORY_DEF } from './contenidoHistory/contenidoHistory.def';
import { FORMULARIO_HISTORY_DEF } from './formulario_history/formulario_history.def';
import { USUARIOS_DEF } from './usuarios/usuarios.def';
export const ROUTES: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: IMAGEN_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: FORMULARIO_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: CAMPO_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: OPCION_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: INDICE_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: CERTIFICADO_MATRICULADO_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: MATRICULADO_ESTADO_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: CONTENIDO_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: CONTENT_IMAGE_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: MAILING_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: FORM_RESPONSE_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: PERFIL_IDENTIFICACION_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: PERFIL_DOMICILIO_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: PERFIL_EMAIL_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: IDENTIFICACION_BUSQUEDA_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: EMAIL_ACCOUNT_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: MATRICULA_TIPO_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: CONTACT_LIST_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: CONTACT_LIST_DESUSCRIPTION_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: CONTACT_LIST_MEMBERS_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: CATEGORIA_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: DETALLE_ENVIO_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: CONTENIDO_HISTORY_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService]  
  },
  {
    path: FORMULARIO_HISTORY_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService]  
  },
  {
    path: USUARIOS_DEF.navigation.url.split('/')[1],
    component: IntegrationComponent,
    canActivate: [AuthGuardService]  
  }
];


