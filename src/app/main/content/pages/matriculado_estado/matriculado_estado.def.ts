import { MATRICULADO_ESTADO_CREATE_FORM_FIELDS_DEF } from './form/matriculado_estado.create.fields';
import { MATRICULADO_ESTADO_UPDATE_FORM_FIELDS_DEF } from './form/matriculado_estado.update.fields';
import { MATRICULADO_ESTADO_READ_FORM_FIELDS_DEF } from './form/matriculado_estado.read.fields';
import { MATRICULADO_ESTADO_FILTER_FORM_FIELDS_DEF } from './form/matriculado_estado.filter.fields';
import { MATRICULADO_ESTADO_SECURITY_DEF } from './security/matriculado_estado.security';
import { MATRICULADO_ESTADO_GRID_DEF } from './grid/matriculado_estado.grid';
import { MATRICULADO_ESTADO_I18N_DEF } from './i18n/matriculado_estado.i18n';
import { MATRICULADO_ESTADO_NAV_DEF } from './navigation/matriculado_estado.nav';
import { CrudDef } from 'app/modules/fwk/core/model/component-def/crud-def';
import { environment, PREFIX_DOMAIN_API } from 'environments/environment';

// Definicion de un template crud(Create,Read,Update and Delete)
export const MATRICULADO_ESTADO_DEF: CrudDef = { 
    name: 'MATRICULADO_ESTADO',
    i18n: MATRICULADO_ESTADO_I18N_DEF,
    grid: MATRICULADO_ESTADO_GRID_DEF, // Si el crud tiene grilla, entonces se agrega su definicion.
    forms: {
        filter: MATRICULADO_ESTADO_FILTER_FORM_FIELDS_DEF, // Si el crud tiene campos de busqueda, entonces se agrega su definicion.
        // create: MATRICULADO_ESTADO_CREATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de alta, entonces se agrega su definicion.
        update: MATRICULADO_ESTADO_UPDATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de modificacion, entonces se agrega su definicion.
        read:  MATRICULADO_ESTADO_READ_FORM_FIELDS_DEF // Si existe un formulario de edicion no exite uno de solo lectura
    },
    navigation: MATRICULADO_ESTADO_NAV_DEF,
    security: MATRICULADO_ESTADO_SECURITY_DEF,
    ws: {
        key: 'MATRICULADO_ESTADO_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'MatriculadoEstado'
    },
    dialogConfig: {
        width: '800px'
    },
    pagination: {
        page: 0,
        pageSize: 10
    }
};
