import { PERFIL_DOMICILIO_CREATE_FORM_FIELDS_DEF } from './form/perfil_domicilio.create.fields';
import { PERFIL_DOMICILIO_UPDATE_FORM_FIELDS_DEF } from './form/perfil_domicilio.update.fields';
import { PERFIL_DOMICILIO_READ_FORM_FIELDS_DEF } from './form/perfil_domicilio.read.fields';
import { PERFIL_DOMICILIO_FILTER_FORM_FIELDS_DEF } from './form/perfil_domicilio.filter.fields';
import { PERFIL_DOMICILIO_SECURITY_DEF } from './security/perfil_domicilio.security';
import { PERFIL_DOMICILIO_GRID_DEF } from './grid/perfil_domicilio.grid';
import { PERFIL_DOMICILIO_I18N_DEF } from './i18n/perfil_domicilio.i18n';
import { PERFIL_DOMICILIO_NAV_DEF } from './navigation/perfil_domicilio.nav';
import { CrudDef } from 'app/modules/fwk/core/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

// Definicion de un template crud(Create,Read,Update and Delete)
export const PERFIL_DOMICILIO_DEF: CrudDef = { 
    name: 'PERFIL_DOMICILIO',
    i18n: PERFIL_DOMICILIO_I18N_DEF,
    grid: PERFIL_DOMICILIO_GRID_DEF, // Si el crud tiene grilla, entonces se agrega su definicion.
    forms: {
        filter: PERFIL_DOMICILIO_FILTER_FORM_FIELDS_DEF, // Si el crud tiene campos de busqueda, entonces se agrega su definicion.
        create: PERFIL_DOMICILIO_CREATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de alta, entonces se agrega su definicion.
        update: PERFIL_DOMICILIO_UPDATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de modificacion, entonces se agrega su definicion.
        read:  PERFIL_DOMICILIO_READ_FORM_FIELDS_DEF // Si existe un formulario de edicion no exite uno de solo lectura
    },
    navigation: PERFIL_DOMICILIO_NAV_DEF,
    security: PERFIL_DOMICILIO_SECURITY_DEF,
    ws: {
        key: 'PERFIL_DOMICILIO_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'admin/personas/domicilio'
    },
    dialogConfig: {
        width: '800px'
    },
    filterInMemory: false,
    backButton: true   
};
