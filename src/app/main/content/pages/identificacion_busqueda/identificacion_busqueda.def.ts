import { IDENTIFICACION_BUSQUEDA_CREATE_FORM_FIELDS_DEF } from './form/identificacion_busqueda.create.fields';
import { IDENTIFICACION_BUSQUEDA_UPDATE_FORM_FIELDS_DEF } from './form/identificacion_busqueda.update.fields';
import { IDENTIFICACION_BUSQUEDA_READ_FORM_FIELDS_DEF } from './form/identificacion_busqueda.read.fields';
import { IDENTIFICACION_BUSQUEDA_FILTER_FORM_FIELDS_DEF } from './form/identificacion_busqueda.filter.fields';
import { IDENTIFICACION_BUSQUEDA_SECURITY_DEF } from './security/identificacion_busqueda.security';
import { IDENTIFICACION_BUSQUEDA_GRID_DEF } from './grid/identificacion_busqueda.grid';
import { IDENTIFICACION_BUSQUEDA_I18N_DEF } from './i18n/identificacion_busqueda.i18n';
import { IDENTIFICACION_BUSQUEDA_NAV_DEF } from './navigation/identificacion_busqueda.nav';
import { CrudDef } from 'app/modules/fwk/core/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

// Definicion de un template crud(Create,Read,Update and Delete)
export const IDENTIFICACION_BUSQUEDA_DEF: CrudDef = { 
    name: 'IDENTIFICACION_BUSQUEDA',
    i18n: IDENTIFICACION_BUSQUEDA_I18N_DEF,
    grid: IDENTIFICACION_BUSQUEDA_GRID_DEF, // Si el crud tiene grilla, entonces se agrega su definicion.
    forms: {
        filter: IDENTIFICACION_BUSQUEDA_FILTER_FORM_FIELDS_DEF, // Si el crud tiene campos de busqueda, entonces se agrega su definicion.
        //create: IDENTIFICACION_BUSQUEDA_CREATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de alta, entonces se agrega su definicion.
        //update: IDENTIFICACION_BUSQUEDA_UPDATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de modificacion, entonces se agrega su definicion.
        //read:  IDENTIFICACION_BUSQUEDA_READ_FORM_FIELDS_DEF // Si existe un formulario de edicion no exite uno de solo lectura
    },
    navigation: IDENTIFICACION_BUSQUEDA_NAV_DEF,
    security: IDENTIFICACION_BUSQUEDA_SECURITY_DEF,
    ws: {
        key: 'IDENTIFICACION_BUSQUEDA_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'admin/personas'
    },
    dialogConfig: {
        width: '800px'
    },
    filterInMemory: false,
    serverPagination: true,
    pagination: {
        page: 0,
        pageSize: 10
    },
    cancelInitSearch: true
};
