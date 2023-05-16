import { CONTENIDO_HISTORY_READ_FORM_FIELDS_DEF } from './form/contenidoHistory.read.fields';
import { CONTENIDO_HISTORY_FILTER_FORM_FIELDS_DEF } from './form/contenidoHistory.filter.fields';
import { CONTENIDO_HISTORY_SECURITY_DEF } from './security/contenidoHistory.security';
import { CONTENIDO_HISTORY_GRID_DEF } from './grid/contenidoHistory.grid';
import { CONTENIDO_HISTORY_I18N_DEF } from './i18n/contenidoHistory.i18n';
import { CONTENIDO_HISTORY_NAV_DEF } from './navigation/contenidoHistory.nav';
import { CrudDef } from '../../../../modules/fwk/core/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

// Definicion de un template crud(Create,Read,Update and Delete)
export const CONTENIDO_HISTORY_DEF: CrudDef = { 
    name: 'CONTENIDO_HISTORY',
    i18n: CONTENIDO_HISTORY_I18N_DEF,
    grid: CONTENIDO_HISTORY_GRID_DEF, // Si el crud tiene grilla, entonces se agrega su definicion.
    forms: {
        filter: CONTENIDO_HISTORY_FILTER_FORM_FIELDS_DEF, // Si el crud tiene campos de busqueda, entonces se agrega su definicion.
        read:  CONTENIDO_HISTORY_READ_FORM_FIELDS_DEF // Si existe un formulario de edicion no exite uno de solo lectura
    },
    navigation: CONTENIDO_HISTORY_NAV_DEF,
    security: CONTENIDO_HISTORY_SECURITY_DEF,
    ws: {
        key: 'CONTENIDO_HISTORY_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'Content/GetVersions'
    },
    dialogConfig: {
        width: '800px'
    },
    filterInMemory: false,
    backButton: true
};
