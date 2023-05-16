import { EMAIL_ACCOUNT_CREATE_FORM_FIELDS_DEF } from './form/email_account.create.fields';
import { EMAIL_ACCOUNT_UPDATE_FORM_FIELDS_DEF } from './form/email_account.update.fields';
import { EMAIL_ACCOUNT_READ_FORM_FIELDS_DEF } from './form/email_account.read.fields';
import { EMAIL_ACCOUNT_FILTER_FORM_FIELDS_DEF } from './form/email_account.filter.fields';
import { EMAIL_ACCOUNT_SECURITY_DEF } from './security/email_account.security';
import { EMAIL_ACCOUNT_GRID_DEF } from './grid/email_account.grid';
import { EMAIL_ACCOUNT_I18N_DEF } from './i18n/email_account.i18n';
import { EMAIL_ACCOUNT_NAV_DEF } from './navigation/email_account.nav';
import { CrudDef } from 'app/modules/fwk/core/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

// Definicion de un template crud(Create,Read,Update and Delete)
export const EMAIL_ACCOUNT_DEF: CrudDef = { 
    name: 'EMAIL_ACCOUNT',
    i18n: EMAIL_ACCOUNT_I18N_DEF,
    grid: EMAIL_ACCOUNT_GRID_DEF, // Si el crud tiene grilla, entonces se agrega su definicion.
    forms: {
        filter: EMAIL_ACCOUNT_FILTER_FORM_FIELDS_DEF, // Si el crud tiene campos de busqueda, entonces se agrega su definicion.
        create: EMAIL_ACCOUNT_CREATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de alta, entonces se agrega su definicion.
        update: EMAIL_ACCOUNT_UPDATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de modificacion, entonces se agrega su definicion.
        read:  EMAIL_ACCOUNT_READ_FORM_FIELDS_DEF // Si existe un formulario de edicion no exite uno de solo lectura
    },
    navigation: EMAIL_ACCOUNT_NAV_DEF,
    security: EMAIL_ACCOUNT_SECURITY_DEF,
    ws: {
        key: 'EMAIL_ACCOUNT_CRUD_URL',
        url: PREFIX_DOMAIN_API +  'EmailAccount'
    },
    dialogConfig: {
        width: '800px'
    },
    pagination: {
        page: 0,
        pageSize: 10
    }
};
