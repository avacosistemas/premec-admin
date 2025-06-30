import { PREFIX_DOMAIN_API } from "environments/environment";
import { SEGURIDAD_GRUPO_PERMISO_NAV_DEF } from "../../seguridad_grupo_permiso/navigation/seguridad_grupo_permiso.nav";

export const SEGURIDAD_GRUPO_USUARIO_GRID_DEF = {
  columnsDef: [
    {
      columnDef: 'id',
      columnNameKey: 'seguridad_grupo_usuario_grid_def_column_id'
    },
    {
      columnDef: 'idGrupo',
      columnNameKey: 'seguridad_grupo_usuario_grid_def_column_idgrupo'
    },
    {
      columnDef: 'idUsuario',
      columnNameKey: 'seguridad_grupo_usuario_grid_def_column_idusuario'
    },
    {
      columnDef: 'perfilNombre',
      columnNameKey: 'seguridad_grupo_usuario_grid_def_column_idgrupo'
    },
  ],
  sortAllColumns: true,
  displayedColumns: [
    'id',
    'idGrupo',
    'idUsuario',
    'perfilNombre'
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
              key: 'idUsuario',
              labelKey: 'seguridad_grupo_permiso_grid_def_column_idgrupo',
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
              label: 'Se borrará el siguiente grupo',
              labelKey: 'Se borrará el siguiente grupo',
              controlType: 'label',
              value: 'Se borrará el siguiente grupo'
            },
            {
              key: 'perfilNombre',
              disabled: true,
              labelKey: 'seguridad_grupo_permiso_grid_def_column_idpermiso',
              label: 'Grupo',
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
          url: PREFIX_DOMAIN_API + 'acceso',
          method: 'PUT'
        }
      }
    ]
};
