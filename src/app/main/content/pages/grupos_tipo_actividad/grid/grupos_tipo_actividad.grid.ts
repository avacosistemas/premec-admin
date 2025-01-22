export const GRUPOS_TIPO_ACTIVIDAD_GRID_DEF = {
  columnsDef: [
    {
      columnDef: 'idGrupo',
      columnNameKey: 'grupos_tipo_actividad_grid_def_column_idgrupo'
    },
    {
      columnDef: 'tipoActividad',
      columnNameKey: 'grupos_tipo_actividad_grid_def_column_tipoactividad'
    },
    {
      columnDef: 'tipoActividadString',
      columnNameKey: 'grupos_tipo_actividad_grid_def_column_tipoactividad'
    },
    {
      columnDef: 'titulo',
      columnNameKey: 'grupos_tipo_actividad_grid_def_column_titulo'
    },
    {
      columnDef: 'orden',
      columnNameKey: 'grupos_tipo_actividad_grid_def_column_orden'
    }
  ],
  sortAllColumns: true,
  displayedColumns: [
    'idGrupo',
    'tipoActividad',
    'titulo',
    'orden'
  ]
};
