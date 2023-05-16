import { CONTENIDO_CREATE_FORM_FIELDS_DEF } from './form/contenido.create.fields';
import { CONTENIDO_UPDATE_FORM_FIELDS_DEF } from './form/contenido.update.fields';
import { CONTENIDO_READ_FORM_FIELDS_DEF } from './form/contenido.read.fields';
import { CONTENIDO_FILTER_FORM_FIELDS_DEF } from './form/contenido.filter.fields';
import { CONTENIDO_SECURITY_DEF } from './security/contenido.security';
import { CONTENIDO_GRID_DEF } from './grid/contenido.grid';
import { CONTENIDO_I18N_DEF } from './i18n/contenido.i18n';
import { CONTENIDO_NAV_DEF } from './navigation/contenido.nav';
import { CrudDef } from '../../../../modules/fwk/core/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

// Definicion de un template crud(Create,Read,Update and Delete)
export const CONTENIDO_DEF: CrudDef = { 
    name: 'CONTENIDO',
    i18n: CONTENIDO_I18N_DEF,
    grid: CONTENIDO_GRID_DEF, // Si el crud tiene grilla, entonces se agrega su definicion.
    formsDef: {
        update: {
            fields: CONTENIDO_UPDATE_FORM_FIELDS_DEF,
            showSubmitContinue: true
        },
        create: {
            fields: CONTENIDO_CREATE_FORM_FIELDS_DEF,
            showSubmitContinue: true
        }
    },
    forms: {
        filter: CONTENIDO_FILTER_FORM_FIELDS_DEF, // Si el crud tiene campos de busqueda, entonces se agrega su definicion.
        read:  CONTENIDO_READ_FORM_FIELDS_DEF // Si existe un formulario de edicion no exite uno de solo lectura
    },
    navigation: CONTENIDO_NAV_DEF,
    security: CONTENIDO_SECURITY_DEF,
    ws: {
        key: 'CONTENIDO_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'Content'
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
    cancelInitSearch: false
};
