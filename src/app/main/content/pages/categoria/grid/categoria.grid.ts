export const CATEGORIA_GRID_DEF = {
  columnsDef: [
    {
      columnDef: 'id',
      columnNameKey: 'categoria_grid_def_column_id'
    },
    {
      columnDef: 'nombre',
      columnNameKey: 'categoria_grid_def_column_nombre'
    },
    {
      columnDef: 'descripcion',
      columnNameKey: 'categoria_grid_def_column_descripcion'
    }
  ],
  sortAllColumns: true,
  deleteAction: true,
  displayedColumns: [
    'nombre',
    'descripcion'
  ]
};
