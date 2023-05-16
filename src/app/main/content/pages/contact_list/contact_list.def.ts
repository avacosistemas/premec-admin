import { CONTACT_LIST_CREATE_FORM_FIELDS_DEF } from './form/contact_list.create.fields';
import { CONTACT_LIST_UPDATE_FORM_FIELDS_DEF } from './form/contact_list.update.fields';
import { CONTACT_LIST_READ_FORM_FIELDS_DEF } from './form/contact_list.read.fields';
import { CONTACT_LIST_FILTER_FORM_FIELDS_DEF } from './form/contact_list.filter.fields';
import { CONTACT_LIST_SECURITY_DEF } from './security/contact_list.security';
import { CONTACT_LIST_GRID_DEF } from './grid/contact_list.grid';
import { CONTACT_LIST_I18N_DEF } from './i18n/contact_list.i18n';
import { CONTACT_LIST_NAV_DEF } from './navigation/contact_list.nav';
import { CrudDef } from 'app/modules/fwk/core/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

// Definicion de un template crud(Create,Read,Update and Delete)
export const CONTACT_LIST_DEF: CrudDef = { 
    name: 'CONTACT_LIST',
    i18n: CONTACT_LIST_I18N_DEF,
    grid: CONTACT_LIST_GRID_DEF, // Si el crud tiene grilla, entonces se agrega su definicion.
    forms: {
        filter: CONTACT_LIST_FILTER_FORM_FIELDS_DEF, // Si el crud tiene campos de busqueda, entonces se agrega su definicion.
        create: CONTACT_LIST_CREATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de alta, entonces se agrega su definicion.
        update: CONTACT_LIST_UPDATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de modificacion, entonces se agrega su definicion.
        read:  CONTACT_LIST_READ_FORM_FIELDS_DEF // Si existe un formulario de edicion no exite uno de solo lectura
    },
    navigation: CONTACT_LIST_NAV_DEF,
    security: CONTACT_LIST_SECURITY_DEF,
    ws: {
        key: 'CONTACT_LIST_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'ContactList'
    },
    dialogConfig: {
        width: '800px'
    },
    pagination: {
        page: 0,
        pageSize: 10
    }
};
