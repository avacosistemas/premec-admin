import { ComponentDef } from 'app/modules/fwk/core/model/component-def/component-def';
import { NOVEDADES_CONTADOR_SECURITY_DEF } from './security/novedades-contador.security';
import { NOVEDADES_CONTADOR_NAV_DEF } from './navigation/novedades-contador.nav';
import { NOVEDADES_CONTADOR_I18N_DEF } from './i18n/novedades-contador.i18n';

export const NOVEDADES_CONTADOR_DEF: ComponentDef = {
    name: 'NOVEDADES_CONTADOR',
    i18n: NOVEDADES_CONTADOR_I18N_DEF,
    navigation: NOVEDADES_CONTADOR_NAV_DEF,
    security: NOVEDADES_CONTADOR_SECURITY_DEF,
};