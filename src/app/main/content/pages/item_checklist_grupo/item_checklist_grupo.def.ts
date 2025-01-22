import { ITEM_CHECKLIST_GRUPO_CREATE_FORM_FIELDS_DEF } from './form/item_checklist_grupo.create.fields';
import { ITEM_CHECKLIST_GRUPO_UPDATE_FORM_FIELDS_DEF } from './form/item_checklist_grupo.update.fields';
import { ITEM_CHECKLIST_GRUPO_READ_FORM_FIELDS_DEF } from './form/item_checklist_grupo.read.fields';
import { ITEM_CHECKLIST_GRUPO_FILTER_FORM_FIELDS_DEF } from './form/item_checklist_grupo.filter.fields';
import { ITEM_CHECKLIST_GRUPO_SECURITY_DEF } from './security/item_checklist_grupo.security';
import { ITEM_CHECKLIST_GRUPO_GRID_DEF } from './grid/item_checklist_grupo.grid';
import { ITEM_CHECKLIST_GRUPO_I18N_DEF } from './i18n/item_checklist_grupo.i18n';
import { ITEM_CHECKLIST_GRUPO_NAV_DEF } from './navigation/item_checklist_grupo.nav';

// Definicion de un template crud(Create,Read,Update and Delete)
export const ITEM_CHECKLIST_GRUPO_DEF: CrudDef = { 
    name: 'ITEM_CHECKLIST_GRUPO',
    i18n: ITEM_CHECKLIST_GRUPO_I18N_DEF,
    grid: ITEM_CHECKLIST_GRUPO_GRID_DEF, // Si el crud tiene grilla, entonces se agrega su definicion.
    forms: {
        filter: ITEM_CHECKLIST_GRUPO_FILTER_FORM_FIELDS_DEF, // Si el crud tiene campos de busqueda, entonces se agrega su definicion.
        create: ITEM_CHECKLIST_GRUPO_CREATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de alta, entonces se agrega su definicion.
        update: ITEM_CHECKLIST_GRUPO_UPDATE_FORM_FIELDS_DEF, // Si el crud tiene formulario de modificacion, entonces se agrega su definicion.
        read:  ITEM_CHECKLIST_GRUPO_READ_FORM_FIELDS_DEF // Si existe un formulario de edicion no exite uno de solo lectura
    },
    navigation: ITEM_CHECKLIST_GRUPO_NAV_DEF,
    security: ITEM_CHECKLIST_GRUPO_SECURITY_DEF,
    ws: {
        key: 'ITEM_CHECKLIST_GRUPO_CRUD_URL',
        url: 'itemChecklistGrupo'
    },
    dialogConfig: {
        width: '400px'
    }   
};
