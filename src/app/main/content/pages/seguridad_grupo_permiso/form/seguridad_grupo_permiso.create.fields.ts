import { PREFIX_DOMAIN_API } from "environments/environment";

export const SEGURIDAD_GRUPO_PERMISO_CREATE_FORM_FIELDS_DEF = [
  {
    key: 'idGrupo',
    labelKey: 'seguridad_grupo_permiso_create_form_fields_def_field_idgrupo',
    label: 'Grupo',
    type: 'hidden',
    controlType: 'hidden',
    mappingQuerystring: true
  },

  {
    key: 'permiso',
    labelKey: 'seguridad_grupo_permiso_create_form_fields_def_field_idpermiso',
    controlType: 'autocomplete-desplegable',
    required: true,
    options: {
      transferIdToField: 'idPermiso',
      elementLabel: 'code',
      elementValue: 'id',
      useNativeFilter: false,
      selectElementOrCleanField: 'Debe seleccionar un elemento o limpiar el campo'
    },
    apiOptions: {
      queryString: {
        name: 'permiso'
      },
      defaultShow: 20,
      url: PREFIX_DOMAIN_API + 'permissions/filterPermisoByNombre'
    }
  },

  {
    key: 'idPermiso',
    controlType: 'hidden'
  },

 
];
