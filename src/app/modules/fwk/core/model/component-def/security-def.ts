import { WsDef } from '../ws-def';

export class SecurityDef {
    // Obligatorios
    readAccess: string;
    updateAccess: string;
    createAccess: string;
    deleteAccess: string;
}
