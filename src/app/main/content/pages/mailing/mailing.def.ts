import { MAILING_CREATE_FORM_FIELDS_DEF } from './form/mailing.create.fields';
import { MAILING_UPDATE_FORM_FIELDS_DEF } from './form/mailing.update.fields';
import { MAILING_READ_FORM_FIELDS_DEF } from './form/mailing.read.fields';
import { MAILING_FILTER_FORM_FIELDS_DEF } from './form/mailing.filter.fields';
import { MAILING_SECURITY_DEF } from './security/mailing.security';
import { MAILING_GRID_DEF } from './grid/mailing.grid';
import { MAILING_I18N_DEF } from './i18n/mailing.i18n';
import { MAILING_NAV_DEF } from './navigation/mailing.nav';
import { CrudDef } from 'app/modules/fwk/core/model/component-def/crud-def';
import { MAILING_CREATE_BEHAVIOR } from './form/mailing.create.behavior';
import { PREFIX_DOMAIN_API } from 'environments/environment';

// Definicion de un template crud(Create,Read,Update and Delete)
export const MAILING_DEF: CrudDef = { 
    name: 'MAILING',
    i18n: MAILING_I18N_DEF,
    grid: MAILING_GRID_DEF, // Si el crud tiene grilla, entonces se agrega su definicion.
    forms: {
        filter: MAILING_FILTER_FORM_FIELDS_DEF, // Si el crud tiene campos de busqueda, entonces se agrega su definicion.
        create: MAILING_CREATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de alta, entonces se agrega su definicion.
        update: MAILING_UPDATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de modificacion, entonces se agrega su definicion.
        read:  MAILING_READ_FORM_FIELDS_DEF, // Si existe un formulario de edicion no exite uno de solo lectura
        createBehavior: MAILING_CREATE_BEHAVIOR
    },
    navigation: MAILING_NAV_DEF,
    security: MAILING_SECURITY_DEF,
    ws: {
        key: 'MAILING_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'Mailing'
    },
    openLink: "https://t2r34jbcni.execute-api.us-east-1.amazonaws.com/prod/estado-envio",
    dialogConfig: {
        width: '900px'
    }   
};
