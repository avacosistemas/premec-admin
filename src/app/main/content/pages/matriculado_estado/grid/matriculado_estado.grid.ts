export const MATRICULADO_ESTADO_GRID_DEF = {
  columnsDef: [
    {
      columnDef: 'id',
      columnNameKey: 'matriculado_estado_grid_def_column_id'
    },
    {
      columnDef: 'codigo',
      columnNameKey: 'matriculado_estado_grid_def_column_codigo'
    },
    {
      columnDef: 'nombre',
      columnNameKey: 'matriculado_estado_grid_def_column_nombre'
    },
    {
      columnDef: 'esActivo',
      columnNameKey: 'matriculado_estado_grid_def_column_esactivo'
    },
    {
      columnDef: 'puedeGenerarCredencial',
      columnNameKey: 'matriculado_estado_grid_def_column_puedegenerarcredencial'
    },
    {
      columnDef: 'puedeGenerarCertificado',
      columnNameKey: 'matriculado_estado_grid_def_column_puedegenerarcertificado'
    },
    {
      columnDef: 'esActivoFicha',
      columnNameKey: 'matriculado_estado_grid_def_column_esactivoficha'
    }
  ],
  sortAllColumns: true,
  displayedColumns: [
    'codigo',
    'nombre',
    'esActivo',
    'puedeGenerarCredencial',
    'puedeGenerarCertificado',
    'esActivoFicha'
  ]
};
