import { ComponentDef } from 'app/modules/fwk/core/model/component-def/component-def';
import { FICHADO_PROCESAMIENTO_SECURITY_DEF } from './security/fichado-procesamiento.security';
import { FICHADO_PROCESAMIENTO_NAV_DEF } from './navigation/fichado-procesamiento.nav';
import { FICHADO_PROCESAMIENTO_I18N_DEF } from './i18n/fichado-procesamiento.i18n';

export const FICHADO_PROCESAMIENTO_DEF: ComponentDef = {
    name: 'FICHADO_PROCESAMIENTO',
    i18n: FICHADO_PROCESAMIENTO_I18N_DEF,
    navigation: FICHADO_PROCESAMIENTO_NAV_DEF,
    security: FICHADO_PROCESAMIENTO_SECURITY_DEF,
};