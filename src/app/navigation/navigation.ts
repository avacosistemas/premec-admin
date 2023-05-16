import { CONTACT_LIST_NAV_DEF } from 'app/main/content/pages/contact_list/navigation/contact_list.nav';
import { MATRICULADO_ESTADO_NAV_DEF } from 'app/main/content/pages/matriculado_estado/navigation/matriculado_estado.nav';
import { MATRICULA_TIPO_NAV_DEF } from 'app/main/content/pages/matricula_tipo/navigation/matricula_tipo.nav';
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
                    }
        ]
    }
];
