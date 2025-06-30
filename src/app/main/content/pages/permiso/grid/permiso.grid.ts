export const PERMISO_GRID_DEF = {
  columnsDef: [
    {
      columnDef: 'id',
      columnNameKey: 'permiso_grid_def_column_id'
    },
    {
      columnDef: 'code',
      columnNameKey: 'permiso_grid_def_column_codigo'
    },
    {
      columnDef: 'description',
      columnNameKey: 'permiso_grid_def_column_nombre'
    }
  ],
  sortAllColumns: true,
  displayedColumns: [
    'code',
    'description'
  ],
  deleteAction: true
};
