import { PERMISO_CREATE_FORM_FIELDS_DEF } from './form/permiso.create.fields';
import { PERMISO_UPDATE_FORM_FIELDS_DEF } from './form/permiso.update.fields';
import { PERMISO_READ_FORM_FIELDS_DEF } from './form/permiso.read.fields';
import { PERMISO_FILTER_FORM_FIELDS_DEF } from './form/permiso.filter.fields';
import { PERMISO_SECURITY_DEF } from './security/permiso.security';
import { PERMISO_GRID_DEF } from './grid/permiso.grid';
import { PERMISO_I18N_DEF } from './i18n/permiso.i18n';
import { PERMISO_NAV_DEF } from './navigation/permiso.nav';
import { CrudDef } from 'app/modules/fwk/core/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

// Definicion de un template crud(Create,Read,Update and Delete)
export const PERMISO_DEF: CrudDef = { 
    name: 'PERMISO',
    i18n: PERMISO_I18N_DEF,
    grid: PERMISO_GRID_DEF, // Si el crud tiene grilla, entonces se agrega su definicion.
    formsDef: {
        update: {
            fields: PERMISO_UPDATE_FORM_FIELDS_DEF,
            showSubmitContinue: true
        },
        create: {
            fields: PERMISO_CREATE_FORM_FIELDS_DEF,
            showSubmitContinue: true
        }
    },
    forms: {
        filter: PERMISO_FILTER_FORM_FIELDS_DEF, // Si el crud tiene campos de busqueda, entonces se agrega su definicion.
        create: PERMISO_CREATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de alta, entonces se agrega su definicion.
        update: PERMISO_UPDATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de modificacion, entonces se agrega su definicion.
        read:  PERMISO_READ_FORM_FIELDS_DEF // Si existe un formulario de edicion no exite uno de solo lectura
    },
    navigation: PERMISO_NAV_DEF,
    security: PERMISO_SECURITY_DEF,
    ws: {
        key: 'PERMISO_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'permissions/'
    },
    dialogConfig: {
        width: '600px'
    },
    pagination: {
        page: 0,
        pageSize: 10
    },
};
