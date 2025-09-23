import { GRUPOS_TIPO_ACTIVIDAD_DEF } from 'app/main/content/pages/grupos_tipo_actividad/grupos_tipo_actividad.def';
import { PERMISO_DEF } from 'app/main/content/pages/permiso/permiso.def';
import { USUARIOS_DEF } from 'app/main/content/pages/usuarios/usuarios.def';
import { RECIBOS_PROCESAMIENTO_DEF } from 'app/main/content/recibos-procesamiento/recibos-procesamiento.def';
import { FICHADO_PROCESAMIENTO_DEF } from 'app/main/content/fichado-procesamiento/fichado-procesamiento.def';
import { CIERRE_MES_DEF } from 'app/main/content/cierre-mes/cierre-mes.def';
import { NOVEDADES_CONTADOR_DEF } from 'app/main/content/novedades-contador/novedades-contador.def';
import { GENERAR_QR_DEF } from 'app/main/content/generar-qr/generar-qr.def';
import { RECIBOS_DEF } from 'app/main/content/pages/recibos/recibos.def';
import { REPORTE_HORAS_MAQUINA_DEF } from 'app/main/content/pages/reporte_horas_maquina/reporte_horas_maquina.def';
import { SEGURIDAD_GRUPO_PERMISO_DEF } from 'app/main/content/pages/seguridad_grupo_permiso/seguridad_grupo_permiso.def';
import { SEGURIDAD_GRUPO_DEF } from 'app/main/content/pages/seguridad_grupo/seguridad_grupo.def';

export const navigation = [
    {
        'id': 'administration',
        'title': 'Menú General',
        'translate': 'NAV.ADMINISTRATION',
        'type': 'group',
        'children': [
            {
                'id': GENERAR_QR_DEF.navigation.id,
                'title': 'Generar QR',
                'translate': GENERAR_QR_DEF.navigation.translateKey,
                'type': 'item',
                'icon': 'qr_code',
                'url': GENERAR_QR_DEF.navigation.url,
                'permission': GENERAR_QR_DEF.security.readAccess
            },
            {
                'id': REPORTE_HORAS_MAQUINA_DEF.navigation.id,
                'title': 'Reporte Horas Maquina',
                'translate': REPORTE_HORAS_MAQUINA_DEF.navigation.translateKey,
                'type': 'item',
                'icon': 'description',
                'url': REPORTE_HORAS_MAQUINA_DEF.navigation.url,
                'permission': REPORTE_HORAS_MAQUINA_DEF.security.readAccess
            },
            {
                'id': GRUPOS_TIPO_ACTIVIDAD_DEF.navigation.id,
                'title': 'Grupos por Tipo de Actividad',
                'translate': GRUPOS_TIPO_ACTIVIDAD_DEF.navigation.translateKey,
                'type': 'item',
                'icon': 'checklist',
                'url': GRUPOS_TIPO_ACTIVIDAD_DEF.navigation.url,
                'permission': GRUPOS_TIPO_ACTIVIDAD_DEF.security.readAccess
            },
            {
                'id': RECIBOS_DEF.navigation.id,
                'title': 'Recibos',
                'translate': RECIBOS_DEF.navigation.translateKey,
                'type': 'item',
                'icon': 'receipt',
                'url': RECIBOS_DEF.navigation.url,
                'permission': RECIBOS_DEF.security.readAccess
            },
            {
                'id': RECIBOS_PROCESAMIENTO_DEF.navigation.id,
                'title': 'Enviar Recibos',
                'translate': RECIBOS_PROCESAMIENTO_DEF.navigation.translateKey,
                'type': 'item',
                'icon': 'send',
                'url': RECIBOS_PROCESAMIENTO_DEF.navigation.url,
                'permission': RECIBOS_PROCESAMIENTO_DEF.security.readAccess
            },
            {
                'id': FICHADO_PROCESAMIENTO_DEF.navigation.id,
                'title': 'Procesar Fichados',
                'translate': FICHADO_PROCESAMIENTO_DEF.navigation.translateKey,
                'type': 'item',
                'icon': 'alarm_on',
                'url': FICHADO_PROCESAMIENTO_DEF.navigation.url,
                'permission': FICHADO_PROCESAMIENTO_DEF.security.readAccess
            },
            {
                'id': CIERRE_MES_DEF.navigation.id,
                'title': 'Cierre de Mes',
                'translate': CIERRE_MES_DEF.navigation.translateKey,
                'type': 'item',
                'icon': 'event_available',
                'url': CIERRE_MES_DEF.navigation.url,
                'permission': CIERRE_MES_DEF.security.readAccess
            },
            {
                'id': NOVEDADES_CONTADOR_DEF.navigation.id,
                'title': 'Novedades Contador',
                'translate': NOVEDADES_CONTADOR_DEF.navigation.translateKey,
                'type': 'item',
                'icon': 'request_quote',
                'url': NOVEDADES_CONTADOR_DEF.navigation.url,
                'permission': NOVEDADES_CONTADOR_DEF.security.readAccess
            },
            {
                'id': 'seguridad',
                'title': 'Seguridad',
                'type': 'collapse',
                'icon': 'security',
                'permission': 'MENU_SEGURIDAD',
                'children': [
                    {
                        'id': USUARIOS_DEF.navigation.id,
                        'title': 'Usuarios',
                        'translate': USUARIOS_DEF.navigation.translateKey,
                        'icon': 'manage_accounts',
                        'type': 'item',
                        'url': USUARIOS_DEF.navigation.url,
                        'permission': USUARIOS_DEF.security.readAccess
                    },
                    {
                        'id': SEGURIDAD_GRUPO_DEF.navigation.id,
                        'title': 'Grupos',
                        'translate': SEGURIDAD_GRUPO_DEF.navigation.translateKey,
                        'icon': 'group_work',
                        'type': 'item',
                        'url': SEGURIDAD_GRUPO_DEF.navigation.url,
                        'permission': SEGURIDAD_GRUPO_DEF.security.readAccess
                    },
                    {
                        'id': PERMISO_DEF.navigation.id,
                        'title': 'Permisos',
                        'translate': PERMISO_DEF.navigation.translateKey,
                        'icon': 'lock',
                        'type': 'item',
                        'url': PERMISO_DEF.navigation.url,
                        'permission': PERMISO_DEF.security.readAccess
                    }
                ]
            },
        ]
    }
];