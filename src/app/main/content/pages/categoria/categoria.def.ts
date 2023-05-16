import { CATEGORIA_CREATE_FORM_FIELDS_DEF } from './form/categoria.create.fields';
import { CATEGORIA_UPDATE_FORM_FIELDS_DEF } from './form/categoria.update.fields';
import { CATEGORIA_READ_FORM_FIELDS_DEF } from './form/categoria.read.fields';
import { CATEGORIA_FILTER_FORM_FIELDS_DEF } from './form/categoria.filter.fields';
import { CATEGORIA_SECURITY_DEF } from './security/categoria.security';
import { CATEGORIA_GRID_DEF } from './grid/categoria.grid';
import { CATEGORIA_I18N_DEF } from './i18n/categoria.i18n';
import { CATEGORIA_NAV_DEF } from './navigation/categoria.nav';
import { CrudDef } from 'app/modules/fwk/core/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

// Definicion de un template crud(Create,Read,Update and Delete)
export const CATEGORIA_DEF: CrudDef = { 
    name: 'CATEGORIA',
    i18n: CATEGORIA_I18N_DEF,
    grid: CATEGORIA_GRID_DEF, // Si el crud tiene grilla, entonces se agrega su definicion.
    forms: {
        filter: CATEGORIA_FILTER_FORM_FIELDS_DEF, // Si el crud tiene campos de busqueda, entonces se agrega su definicion.
        create: CATEGORIA_CREATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de alta, entonces se agrega su definicion.
        update: CATEGORIA_UPDATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de modificacion, entonces se agrega su definicion.
        read:  CATEGORIA_READ_FORM_FIELDS_DEF // Si existe un formulario de edicion no exite uno de solo lectura
    },
    navigation: CATEGORIA_NAV_DEF,
    security: CATEGORIA_SECURITY_DEF,
    ws: {
        key: 'CATEGORIA_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'Categoria'
    },
    dialogConfig: {
        width: '400px'
    },
    pagination: {
        page: 0,
        pageSize: 10
    }
};
