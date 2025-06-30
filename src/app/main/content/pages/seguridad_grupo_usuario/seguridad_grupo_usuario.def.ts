import { SEGURIDAD_GRUPO_USUARIO_CREATE_FORM_FIELDS_DEF } from './form/seguridad_grupo_usuario.create.fields';
import { SEGURIDAD_GRUPO_USUARIO_FILTER_FORM_FIELDS_DEF } from './form/seguridad_grupo_usuario.filter.fields';
import { SEGURIDAD_GRUPO_USUARIO_SECURITY_DEF } from './security/seguridad_grupo_usuario.security';
import { SEGURIDAD_GRUPO_USUARIO_GRID_DEF } from './grid/seguridad_grupo_usuario.grid';
import { SEGURIDAD_GRUPO_USUARIO_I18N_DEF } from './i18n/seguridad_grupo_usuario.i18n';
import { SEGURIDAD_GRUPO_USUARIO_NAV_DEF } from './navigation/seguridad_grupo_usuario.nav';
import { CrudDef } from 'app/modules/fwk/core/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

// Definicion de un template crud(Create,Read,Update and Delete)
export const SEGURIDAD_GRUPO_USUARIO_DEF: CrudDef = { 
    name: 'SEGURIDAD_GRUPO_USUARIO',
    i18n: SEGURIDAD_GRUPO_USUARIO_I18N_DEF,
    grid: SEGURIDAD_GRUPO_USUARIO_GRID_DEF, // Si el crud tiene grilla, entonces se agrega su definicion.
    formsDef: {
        create: {
            showSubmitContinue: true,
            fields: SEGURIDAD_GRUPO_USUARIO_CREATE_FORM_FIELDS_DEF
        }
    },
    forms: {
        filter: SEGURIDAD_GRUPO_USUARIO_FILTER_FORM_FIELDS_DEF, // Si el crud tiene campos de busqueda, entonces se agrega su definicion.
        // create: SEGURIDAD_GRUPO_USUARIO_CREATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de alta, entonces se agrega su definicion.
        // update: SEGURIDAD_GRUPO_USUARIO_UPDATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de modificacion, entonces se agrega su definicion.
        // read:  SEGURIDAD_GRUPO_USUARIO_READ_FORM_FIELDS_DEF // Si existe un formulario de edicion no exite uno de solo lectura
    },
    navigation: SEGURIDAD_GRUPO_USUARIO_NAV_DEF,
    security: SEGURIDAD_GRUPO_USUARIO_SECURITY_DEF,
    ws: {
        key: 'SEGURIDAD_GRUPO_USUARIO_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'acceso'
    },
    dialogConfig: {
        width: '600px'
    },
    filterInMemory: false,
    backButton: true,
    serverPagination: false,
    pagination: {
        page: 0,
        pageSize: 10
    },
    cancelInitSearch: false
};
