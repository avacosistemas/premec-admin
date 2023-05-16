import { FORM_RESPONSE_CREATE_FORM_FIELDS_DEF } from './form/form_response.create.fields';
import { FORM_RESPONSE_UPDATE_FORM_FIELDS_DEF } from './form/form_response.update.fields';
import { FORM_RESPONSE_READ_FORM_FIELDS_DEF } from './form/form_response.read.fields';
import { FORM_RESPONSE_FILTER_FORM_FIELDS_DEF } from './form/form_response.filter.fields';
import { FORM_RESPONSE_SECURITY_DEF } from './security/form_response.security';
import { FORM_RESPONSE_GRID_DEF } from './grid/form_response.grid';
import { FORM_RESPONSE_I18N_DEF } from './i18n/form_response.i18n';
import { FORM_RESPONSE_NAV_DEF } from './navigation/form_response.nav';
import { CrudDef } from 'app/modules/fwk/core/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

// Definicion de un template crud(Create,Read,Update and Delete)
export const FORM_RESPONSE_DEF: CrudDef = { 
    name: 'FORM_RESPONSE',
    i18n: FORM_RESPONSE_I18N_DEF,
    grid: FORM_RESPONSE_GRID_DEF, // Si el crud tiene grilla, entonces se agrega su definicion.
    forms: {
        filter: FORM_RESPONSE_FILTER_FORM_FIELDS_DEF, // Si el crud tiene campos de busqueda, entonces se agrega su definicion.
        //create: FORM_RESPONSE_CREATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de alta, entonces se agrega su definicion.
        //update: FORM_RESPONSE_UPDATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de modificacion, entonces se agrega su definicion.
        //read:  FORM_RESPONSE_READ_FORM_FIELDS_DEF // Si existe un formulario de edicion no exite uno de solo lectura
    },
    navigation: FORM_RESPONSE_NAV_DEF,
    security: FORM_RESPONSE_SECURITY_DEF,
    ws: {
        key: 'FORM_RESPONSE_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'FormResponse'
    },
    dialogConfig: {
        width: '800px'
    },
    filterInMemory: false,
    backButton: true
    
};
