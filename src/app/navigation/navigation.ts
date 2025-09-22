import { GRUPOS_TIPO_ACTIVIDAD_DEF } from 'app/main/content/pages/grupos_tipo_actividad/grupos_tipo_actividad.def';
import { GRUPOS_TIPO_ACTIVIDAD_NAV_DEF } from 'app/main/content/pages/grupos_tipo_actividad/navigation/grupos_tipo_actividad.nav';
import { USUARIOS_NAV_DEF } from 'app/main/content/pages/usuarios/navigation/usuarios.nav';
import { RECIBOS_NAV_DEF } from 'app/main/content/pages/recibos/navigation/recibos.nav';
import { PERMISO_DEF } from 'app/main/content/pages/permiso/permiso.def';
import { SEGURIDAD_GRUPO_DEF } from 'app/main/content/pages/seguridad_grupo/seguridad_grupo.def';
import { USUARIOS_DEF } from 'app/main/content/pages/usuarios/usuarios.def';
import { NOVEDADES_CONTADOR_SECURITY_DEF } from 'app/main/content/novedades-contador/security/novedades-contador.security';

export const navigation = [
    {
        'id': 'administration',
        'title': 'Menú General',
        'translate': 'NAV.ADMINISTRATION',
        'type': 'group',
        'children': [
            {
                'title': 'Generar QR',
                'type': 'item',
                'icon': 'qr_code',
                'url': '/generarqr'
            },
            {
                'title': 'Reporte Horas Máquina',
                'type': 'item',
                'url': '/reporteHorasMaquina',
                'icon': 'description',
            },
            {
                'title': 'Grupos Checklist',
                'type': 'item',
                'url': GRUPOS_TIPO_ACTIVIDAD_NAV_DEF.url,
                'icon': 'checklist',
            },
            {
                'title': 'Recibos',
                'type': 'item',
                'icon': 'receipt',
                'url': RECIBOS_NAV_DEF.url
            },
            {
                'title': 'Enviar Recibos',
                'type': 'item',
                'icon': 'send',
                'url': '/recibos-procesamiento'
            },
            {
                'title': 'Procesar Fichados',
                'type': 'item',
                'icon': 'alarm_on',
                'url': '/fichado-procesamiento'
            },
            {
                'title': 'Cierre de Mes',
                'type': 'item',
                'icon': 'event_available',
                'url': '/cierre-mes'
            },
            {
                'title': 'Novedades Contador',
                'type': 'item',
                'icon': 'request_quote',
                'url': '/novedades-contador',
                'permission': NOVEDADES_CONTADOR_SECURITY_DEF.readAccess
            },
            {
                'title': 'Seguridad',
                'type': 'collapse',
                'icon': 'security',
                // 'permission': 'MENU_SEGURIDAD',
                'children': [
                    {
                        'id': 'usuarios',
                        'title': 'Usuarios',
                        'icon': 'manage_accounts',
                        'type': 'item',
                        'url': USUARIOS_DEF.navigation.url,
                        // 'permission': 'USER_ADMIN_READ'
                    },
                    {
                        'id': 'grupos',
                        'title': 'Grupos',
                        'icon': 'group_work',
                        'type': 'item',
                        'url': SEGURIDAD_GRUPO_DEF.navigation.url,
                        // 'permission': 'SEGURIDAD_GRUPO_READ'
                    },
                    {
                        'id': 'permisos',
                        'title': 'Permisos',
                        'icon': 'lock',
                        'type': 'item',
                        'url': PERMISO_DEF.navigation.url,
                        // 'permission': 'PERMISO_READ'
                    }
                ]
            },
        ]
    }
];
