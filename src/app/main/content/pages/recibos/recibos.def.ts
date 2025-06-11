import { CrudDef } from 'app/modules/fwk/core/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';
import { RECIBOS_FILTER_FORM_FIELDS_DEF } from './form/recibos.filter.fields';
import { RECIBOS_I18N_DEF } from './i18n/recibos.i18n';
import { RECIBOS_GRID_DEF } from './grid/recibos.grid';
import { RECIBOS_NAV_DEF } from './navigation/recibos.nav';

export const RECIBOS_DEF: CrudDef = {
    name: 'RECIBOS',
    i18n: RECIBOS_I18N_DEF,
    grid: RECIBOS_GRID_DEF,
        forms: {
        filter: RECIBOS_FILTER_FORM_FIELDS_DEF,
    },
    navigation: RECIBOS_NAV_DEF,
    ws: {
        key: 'RECIBOS_LIST_WS',
        url: PREFIX_DOMAIN_API + 'listarRecibosPorUsuario',
    },
    dialogConfig: {
        width: '400px'
    },
    filterInMemory: true,
    backButton: false,
    serverPagination: false,
    pagination: {
        page: 0,
        pageSize: 10
    },
};