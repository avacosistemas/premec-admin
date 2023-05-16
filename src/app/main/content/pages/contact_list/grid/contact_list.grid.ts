import { PREFIX_DOMAIN_API } from "environments/environment";

export const CONTACT_LIST_GRID_DEF = {
  columnsDef: [
    {
      columnDef: 'id',
      columnNameKey: 'contact_list_grid_def_column_id'
    },
    {
      columnDef: 'name',
      columnNameKey: 'contact_list_grid_def_column_name'
    },
    {
      columnDef: 'descripition',
      columnNameKey: 'contact_list_grid_def_column_descripition'
    },
    {
      columnDef: 'allowsJoin',
      columnNameKey: 'contact_list_grid_def_column_allowsjoin'
    },
    {
      columnDef: 'codeList',
      columnNameKey: 'contact_list_grid_def_column_codelist'
    }

  ],
  sortAllColumns: true,
  displayedColumns: [
    'codeList',
    'name',
    'descripition',
    'allowsJoin'
  ],
  actions: [
    {
      actionNameKey: 'contact_list_grid_def_column_desuscription',
      actionType: 'redirect',
      redirect: {
        url: '/contactListDesuscription',
        querystring: {
          listId: 'id',
          parentTitle: 'name'
        }
      },
      icon: 'auto_stories'
    } ,
    {
      actionNameKey: 'contact_list_grid_def_column_members',
      actionType: 'redirect',
      redirect: {
        url: '/contactListMembers',
        querystring: {
          listId: 'id',
          parentTitle: 'name'
        }
      },
      icon: 'groups'
    },
    {
      actionNameKey: 'contact_list_grid_button_action_file_members',
      actionType: 'file-download',
      icon: 'file_download',
      ws: {
        key: 'indice_grid_button_action_file_inscriptos',
        url: PREFIX_DOMAIN_API + 'ContactList/Export',
        method: 'GET',
        querystring: {
          id: 'id'
        }
      }
    },
    {
      actionNameKey: 'contact_list_grid_button_action_file_import_members',
      actionType: 'file-upload',
      icon: 'file_upload',
      form: [
        {               
          key: 'file',
          labelKey: 'Archivo (solo xls, xlsx)',
          controlType: 'file'
        },
        {               
          key: 'id',
          controlType: 'hidden',
        },
      ],
      ws: {
        key: 'indice_grid_button_action_file_import_members',
        url: PREFIX_DOMAIN_API + 'ContactList/Import',
        method: 'POST'        
      }
    }
 



  ]
};
