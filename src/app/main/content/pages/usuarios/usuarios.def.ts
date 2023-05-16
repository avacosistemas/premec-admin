import { USUARIOS_CREATE_FORM_FIELDS_DEF } from './form/usuarios.create.fields';
import { USUARIOS_UPDATE_FORM_FIELDS_DEF } from './form/usuarios.update.fields';
import { USUARIOS_READ_FORM_FIELDS_DEF } from './form/usuarios.read.fields';
import { USUARIOS_FILTER_FORM_FIELDS_DEF } from './form/usuarios.filter.fields';
import { USUARIOS_SECURITY_DEF } from './security/usuarios.security';
import { USUARIOS_GRID_DEF } from './grid/usuarios.grid';
import { USUARIOS_I18N_DEF } from './i18n/usuarios.i18n';
import { USUARIOS_NAV_DEF } from './navigation/usuarios.nav';
import { CrudDef } from 'app/modules/fwk/core/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

// Definicion de un template crud(Create,Read,Update and Delete)
export const USUARIOS_DEF: CrudDef = { 
    name: 'USUARIOS',
    i18n: USUARIOS_I18N_DEF,
    grid: USUARIOS_GRID_DEF, // Si el crud tiene grilla, entonces se agrega su definicion.
    forms: {
        filter: USUARIOS_FILTER_FORM_FIELDS_DEF, // Si el crud tiene campos de busqueda, entonces se agrega su definicion.
        create: USUARIOS_CREATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de alta, entonces se agrega su definicion.
        update: USUARIOS_UPDATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de modificacion, entonces se agrega su definicion.
        read:  USUARIOS_READ_FORM_FIELDS_DEF // Si existe un formulario de edicion no exite uno de solo lectura
    },
    navigation: USUARIOS_NAV_DEF,
    security: USUARIOS_SECURITY_DEF,
    ws: {
        key: 'USUARIOS_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'users/'
    },
    dialogConfig: {
        width: '400px'
    }   
};
