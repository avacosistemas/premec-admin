export const USUARIOS_GRID_DEF = {
  columnsDef: [
    {
      columnDef: 'id',
      id: true,
      columnNameKey: 'usuarios_grid_def_column_id'
    },
    {
      columnDef: 'username',
      columnNameKey: 'usuarios_grid_def_column_username'
    },
    {
      columnDef: 'name',
      columnNameKey: 'usuarios_grid_def_column_name'
    },
    {
      columnDef: 'lastname',
      columnNameKey: 'usuarios_grid_def_column_lastname'
    },
    {
      columnDef: 'email',
      columnNameKey: 'usuarios_grid_def_column_email'
    },
    {
      columnDef: 'enabled',
      columnNameKey: 'usuarios_grid_def_column_enabled'
    },
    {
      columnDef: 'usuariosap',
      columnNameKey: 'usuarios_grid_def_column_usuariosap'
    }
  ],
  sortAllColumns: true,
  deleteAction: true,
  displayedColumns: [
    'id',
    'username',
    'name',
    'lastname',
    'email',
    'enabled',
    'usuariosap'
  ]
};
