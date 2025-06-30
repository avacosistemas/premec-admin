import { SEGURIDAD_GRUPO_PERMISO_NAV_DEF } from "../../seguridad_grupo_permiso/navigation/seguridad_grupo_permiso.nav";

export const SEGURIDAD_GRUPO_GRID_DEF = {
  columnsDef: [
    {
      columnDef: 'id',
      columnNameKey: 'seguridad_grupo_grid_def_column_id'
    },
    {
      columnDef: 'name',
      columnNameKey: 'seguridad_grupo_grid_def_column_nombre'
    }
  ],
  sortAllColumns: true,
  displayedColumns: [
    'name'
  ],
  showDeleteAction: true,
  actions: [
    {
      actionNameKey: 'Permisos',
      actionType: 'redirect',
      redirect: {
        url: SEGURIDAD_GRUPO_PERMISO_NAV_DEF.url,
        querystring: {
          idGrupo : 'id',
          parentTitle: 'name'
        }
      },
      icon: 'lock'
    },
  ]
};
