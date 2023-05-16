import { Entity } from '../entity';
import { WsDef } from '../ws-def';
import { I18n } from '../i18n';
import { NavigationDef } from './navigation-def';
import { SecurityDef } from './security-def';
import { FormsDef } from './form-def';
import { ActionDef } from './action-def';

export class ComponentDef{
    name: string;
    i18n: I18n;
    template?: string;
    /*
      esta solo disponible para el componente visual item-detail pero se piensa agregar al componente visual crud
    */
   formsDef?: FormsDef;
   ws?: WsDef;
   navigation?: NavigationDef;
   security?: SecurityDef;
   styleUrl?: string;
   test?: any; // Solo para test
   actions?: ActionDef[];
   dialogs?: any;
   dialogConfig?: any; // Solo se usa si es necesario ajustar el modal de los cruds
}
