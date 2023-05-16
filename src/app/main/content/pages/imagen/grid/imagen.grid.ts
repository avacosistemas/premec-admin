import { IMAGE_PREVIEW } from "app/modules/fwk/core/model/dynamic-form/dynamic-field";

export const IMAGEN_GRID_DEF = {
  columnsDef: [
    {
      columnDef: 'id',
      columnNameKey: 'imagen_grid_def_column_id',
      id: true
    },
    {
      columnDef: 'name',
      columnNameKey: 'imagen_grid_def_column_name'
    },
    {
      columnDef: 'url',
      columnNameKey: 'imagen_grid_def_column_url'
    },
    {
      columnDef: 'epigraph',
      columnNameKey: 'imagen_grid_def_column_epigraph'
    },
    {
      columnDef: 'createDate',
      columnNameKey: 'imagen_grid_def_column_createdate'
    }
  ],
  sortAllColumns: true,
  deleteAction: true,
  displayedColumns: [
    'name'
  ],
  /*actions: [
    {
      labelTitle: 'Preview',
      actionNameKey: 'Preview',
      icon: 'image',
      notShowButton: true,
      form: [
        {
          key: 'url',
          labelKey: 'imagen_prueba',
          label: 'imagen_prueba',
          type: 'image_preview',
          controlType: 'image_preview',
        }
      ]
    },
  ]*/
};
