import { FORMULARIO_CREATE_FORM_FIELDS_DEF } from './form/formulario.create.fields';
import { FORMULARIO_UPDATE_FORM_FIELDS_DEF } from './form/formulario.update.fields';
import { FORMULARIO_READ_FORM_FIELDS_DEF } from './form/formulario.read.fields';
import { FORMULARIO_FILTER_FORM_FIELDS_DEF } from './form/formulario.filter.fields';
import { FORMULARIO_SECURITY_DEF } from './security/formulario.security';
import { FORMULARIO_GRID_DEF } from './grid/formulario.grid';
import { FORMULARIO_I18N_DEF } from './i18n/formulario.i18n';
import { FORMULARIO_NAV_DEF } from './navigation/formulario.nav';
import { CrudDef } from 'app/modules/fwk/core/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

// Definicion de un template crud(Create,Read,Update and Delete)
export const FORMULARIO_DEF: CrudDef = { 
    name: 'FORMULARIO',
    i18n: FORMULARIO_I18N_DEF,
    grid: FORMULARIO_GRID_DEF, // Si el crud tiene grilla, entonces se agrega su definicion.
    formsDef: {
        create: {
            fields: FORMULARIO_CREATE_FORM_FIELDS_DEF,
            showSubmitContinue: true
        },
        update: {
            fields: FORMULARIO_UPDATE_FORM_FIELDS_DEF,
            showSubmitContinue: true
        }
    },
    forms: {
        filter: FORMULARIO_FILTER_FORM_FIELDS_DEF, // Si el crud tiene campos de busqueda, entonces se agrega su definicion.
        read:  FORMULARIO_READ_FORM_FIELDS_DEF // Si existe un formulario de edicion no exite uno de solo lectura
    },
    navigation: FORMULARIO_NAV_DEF,
    security: FORMULARIO_SECURITY_DEF,
    ws: {
        key: 'FORMULARIO_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'Form'
    },
    dialogConfig: {
        width: '900px'
    },
    forceGetDetail: true,
    filterInMemory: false,
    serverPagination: true,
    pagination: {
        page: 0,
        pageSize: 10
    }
};
