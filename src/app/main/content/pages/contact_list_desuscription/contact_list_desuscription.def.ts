import { CONTACT_LIST_DESUSCRIPTION_READ_FORM_FIELDS_DEF } from './form/contact_list_desuscription.read.fields';
import { CONTACT_LIST_DESUSCRIPTION_FILTER_FORM_FIELDS_DEF } from './form/contact_list_desuscription.filter.fields';
import { CONTACT_LIST_DESUSCRIPTION_SECURITY_DEF } from './security/contact_list_desuscription.security';
import { CONTACT_LIST_DESUSCRIPTION_GRID_DEF } from './grid/contact_list_desuscription.grid';
import { CONTACT_LIST_DESUSCRIPTION_I18N_DEF } from './i18n/contact_list._desuscription.i18n';
import { CONTACT_LIST_DESUSCRIPTION_NAV_DEF } from './navigation/contact_list_desuscription.nav';
import { CrudDef } from 'app/modules/fwk/core/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

// Definicion de un template crud(Create,Read,Update and Delete)
export const CONTACT_LIST_DESUSCRIPTION_DEF: CrudDef = { 
    name: 'CONTACT_LIST_DESUSCRIPTION',
    i18n: CONTACT_LIST_DESUSCRIPTION_I18N_DEF,
    grid: CONTACT_LIST_DESUSCRIPTION_GRID_DEF, // Si el crud tiene grilla, entonces se agrega su definicion.
    forms: {
        filter: CONTACT_LIST_DESUSCRIPTION_FILTER_FORM_FIELDS_DEF, // Si el crud tiene campos de busqueda, entonces se agrega su definicion.
        read:  CONTACT_LIST_DESUSCRIPTION_READ_FORM_FIELDS_DEF // Si existe un formulario de edicion no exite uno de solo lectura
    },
    navigation: CONTACT_LIST_DESUSCRIPTION_NAV_DEF,
    security: CONTACT_LIST_DESUSCRIPTION_SECURITY_DEF,
    ws: {
        key: 'CONTACT_LIST_DESUSCRIPTION_CRUD_URL',        
        url: PREFIX_DOMAIN_API + 'contactListDesuscription/Desuscription/'
    },
    dialogConfig: {
        width: '800px'
    },
    filterInMemory: false,
    backButton: true     
};
