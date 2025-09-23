import { ComponentDef } from '../../../modules/fwk/core/model/component-def/component-def';
import { GRUPOS_TIPO_ACTIVIDAD_DEF } from './grupos_tipo_actividad/grupos_tipo_actividad.def';
import { ITEM_CHECKLIST_GRUPO_DEF } from './item_checklist_grupo/item_checklist_grupo.def';
import { REPORTE_HORAS_MAQUINA_DEF } from './reporte_horas_maquina/reporte_horas_maquina.def';
import { USUARIOS_DEF } from './usuarios/usuarios.def';
import { RECIBOS_DEF } from './recibos/recibos.def';
import { PERMISO_DEF } from './permiso/permiso.def';
import { SEGURIDAD_GRUPO_DEF } from './seguridad_grupo/seguridad_grupo.def';
import { SEGURIDAD_GRUPO_PERMISO_DEF } from './seguridad_grupo_permiso/seguridad_grupo_permiso.def';
import { SEGURIDAD_GRUPO_USUARIO_DEF } from './seguridad_grupo_usuario/seguridad_grupo_usuario.def';
import { NOVEDADES_CONTADOR_DEF } from '../novedades-contador/novedades-contador.def';
import { RECIBOS_PROCESAMIENTO_DEF } from '../recibos-procesamiento/recibos-procesamiento.def';
import { CIERRE_MES_DEF } from '../cierre-mes/cierre-mes.def';
import { FICHADO_PROCESAMIENTO_DEF } from '../fichado-procesamiento/fichado-procesamiento.def';
import { GENERAR_QR_DEF } from '../generar-qr/generar-qr.def';

export const COMPONENTS: ComponentDef[] = [
  USUARIOS_DEF,
  REPORTE_HORAS_MAQUINA_DEF,
  GRUPOS_TIPO_ACTIVIDAD_DEF,
  ITEM_CHECKLIST_GRUPO_DEF,
  RECIBOS_DEF,
  PERMISO_DEF,
  SEGURIDAD_GRUPO_DEF,
  SEGURIDAD_GRUPO_PERMISO_DEF,
  SEGURIDAD_GRUPO_USUARIO_DEF,
  FICHADO_PROCESAMIENTO_DEF,
  CIERRE_MES_DEF,
  RECIBOS_PROCESAMIENTO_DEF,
  NOVEDADES_CONTADOR_DEF,
  GENERAR_QR_DEF,
];

