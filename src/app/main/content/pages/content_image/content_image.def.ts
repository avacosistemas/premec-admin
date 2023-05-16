import { CONTENT_IMAGE_CREATE_FORM_FIELDS_DEF } from './form/content_image.create.fields';
import { CONTENT_IMAGE_UPDATE_FORM_FIELDS_DEF } from './form/content_image.update.fields';
import { CONTENT_IMAGE_READ_FORM_FIELDS_DEF } from './form/content_image.read.fields';
import { CONTENT_IMAGE_FILTER_FORM_FIELDS_DEF } from './form/content_image.filter.fields';
import { CONTENT_IMAGE_SECURITY_DEF } from './security/content_image.security';
import { CONTENT_IMAGE_GRID_DEF } from './grid/content_image.grid';
import { CONTENT_IMAGE_I18N_DEF } from './i18n/content_image.i18n';
import { CONTENT_IMAGE_NAV_DEF } from './navigation/content_image.nav';
import { CrudDef } from 'app/modules/fwk/core/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

// Definicion de un template crud(Create,Read,Update and Delete)
export const CONTENT_IMAGE_DEF: CrudDef = { 
    name: 'CONTENT_IMAGE',
    i18n: CONTENT_IMAGE_I18N_DEF,
    grid: CONTENT_IMAGE_GRID_DEF, // Si el crud tiene grilla, entonces se agrega su definicion.
    formsDef: {
        create: {
            showSubmitContinue: true,
            fields: CONTENT_IMAGE_CREATE_FORM_FIELDS_DEF
        },
        update: {
            showSubmitContinue: true,
            fields: CONTENT_IMAGE_UPDATE_FORM_FIELDS_DEF
        }
    },
    forms: {
        filter: CONTENT_IMAGE_FILTER_FORM_FIELDS_DEF, // Si el crud tiene campos de busqueda, entonces se agrega su definicion.
        // create: CONTENT_IMAGE_CREATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de alta, entonces se agrega su definicion.
        // update: CONTENT_IMAGE_UPDATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de modificacion, entonces se agrega su definicion.
        //read:  CONTENT_IMAGE_READ_FORM_FIELDS_DEF // Si existe un formulario de edicion no exite uno de solo lectura
    },
    navigation: CONTENT_IMAGE_NAV_DEF,
    security: CONTENT_IMAGE_SECURITY_DEF,
    ws: {
        key: 'CONTENT_IMAGE_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'ContentImage'
    },
    dialogConfig: {
        width: '800px'
    },
    filterInMemory: false,
    backButton: true   
};
