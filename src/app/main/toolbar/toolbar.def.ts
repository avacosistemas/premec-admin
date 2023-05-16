import { ComponentDef } from 'app/modules/fwk/core/model/component-def/component-def';
import { ToolbarComponentDef } from 'app/modules/fwk/core/model/component-def/toolbar-comp-def';
import { environment } from 'environments/environment';
export const TOOLBAR_DEF: ToolbarComponentDef = {
    name: 'toolbar',
    i18n: {
        name: 'toolbar',
        lang: 'es',
        words: {
            menu_text: 'sort',
            menu_user_icon: 'account_circle',
            menu_user_item_1: 'Mis Datos',
            menu_user_item_4: 'Cambiar contraseña',
            menu_user_item_5: 'Cerrar sesión',

        }
    },
    
    contextMenu: [

    ]
};
