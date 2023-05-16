import { MATRICULA_TIPO_CREATE_FORM_FIELDS_DEF } from './form/matricula_tipo.create.fields';
import { MATRICULA_TIPO_UPDATE_FORM_FIELDS_DEF } from './form/matricula_tipo.update.fields';
import { MATRICULA_TIPO_READ_FORM_FIELDS_DEF } from './form/matricula_tipo.read.fields';
import { MATRICULA_TIPO_FILTER_FORM_FIELDS_DEF } from './form/matricula_tipo.filter.fields';
import { MATRICULA_TIPO_SECURITY_DEF } from './security/matricula_tipo.security';
import { MATRICULA_TIPO_GRID_DEF } from './grid/matricula_tipo.grid';
import { MATRICULA_TIPO_I18N_DEF } from './i18n/matricula_tipo.i18n';
import { MATRICULA_TIPO_NAV_DEF } from './navigation/matricula_tipo.nav';
import { CrudDef } from 'app/modules/fwk/core/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

// Definicion de un template crud(Create,Read,Update and Delete)
export const MATRICULA_TIPO_DEF: CrudDef = { 
    name: 'MATRICULA_TIPO',
    i18n: MATRICULA_TIPO_I18N_DEF,
    grid: MATRICULA_TIPO_GRID_DEF, // Si el crud tiene grilla, entonces se agrega su definicion.
    forms: {
        filter: MATRICULA_TIPO_FILTER_FORM_FIELDS_DEF, // Si el crud tiene campos de busqueda, entonces se agrega su definicion.
        create: MATRICULA_TIPO_CREATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de alta, entonces se agrega su definicion.
        update: MATRICULA_TIPO_UPDATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de modificacion, entonces se agrega su definicion.
        read:  MATRICULA_TIPO_READ_FORM_FIELDS_DEF // Si existe un formulario de edicion no exite uno de solo lectura
    },
    navigation: MATRICULA_TIPO_NAV_DEF,
    security: MATRICULA_TIPO_SECURITY_DEF,
    ws: {
        key: 'MATRICULA_TIPO_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'MatriculaTipo'
    },
    dialogConfig: {
        width: '800px'
    },
    pagination: {
        page: 0,
        pageSize: 10
    }
};
