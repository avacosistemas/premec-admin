import { PERFIL_IDENTIFICACION_CREATE_FORM_FIELDS_DEF } from './form/perfil_identificacion.create.fields';
import { PERFIL_IDENTIFICACION_UPDATE_FORM_FIELDS_DEF } from './form/perfil_identificacion.update.fields';
import { PERFIL_IDENTIFICACION_READ_FORM_FIELDS_DEF } from './form/perfil_identificacion.read.fields';
import { PERFIL_IDENTIFICACION_FILTER_FORM_FIELDS_DEF } from './form/perfil_identificacion.filter.fields';
import { PERFIL_IDENTIFICACION_SECURITY_DEF } from './security/perfil_identificacion.security';
import { PERFIL_IDENTIFICACION_GRID_DEF } from './grid/perfil_identificacion.grid';
import { PERFIL_IDENTIFICACION_I18N_DEF } from './i18n/perfil_identificacion.i18n';
import { PERFIL_IDENTIFICACION_NAV_DEF } from './navigation/perfil_identificacion.nav';
import { CrudDef } from 'app/modules/fwk/core/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

// Definicion de un template crud(Create,Read,Update and Delete)
export const PERFIL_IDENTIFICACION_DEF: CrudDef = {
    name: 'PERFIL_IDENTIFICACION',
    i18n: PERFIL_IDENTIFICACION_I18N_DEF,
    grid: PERFIL_IDENTIFICACION_GRID_DEF, // Si el crud tiene grilla, entonces se agrega su definicion.
    forms: {
       filter: PERFIL_IDENTIFICACION_FILTER_FORM_FIELDS_DEF, // Si el crud tiene campos de busqueda, entonces se agrega su definicion.
       // create: PERFIL_IDENTIFICACION_CREATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de alta, entonces se agrega su definicion.
       // update: PERFIL_IDENTIFICACION_UPDATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de modificacion, entonces se agrega su definicion.
        read:  PERFIL_IDENTIFICACION_READ_FORM_FIELDS_DEF // Si existe un formulario de edicion no exite uno de solo lectura
    },
    navigation: PERFIL_IDENTIFICACION_NAV_DEF,
    security: PERFIL_IDENTIFICACION_SECURITY_DEF,
    ws: {
        key: 'PERFIL_IDENTIFICACION_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'admin/personas'
    },
    dialogConfig: {
        width: '800px'
    },
    filterInMemory: false,
    backButton: true
};
