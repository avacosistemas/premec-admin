import { WsDef } from '../ws-def';

export class NavigationDef {
    // Obligatorios
    id: string;
    translateKey: string;
    url: string;
    title?: string;

    // Opcionales
    translate?: string;
    showMenu?: boolean;
}
