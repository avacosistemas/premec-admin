import { REPORTE_HORAS_MAQUINA_CREATE_FORM_FIELDS_DEF } from './form/reporte_horas_maquina.create.fields';
import { REPORTE_HORAS_MAQUINA_UPDATE_FORM_FIELDS_DEF } from './form/reporte_horas_maquina.update.fields';
import { REPORTE_HORAS_MAQUINA_READ_FORM_FIELDS_DEF } from './form/reporte_horas_maquina.read.fields';
import { REPORTE_HORAS_MAQUINA_FILTER_FORM_FIELDS_DEF } from './form/reporte_horas_maquina.filter.fields';
import { REPORTE_HORAS_MAQUINA_SECURITY_DEF } from './security/reporte_horas_maquina.security';
import { REPORTE_HORAS_MAQUINA_GRID_DEF } from './grid/reporte_horas_maquina.grid';
import { REPORTE_HORAS_MAQUINA_I18N_DEF } from './i18n/reporte_horas_maquina.i18n';
import { REPORTE_HORAS_MAQUINA_NAV_DEF } from './navigation/reporte_horas_maquina.nav';
import { CrudDef } from 'app/modules/fwk/core/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

// Definicion de un template crud(Create,Read,Update and Delete)
export const REPORTE_HORAS_MAQUINA_DEF: CrudDef = { 
    name: 'REPORTE_HORAS_MAQUINA',
    i18n: REPORTE_HORAS_MAQUINA_I18N_DEF,
    grid: REPORTE_HORAS_MAQUINA_GRID_DEF, // Si el crud tiene grilla, entonces se agrega su definicion.
    forms: {
        filter: REPORTE_HORAS_MAQUINA_FILTER_FORM_FIELDS_DEF, // Si el crud tiene campos de busqueda, entonces se agrega su definicion.
        // create: REPORTE_HORAS_MAQUINA_CREATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de alta, entonces se agrega su definicion.
        // update: REPORTE_HORAS_MAQUINA_UPDATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de modificacion, entonces se agrega su definicion.
        // read:  REPORTE_HORAS_MAQUINA_READ_FORM_FIELDS_DEF // Si existe un formulario de edicion no exite uno de solo lectura
    },
    navigation: REPORTE_HORAS_MAQUINA_NAV_DEF,
    security: REPORTE_HORAS_MAQUINA_SECURITY_DEF,
    ws: {
        key: 'REPORTE_HORAS_MAQUINA_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'horasMaquinaReporte'
    },
    dialogConfig: {
        width: '400px'
    },
    cancelInitSearch: true,
    filterInMemory: false,
    pagination: {
        page: 0,
        pageSize: 100
    }
};
