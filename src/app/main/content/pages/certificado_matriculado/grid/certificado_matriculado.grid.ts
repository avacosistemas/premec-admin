import { PREFIX_DOMAIN_API } from "environments/environment";

export const CERTIFICADO_MATRICULADO_GRID_DEF = {
  columnsDef: [
    {
      columnDef: 'id',
      columnNameKey: 'certificado_matriculado_grid_def_column_id'
    },
    {
      columnDef: 'codigo',
      columnNameKey: 'certificado_matriculado_grid_def_column_codigo'
    },
    {
      columnDef: 'fechaHora',
      columnNameKey: 'certificado_matriculado_grid_def_column_fechahora'
    },
    {
      columnDef: 'numero',
      columnNameKey: 'certificado_matriculado_grid_def_column_numero'
    }
  ],
  sortAllColumns: true,
  displayedColumns: [
    'codigo',
    'numero',
    'fechaHora'
  ],
  actions : [
    {
      actionNameKey: 'certificado_matriculado_grid_button_action_file_download',
      actionType: 'file-download',
      icon: 'sim_card_download',
      ws: {
        key: 'certificado_matriculado_grid_button_action_file_download',
        url: PREFIX_DOMAIN_API + 'admin/generarCertificadoPDF',
        method: 'GET',
        querystring: {
          id: 'id'
        }
      }
    },
  ]

};
