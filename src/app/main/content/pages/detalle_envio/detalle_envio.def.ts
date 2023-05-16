import { DETALLE_ENVIO_CREATE_FORM_FIELDS_DEF } from './form/detalle_envio.create.fields';
import { DETALLE_ENVIO_UPDATE_FORM_FIELDS_DEF } from './form/detalle_envio.update.fields';
import { DETALLE_ENVIO_READ_FORM_FIELDS_DEF } from './form/detalle_envio.read.fields';
import { DETALLE_ENVIO_FILTER_FORM_FIELDS_DEF } from './form/detalle_envio.filter.fields';
import { DETALLE_ENVIO_SECURITY_DEF } from './security/detalle_envio.security';
import { DETALLE_ENVIO_GRID_DEF } from './grid/detalle_envio.grid';
import { DETALLE_ENVIO_I18N_DEF } from './i18n/detalle_envio.i18n';
import { DETALLE_ENVIO_NAV_DEF } from './navigation/detalle_envio.nav';
import { CrudDef } from 'app/modules/fwk/core/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

// Definicion de un template crud(Create,Read,Update and Delete)
export const DETALLE_ENVIO_DEF: CrudDef = { 
    name: 'DETALLE_ENVIO',
    i18n: DETALLE_ENVIO_I18N_DEF,
    grid: DETALLE_ENVIO_GRID_DEF, // Si el crud tiene grilla, entonces se agrega su definicion.
    forms: {
        filter: DETALLE_ENVIO_FILTER_FORM_FIELDS_DEF, // Si el crud tiene campos de busqueda, entonces se agrega su definicion.
        create: DETALLE_ENVIO_CREATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de alta, entonces se agrega su definicion.
        update: DETALLE_ENVIO_UPDATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de modificacion, entonces se agrega su definicion.
        read:  DETALLE_ENVIO_READ_FORM_FIELDS_DEF // Si existe un formulario de edicion no exite uno de solo lectura
    },
    navigation: DETALLE_ENVIO_NAV_DEF,
    security: DETALLE_ENVIO_SECURITY_DEF,
    ws: {
        key: PREFIX_DOMAIN_API + 'DETALLE_ENVIO_CRUD_URL',
        url: 'DetallEnvio'
    },
    dialogConfig: {
        width: '400px'
    }   
};
