import { CERTIFICADO_MATRICULADO_CREATE_FORM_FIELDS_DEF } from './form/certificado_matriculado.create.fields';
import { CERTIFICADO_MATRICULADO_UPDATE_FORM_FIELDS_DEF } from './form/certificado_matriculado.update.fields';
import { CERTIFICADO_MATRICULADO_READ_FORM_FIELDS_DEF } from './form/certificado_matriculado.read.fields';
import { CERTIFICADO_MATRICULADO_FILTER_FORM_FIELDS_DEF } from './form/certificado_matriculado.filter.fields';
import { CERTIFICADO_MATRICULADO_SECURITY_DEF } from './security/certificado_matriculado.security';
import { CERTIFICADO_MATRICULADO_GRID_DEF } from './grid/certificado_matriculado.grid';
import { CERTIFICADO_MATRICULADO_I18N_DEF } from './i18n/certificado_matriculado.i18n';
import { CERTIFICADO_MATRICULADO_NAV_DEF } from './navigation/certificado_matriculado.nav';
import { CrudDef } from 'app/modules/fwk/core/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

// Definicion de un template crud(Create,Read,Update and Delete)
export const CERTIFICADO_MATRICULADO_DEF: CrudDef = { 
    name: 'CERTIFICADO_MATRICULADO',
    i18n: CERTIFICADO_MATRICULADO_I18N_DEF,
    grid: CERTIFICADO_MATRICULADO_GRID_DEF, // Si el crud tiene grilla, entonces se agrega su definicion.
    forms: {
        filter: CERTIFICADO_MATRICULADO_FILTER_FORM_FIELDS_DEF, // Si el crud tiene campos de busqueda, entonces se agrega su definicion.
        create: CERTIFICADO_MATRICULADO_CREATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de alta, entonces se agrega su definicion.
        // update: CERTIFICADO_MATRICULADO_UPDATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de modificacion, entonces se agrega su definicion.
        read:  CERTIFICADO_MATRICULADO_READ_FORM_FIELDS_DEF // Si existe un formulario de edicion no exite uno de solo lectura
    },
    navigation: CERTIFICADO_MATRICULADO_NAV_DEF,
    security: CERTIFICADO_MATRICULADO_SECURITY_DEF,
    ws: {
        key: 'CERTIFICADO_MATRICULADO_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'admin/certificados'
    },
    dialogConfig: {
        width: '800px'
    },
    filterInMemory: false,
    backButton: true   
};
