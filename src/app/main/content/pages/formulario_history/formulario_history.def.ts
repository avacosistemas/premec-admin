import { FORMULARIO_HISTORY_CREATE_FORM_FIELDS_DEF } from './form/formulario_history.create.fields';
import { FORMULARIO_HISTORY_UPDATE_FORM_FIELDS_DEF } from './form/formulario_history.update.fields';
import { FORMULARIO_HISTORY_READ_FORM_FIELDS_DEF } from './form/formulario_history.read.fields';
import { FORMULARIO_HISTORY_FILTER_FORM_FIELDS_DEF } from './form/formulario_history.filter.fields';
import { FORMULARIO_HISTORY_SECURITY_DEF } from './security/formulario_history.security';
import { FORMULARIO_HISTORY_GRID_DEF } from './grid/formulario_history.grid';
import { FORMULARIO_HISTORY_I18N_DEF } from './i18n/formulario_history.i18n';
import { FORMULARIO_HISTORY_NAV_DEF } from './navigation/formulario_history.nav';
import { CrudDef } from 'app/modules/fwk/core/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

// Definicion de un template crud(Create,Read,Update and Delete)
export const FORMULARIO_HISTORY_DEF: CrudDef = { 
    name: 'FORMULARIO_HISTORY',
    i18n: FORMULARIO_HISTORY_I18N_DEF,
    grid: FORMULARIO_HISTORY_GRID_DEF, // Si el crud tiene grilla, entonces se agrega su definicion.
    forms: {
        filter: FORMULARIO_HISTORY_FILTER_FORM_FIELDS_DEF, // Si el crud tiene campos de busqueda, entonces se agrega su definicion.
        // create: FORMULARIO_HISTORY_CREATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de alta, entonces se agrega su definicion.
        // update: FORMULARIO_HISTORY_UPDATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de modificacion, entonces se agrega su definicion.
        read:  FORMULARIO_HISTORY_READ_FORM_FIELDS_DEF // Si existe un formulario de edicion no exite uno de solo lectura
    },
    navigation: FORMULARIO_HISTORY_NAV_DEF,
    security: FORMULARIO_HISTORY_SECURITY_DEF,
    ws: {
        key: 'FORMULARIO_HISTORY_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'Form/GetVersions'
    },
    dialogConfig: {
        width: '800px'
    },
    filterInMemory: false,
    backButton: true,
    serverPagination: true,
    pagination: {
        page: 0,
        pageSize: 10
    },
    cancelInitSearch: false 
};
