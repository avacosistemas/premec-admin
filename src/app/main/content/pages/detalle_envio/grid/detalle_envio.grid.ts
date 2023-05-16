export const DETALLE_ENVIO_GRID_DEF = {
  columnsDef: [
    {
      columnDef: 'id',
      columnNameKey: 'detalle_envio_grid_def_column_id'
    },
    {
      columnDef: 'idVenta',
      columnNameKey: 'detalle_envio_grid_def_column_idventa'
    },
    {
      columnDef: 'nombre',
      columnNameKey: 'detalle_envio_grid_def_column_nombre'
    },
    {
      columnDef: 'domicilio',
      columnNameKey: 'detalle_envio_grid_def_column_domicilio'
    }
  ],
  sortAllColumns: true,
  displayedColumns: [
    'id',
    'idVenta',
    'nombre',
    'domicilio'
  ]
};
