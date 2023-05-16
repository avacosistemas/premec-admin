import { CrudDef } from 'app/modules/fwk/core/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';
import { PERFIL_CUENTA_CORRIENTE_FILTER_FORM_FIELDS_DEF } from './form/perfil_cuenta_corriente.filter';
import { PERFIL_CUENTA_CORRIENTE_GRID_DEF } from './grid/perfil_cuenta_corriente.grid';
import { PERFIL_CUENTA_CORRIENTE_I18N_DEF } from './i18n/perfil_cuenta_corriente.i18n';
import { PERFIL_CUENTA_CORRIENTE_NAV_DEF } from './navigation/perfil_cuenta_corriente.nav';
import { PERFIL_CUENTA_CORRIENTE_SECURITY_DEF } from './security/perfil_cuenta_corriente.security';

// Definicion de un template crud(Create,Read,Update and Delete)
export const PERFIL_CUENTA_CORRIENTE_DEF: CrudDef = { 
    name: 'PERFIL_CUENTA_CORRIENTE',
    i18n: PERFIL_CUENTA_CORRIENTE_I18N_DEF,
    grid: PERFIL_CUENTA_CORRIENTE_GRID_DEF, // Si el crud tiene grilla, entonces se agrega su definicion.
    forms: {
        filter: PERFIL_CUENTA_CORRIENTE_FILTER_FORM_FIELDS_DEF, // Si el crud tiene campos de busqueda, entonces se agrega su definicion.
    },
    navigation: PERFIL_CUENTA_CORRIENTE_NAV_DEF,
    security: PERFIL_CUENTA_CORRIENTE_SECURITY_DEF,
    ws: {
        key: 'PERFIL_CUENTA_CORRIENTE_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'admin/personas/cuentacorriente'
    },
    dialogConfig: {
        width: '800px'
    },
    downloadBoleta: true,
    filterInMemory: false,
    backButton: true   
};
