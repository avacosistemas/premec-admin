export const ITEM_CHECKLIST_GRUPO_GRID_DEF = {
  columnsDef: [
    {
      columnDef: 'idGrupo',
      columnNameKey: 'item_checklist_grupo_grid_def_column_idgrupo'
    },
    {
      columnDef: 'id',
      columnNameKey: 'item_checklist_grupo_grid_def_column_id'
    },
    {
      columnDef: 'nombre',
      columnNameKey: 'item_checklist_grupo_grid_def_column_nombre'
    },
    {
      columnDef: 'orden',
      columnNameKey: 'item_checklist_grupo_grid_def_column_orden'
    }
  ],
  sortAllColumns: true,
  deleteAction: true,
  displayedColumns: [
    'nombre',
    'orden'
  ]
};
