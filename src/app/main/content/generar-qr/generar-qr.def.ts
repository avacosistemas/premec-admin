import { ComponentDef } from 'app/modules/fwk/core/model/component-def/component-def';
import { GENERAR_QR_SECURITY_DEF } from './security/generar-qr.security';
import { GENERAR_QR_NAV_DEF } from './navigation/generar-qr.nav';
import { GENERAR_QR_I18N_DEF } from './i18n/generar-qr.i18n';

export const GENERAR_QR_DEF: ComponentDef = {
    name: 'GENERAR_QR',
    i18n: GENERAR_QR_I18N_DEF,
    navigation: GENERAR_QR_NAV_DEF,
    security: GENERAR_QR_SECURITY_DEF,
};