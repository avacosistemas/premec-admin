import { PREFIX_DOMAIN_API } from "environments/environment";

export const OPCION_GRID_DEF = {
  columnsDef: [
    {
      columnDef: 'idFormFieldOption',
      columnNameKey: 'opcion_grid_def_column_id',
      id: true
    },
    {
      columnDef: 'idFormField',
      columnNameKey: 'opcion_grid_def_column_idfield'
    },
    {
      columnDef: 'idForm',
      columnNameKey: 'opcion_grid_def_column_idform'
    },
    {
      columnDef: 'text',
      columnNameKey: 'opcion_grid_def_column_text'
    },
    {
      columnDef: 'value',
      columnNameKey: 'opcion_grid_def_column_value'
    },
    {
      columnDef: 'allowComments',
      columnNameKey: 'opcion_grid_def_column_allowComments'
    },
    {
      columnDef: 'position',
      columnNameKey: 'opcion_grid_def_column_position'
    }
  ],
  sortAllColumns: true,
  displayedColumns: [
    'text',
    'value',
    'allowComments',
    'position'
  ],
  actions: [
    {
      actionNameKey: 'Eliminar',
      icon: 'delete',
      ws: {
        key: 'section_topic_grid_def_button_action_bajar',
        url: PREFIX_DOMAIN_API + 'FormFieldOption/borrar',
        method: 'GET',
        confirm: true,
        querystring: {
          idForm : 'idForm',
          idFormField: 'idFormField',
          idFormFieldOption: 'idFormFieldOption'
        }
      }
    }
  ],
  deleteAction: false
};
