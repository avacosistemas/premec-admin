import { ComponentDef } from 'app/modules/fwk/core/model/component-def/component-def';
import { CIERRE_MES_SECURITY_DEF } from './security/cierre-mes.security';
import { CIERRE_MES_NAV_DEF } from './navigation/cierre-mes.nav';
import { CIERRE_MES_I18N_DEF } from './i18n/cierre-mes.i18n';

export const CIERRE_MES_DEF: ComponentDef = {
    name: 'CIERRE_MES',
    i18n: CIERRE_MES_I18N_DEF,
    navigation: CIERRE_MES_NAV_DEF,
    security: CIERRE_MES_SECURITY_DEF,
};