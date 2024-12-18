import { USUARIOS_NAV_DEF } from 'app/main/content/pages/usuarios/navigation/usuarios.nav';
import { USUARIOS_DEF } from 'app/main/content/pages/usuarios/usuarios.def';
import { environment } from 'environments/environment';
export const navigation = [
    {
        'id': 'administration',
        'title': 'Menú General',
        'translate': 'NAV.ADMINISTRATION',
        'type': 'group',
        'children': [
                    {
                        'title': 'Usuarios',
                        'type': 'item',
                        'icon': 'group' ,
                        'url': USUARIOS_NAV_DEF.url
                    },
                    {
                        'title': 'Generar QR',
                        'type': 'item',
                        'icon': 'qr_code' ,
                        'url': '/generarqr'
                    },
                    {
                        'title': 'Reporte Horas Máquina',
                        'type': 'item',
                        'url': '/reporteHorasMaquina'
                    }
        ]
    }
];
