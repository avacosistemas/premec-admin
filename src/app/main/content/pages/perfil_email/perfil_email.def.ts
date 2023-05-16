import { PERFIL_EMAIL_CREATE_FORM_FIELDS_DEF } from './form/perfil_email.create.fields';
import { PERFIL_EMAIL_UPDATE_FORM_FIELDS_DEF } from './form/perfil_email.update.fields';
import { PERFIL_EMAIL_READ_FORM_FIELDS_DEF } from './form/perfil_email.read.fields';
import { PERFIL_EMAIL_FILTER_FORM_FIELDS_DEF } from './form/perfil_email.filter.fields';
import { PERFIL_EMAIL_SECURITY_DEF } from './security/perfil_email.security';
import { PERFIL_EMAIL_GRID_DEF } from './grid/perfil_email.grid';
import { PERFIL_EMAIL_I18N_DEF } from './i18n/perfil_email.i18n';
import { PERFIL_EMAIL_NAV_DEF } from './navigation/perfil_email.nav';
import { CrudDef } from 'app/modules/fwk/core/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

// Definicion de un template crud(Create,Read,Update and Delete)
export const PERFIL_EMAIL_DEF: CrudDef = { 
    name: 'PERFIL_EMAIL',
    i18n: PERFIL_EMAIL_I18N_DEF,
    grid: PERFIL_EMAIL_GRID_DEF, // Si el crud tiene grilla, entonces se agrega su definicion.
    forms: {
        filter: PERFIL_EMAIL_FILTER_FORM_FIELDS_DEF, // Si el crud tiene campos de busqueda, entonces se agrega su definicion.
        create: PERFIL_EMAIL_CREATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de alta, entonces se agrega su definicion.
        update: PERFIL_EMAIL_UPDATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de modificacion, entonces se agrega su definicion.
        // read:  PERFIL_EMAIL_READ_FORM_FIELDS_DEF // Si existe un formulario de edicion no exite uno de solo lectura
    },
    navigation: PERFIL_EMAIL_NAV_DEF,
    security: PERFIL_EMAIL_SECURITY_DEF,
    ws: {
        key: 'PERFIL_EMAIL_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'admin/personas/contactos/email'
    },
    dialogConfig: {
        width: '800px'
    },
    filterInMemory: false,
    backButton: true   
};
