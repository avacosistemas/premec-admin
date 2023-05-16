import { INDICE_CREATE_FORM_FIELDS_DEF } from './form/indice.create.fields';
import { INDICE_UPDATE_FORM_FIELDS_DEF } from './form/indice.update.fields';
import { INDICE_READ_FORM_FIELDS_DEF } from './form/indice.read.fields';
import { INDICE_FILTER_FORM_FIELDS_DEF } from './form/indice.filter.fields';
import { INDICE_SECURITY_DEF } from './security/indice.security';
import { INDICE_GRID_DEF } from './grid/indice.grid';
import { INDICE_I18N_DEF } from './i18n/indice.i18n';
import { INDICE_NAV_DEF } from './navigation/indice.nav';
import { CrudDef } from 'app/modules/fwk/core/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';


// Definicion de un template crud(Create,Read,Update and Delete)
export const INDICE_DEF: CrudDef = { 
    name: 'INDICE',
    i18n: INDICE_I18N_DEF,
    grid: INDICE_GRID_DEF, // Si el crud tiene grilla, entonces se agrega su definicion.
    forms: {
        filter: INDICE_FILTER_FORM_FIELDS_DEF, // Si el crud tiene campos de busqueda, entonces se agrega su definicion.
        create: INDICE_CREATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de alta, entonces se agrega su definicion.
        //update: INDICE_UPDATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de modificacion, entonces se agrega su definicion.
        //read:  INDICE_READ_FORM_FIELDS_DEF // Si existe un formulario de edicion no exite uno de solo lectura
    },
    navigation: INDICE_NAV_DEF,
    security: INDICE_SECURITY_DEF,
    ws: {
        key: 'INDICE_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'Indice'
    },
    dialogConfig: {
        width: '800px'
    },
    pagination: {
        page: 0,
        pageSize: 10
    }
};
