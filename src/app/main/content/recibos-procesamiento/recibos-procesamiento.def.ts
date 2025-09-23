import { ComponentDef } from 'app/modules/fwk/core/model/component-def/component-def';
import { RECIBOS_PROCESAMIENTO_SECURITY_DEF } from './security/recibos-procesamiento.security';
import { RECIBOS_PROCESAMIENTO_NAV_DEF } from './navigation/recibos-procesamiento.nav';
import { RECIBOS_PROCESAMIENTO_I18N_DEF } from './i18n/recibos-procesamiento.i18n';

export const RECIBOS_PROCESAMIENTO_DEF: ComponentDef = {
    name: 'RECIBOS_PROCESAMIENTO',
    i18n: RECIBOS_PROCESAMIENTO_I18N_DEF,
    navigation: RECIBOS_PROCESAMIENTO_NAV_DEF,
    security: RECIBOS_PROCESAMIENTO_SECURITY_DEF,
};