import { CAMPO_CREATE_FORM_FIELDS_DEF } from './form/campo.create.fields';
import { CAMPO_UPDATE_FORM_FIELDS_DEF } from './form/campo.update.fields';
import { CAMPO_READ_FORM_FIELDS_DEF } from './form/campo.read.fields';
import { CAMPO_FILTER_FORM_FIELDS_DEF } from './form/campo.filter.fields';
import { CAMPO_SECURITY_DEF } from './security/campo.security';
import { CAMPO_GRID_DEF } from './grid/campo.grid';
import { CAMPO_I18N_DEF } from './i18n/campo.i18n';
import { CAMPO_NAV_DEF } from './navigation/campo.nav';
import { CrudDef } from 'app/modules/fwk/core/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';
import { CAMPO_CREATE_BEHAVIOR } from './form/campo.create.behavior';
import { CAMPO_UPDATE_BEHAVIOR } from './form/campo.update.behavior';
// Definicion de un template crud(Create,Read,Update and Delete)
export const CAMPO_DEF: CrudDef = { 
    name: 'CAMPO',
    i18n: CAMPO_I18N_DEF,
    grid: CAMPO_GRID_DEF, // Si el crud tiene grilla, entonces se agrega su definicion.
    formsDef: {
        create: {
            fields: CAMPO_CREATE_FORM_FIELDS_DEF,
			fieldsBehavior: CAMPO_CREATE_BEHAVIOR,
            showSubmitContinue: true
        },
        update: {
            showSubmitContinue: true,
            fields: CAMPO_UPDATE_FORM_FIELDS_DEF,
            fieldsBehavior: CAMPO_UPDATE_BEHAVIOR
        }
    },
    forms: {
        filter: CAMPO_FILTER_FORM_FIELDS_DEF, // Si el crud tiene campos de busqueda, entonces se agrega su definicion.
        read:  CAMPO_READ_FORM_FIELDS_DEF // Si existe un formulario de edicion no exite uno de solo lectura
    },
    navigation: CAMPO_NAV_DEF,
    security: CAMPO_SECURITY_DEF,
    ws: {
        key: 'CAMPO_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'FormField'
    },
    dialogConfig: {
        width: '500px'
    },
    filterInMemory: false,
    backButton: true,
    pagination: {
        page: 0,
        pageSize: 10
    },
};
