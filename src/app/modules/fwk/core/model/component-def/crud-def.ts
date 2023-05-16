import { ComponentDef } from './component-def';
import { FormsCrudDef } from './form-crud-def';
import { GridDef } from './grid-def';
import { ActionDef } from './action-def';
import { DisplayActionsCondition } from '../display-actions-condition';

export class CrudDef extends ComponentDef {
    grid?: GridDef;
    /* 
      Estructura deprecada usar formsDef -> forms esta solo disponible para el componente visual crud
    */
    backButton?: boolean;
    forms?: FormsCrudDef;
    forceGetDetail?: boolean;
    crudActions?: ActionDef [];
    displayGlobalActions?: DisplayActionsCondition [];
    filterInMemory?: boolean;
    pagination?: {
      page: number,
      pageSize: number 
    };
    cancelInitSearch?: boolean;
    serverPagination?: boolean;
    initFilter?: boolean;
    openLink?: string;
    openLinkTitle?: string;
    downloadBoleta?: boolean;
    exportCsv?: {
      csvExportFileName: string
    };
    // Deprecado
    searchFields?: any;
    initSearch?: boolean;
}
