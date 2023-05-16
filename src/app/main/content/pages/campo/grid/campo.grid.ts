import { PREFIX_DOMAIN_API } from "environments/environment";

export const CAMPO_GRID_DEF = {
  columnsDef: [
    {
      columnDef: 'idFormField',
      id: true,
      columnNameKey: 'campo_grid_def_column_id'
    },
   
    {
      columnDef: 'idForm',
      id: true,
      columnNameKey: 'campo_grid_def_column_idform'
    },
   
    {
      columnDef: 'name',
      columnNameKey: 'campo_grid_def_column_name'
    },
    {
      columnDef: 'type',
      columnNameKey: 'campo_grid_def_column_type'
    },
    {
      columnDef: 'required',
      columnNameKey: 'campo_grid_def_column_required'
    },
    {
      columnDef: 'value',
      columnNameKey: 'campo_grid_def_column_value'
    },
    {
      columnDef: 'position',
      columnNameKey: 'campo_grid_def_column_position'
    }
  ],
  sortAllColumns: true,
  deleteAction: false,
  displayedColumns: [
    'name',
    'type',
    'required',
    'value',
    'position'
  ],
  actions : [
    {
      actionNameKey: 'Eliminar',
      icon: 'delete',
      confirm: true,
      ws: {
        key: 'section_topic_grid_def_button_action_bajar',
        url: PREFIX_DOMAIN_API + 'FormField/borrar',
        method: 'GET',
        querystring: {
          idForm : 'idForm',
          idFormField: 'idFormField'
        }
      }
    },
    {
      actionNameKey: 'campo_grid_def_button_action_opciones',
      icon: 'format_list_bulleted',
      actionType: 'redirect',
      redirect: {
        url: '/opcion',
        querystring: {
          idForm : 'idForm',
          idFormField : 'idFormField',
          parentTitle: 'name'
        }
      }
    }


    
  ]
};
