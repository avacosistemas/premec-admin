import { PREFIX_DOMAIN_API } from "environments/environment";

export const INDICE_GRID_DEF = {
  columnsDef: [
    {
      columnDef: 'id',
      id: true,
      columnNameKey: 'indice_grid_def_column_id'
    },
    {
      columnDef: 'mes',
      columnNameKey: 'indice_grid_def_column_mes'
    },
    {
      columnDef: 'año',
      columnNameKey: 'indice_grid_def_column_año'
    },
    {
      columnDef: 'recipients',
      columnNameKey: 'indice_grid_def_column_recipients'
    },
    {
      columnDef: 'contactListId',
      columnNameKey: 'indice_grid_def_column_contactlistid'
    },
    {
      columnDef: 'resultados',
      columnNameKey: 'indice_grid_def_column_recipients'
    }
  ],
  sortAllColumns: true,
  displayedColumns: [
    'mes',
    'año',
    'resultados'
  ],
  actions : [
    {
      actionNameKey: 'indice_grid_button_action_file_inscriptos',
      actionType: 'file-download',
      icon: 'launch',
      ws: {
        key: 'indice_grid_button_action_file_inscriptos',
        url: PREFIX_DOMAIN_API + 'Indice/Export',
        method: 'GET',
        querystring : {
          id: 'id'
        }
      }
    }
  ]
};
