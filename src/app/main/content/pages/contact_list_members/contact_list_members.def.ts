import { CONTACT_LIST_MEMBERS_READ_FORM_FIELDS_DEF } from './form/contact_list_members.read.fields';
import { CONTACT_LIST_MEMBERS_FILTER_FORM_FIELDS_DEF } from './form/contact_list_members.filter.fields';
import { CONTACT_LIST_MEMBERS_CREATE_FORM_FIELDS_DEF } from './form/contact_list_members.create.fields';
import { CONTACT_LIST_MEMBERS_CREATE_BEHAVIOR } from './form/contact_list_members.create.behavior';
import { CONTACT_LIST_MEMBERS_SECURITY_DEF } from './security/contact_list_members.security';
import { CONTACT_LIST_MEMBERS_GRID_DEF } from './grid/contact_list_members.grid';
import { CONTACT_LIST_MEMBERS_I18N_DEF } from './i18n/contact_list_members.i18n';
import { CONTACT_LIST_MEMBERS_NAV_DEF } from './navigation/contact_list_members.nav';
import { CrudDef } from 'app/modules/fwk/core/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

// Definicion de un template crud(Create,Read,Update and Delete)
export const CONTACT_LIST_MEMBERS_DEF: CrudDef = { 
    name: 'CONTACT_LIST_MEMBERS',
    i18n: CONTACT_LIST_MEMBERS_I18N_DEF,
    grid: CONTACT_LIST_MEMBERS_GRID_DEF, // Si el crud tiene grilla, entonces se agrega su definicion.
    forms: {
        filter: CONTACT_LIST_MEMBERS_FILTER_FORM_FIELDS_DEF, // Si el crud tiene campos de busqueda, entonces se agrega su definicion.
        create: CONTACT_LIST_MEMBERS_CREATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de alta, entonces se agrega su definicion.
        read:  CONTACT_LIST_MEMBERS_READ_FORM_FIELDS_DEF, // Si existe un formulario de edicion no exite uno de solo lectura
        createBehavior: CONTACT_LIST_MEMBERS_CREATE_BEHAVIOR
    },
    navigation: CONTACT_LIST_MEMBERS_NAV_DEF,
    security: CONTACT_LIST_MEMBERS_SECURITY_DEF,
    ws: {
        key: 'CONTACT_LIST_MEMBERS_CRUD_URL',        
        url: PREFIX_DOMAIN_API + 'ContactList/Members/'
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
    backButton: true     
};
