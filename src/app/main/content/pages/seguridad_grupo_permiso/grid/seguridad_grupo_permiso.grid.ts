import { PREFIX_DOMAIN_API } from "environments/environment";

export const SEGURIDAD_GRUPO_PERMISO_GRID_DEF = {
  columnsDef: [
    {
      columnDef: 'id',
      columnNameKey: 'seguridad_grupo_permiso_grid_def_column_id'
    },
    {
      columnDef: 'idGrupo',
      columnNameKey: 'seguridad_grupo_permiso_grid_def_column_idgrupo'
    },
    {
      columnDef: 'idPermiso',
      columnNameKey: 'seguridad_grupo_permiso_grid_def_column_idpermiso'
    },
    {
      columnDef: 'permisoNombre',
      columnNameKey: 'seguridad_grupo_permiso_grid_def_column_idpermiso'
    },
    {
      columnDef: 'codigo',
      columnNameKey: 'seguridad_grupo_permiso_grid_def_column_idpermiso'
    },
    {
      columnDef: 'descripcion',
      columnNameKey: 'Permiso'
    }
  ],
  sortAllColumns: true,
  displayedColumns: [
    'descripcion'
  ],
  deleteAction: true,
  deleteTernaria: true,
  columnsTernaria: [
    'idGrupo',
    'id'
  ]

};
