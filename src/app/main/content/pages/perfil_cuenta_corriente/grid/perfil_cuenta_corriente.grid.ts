export const PERFIL_CUENTA_CORRIENTE_GRID_DEF = {
    columnsDef: [
      {
        columnDef: 'id',
        columnNameKey: 'perfil_cuenta_corriente_grid_def_column_idcontact'
      },
      {
        columnDef: 'periodo',
        columnNameKey: 'perfil_cuenta_corriente_grid_def_column_periodo'
      },
      {
        columnDef: 'tipoDocumento',
        columnNameKey: 'perfil_cuenta_corriente_grid_def_column_tipoDocumento'
      },
      {
        columnDef: 'numeroDocumento',
        columnNameKey: 'perfil_cuenta_corriente_grid_def_column_numeroDocumento'
      },
      {
        columnDef: 'fechaAlta',
        columnNameKey: 'perfil_cuenta_corriente_grid_def_column_fechaAlta'
      },
      {
        columnDef: 'fechaVencimiento',
        columnNameKey: 'perfil_cuenta_corriente_grid_def_column_fechaVencimiento'
      },
      {
        columnDef: 'facturado',
        columnNameKey: 'perfil_cuenta_corriente_grid_def_column_facturado'
      },
      {
        columnDef: 'recibido',
        columnNameKey: 'perfil_cuenta_corriente_grid_def_column_recibido'
      },
      {
        columnDef: 'saldo',
        columnNameKey: 'perfil_cuenta_corriente_grid_def_column_saldo'
      }
    ],
    // actions : [
    //     {
    //       actionNameKey: 'Eliminar',
    //       icon: 'delete',
    //       confirm: true,
    //       ws: {
    //         key: 'perfil_redes_sociales_grid_def_button_action_bajar',
    //         url: PREFIX_DOMAIN_API + 'admin/personas/redsocial',
    //         method: 'DELETE'
    //       }
    //     },
    //   ],
    sortAllColumns: true,
    displayedColumns: [
      'periodo',
      'tipoDocumento',
      'numeroDocumento',
      'fechaAlta',
      'fechaVencimiento',
      'facturado',
      'recibido',
      'saldo'
    ]
  };