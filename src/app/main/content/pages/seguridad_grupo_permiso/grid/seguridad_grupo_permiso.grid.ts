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
    }
  ],
  sortAllColumns: true,
  displayedColumns: [
    'codigo'
  ],
  deleteAction: false,
  actions: [
     {
      actionNameKey: 'seguridad_grupo_permiso_grid_def_delete',
      icon: 'delete',
      labelTitle: 'Borrar Permiso',
      formDef: {
        showSubmitContinue: false,
        fields:[
          {
            key: 'idGrupo',
            labelKey: 'seguridad_grupo_permiso_grid_def_column_idgrupo',
            label: 'idGrupo',
            controlType: 'hidden',
            mappingQuerystring: true
          },
          {
            key: 'id',
            labelKey: 'seguridad_grupo_permiso_grid_def_column_idpermiso',
            label: 'idPermiso',
            controlType: 'hidden'
          },
          {
            key: 'ninguno',
            label: 'Se borrará el siguiente permiso',
            labelKey: 'Se borrará el siguiente permiso',
            controlType: 'label',
            value: 'Se borrará el siguiente permiso'
          },
          {
            key: 'codigo',
            disabled: true,
            labelKey: 'seguridad_grupo_permiso_grid_def_column_idpermiso',
            label: 'Permiso',
            controlType: 'textbox'
          },
          {
            key: 'aceptar',
            labelKey: 'Borrar',
            label: 'Borrar',
            controlType: 'checkbox',
            value: false
          },
        ]
      },
      ws: {
        key: 'contenido_grid_def_button_action_resumen',
        url: PREFIX_DOMAIN_API + 'grupoPermiso',
        method: 'PUT'
      }
    }
  ]
};
