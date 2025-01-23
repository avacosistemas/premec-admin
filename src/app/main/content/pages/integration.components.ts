import { ComponentDef } from '../../../modules/fwk/core/model/component-def/component-def';
import { GRUPOS_TIPO_ACTIVIDAD_CREATE_FORM_FIELDS_DEF } from './grupos_tipo_actividad/form/grupos_tipo_actividad.create.fields';
import { GRUPOS_TIPO_ACTIVIDAD_DEF } from './grupos_tipo_actividad/grupos_tipo_actividad.def';
import { ITEM_CHECKLIST_GRUPO_DEF } from './item_checklist_grupo/item_checklist_grupo.def';
import { REPORTE_HORAS_MAQUINA_DEF } from './reporte_horas_maquina/reporte_horas_maquina.def';
import { USUARIOS_DEF } from './usuarios/usuarios.def';

export const COMPONENTS: ComponentDef[] = [
  USUARIOS_DEF,
  REPORTE_HORAS_MAQUINA_DEF,
  GRUPOS_TIPO_ACTIVIDAD_DEF,
  ITEM_CHECKLIST_GRUPO_DEF
];

