import { PREFIX_DOMAIN_API } from "environments/environment";

export const CONTACT_LIST_MEMBERS_GRID_DEF = {
  columnsDef: [
    
    {
      columnDef: 'idSuscripcion',
      columnNameKey: 'CONTACT_LIST_MEMBERS_READ_FORM_FIELDS_DEF_FIELD_idSuscripcion',
      id: true
    },
    {
      columnDef: 'nombre',
      columnNameKey: 'CONTACT_LIST_MEMBERS_READ_FORM_FIELDS_DEF_FIELD_name'
    },
    {
      columnDef: 'apellido',
      columnNameKey: 'CONTACT_LIST_MEMBERS_READ_FORM_FIELDS_DEF_FIELD_lastname'
    },
    {
      columnDef: 'email',
      columnNameKey: 'CONTACT_LIST_MEMBERS_READ_FORM_FIELDS_DEF_FIELD_email'
    },
    {
      columnDef: 'fechaString',
      columnNameKey: 'CONTACT_LIST_MEMBERS_READ_FORM_FIELDS_DEF_FIELD_dateTime'
    },
    {
      columnDef: 'activo',
      columnNameKey: 'CONTACT_LIST_MEMBERS_READ_FORM_FIELDS_DEF_FIELD_active'
    },
    {
      columnDef: 'contactListCode',      
      columnNameKey: 'CONTACT_LIST_MEMBERS_READ_FORM_FIELDS_DEF_FIELD_listCode'
    }    
  ],
  sortAllColumns: true,
  displayedColumns: [
    'nombre',
    'apellido',
    'email',
    'fechaString',
    'activo'
  ], actions: [
    {
      actionNameKey: 'contact_list_members_grid_def_column_eliminar',
      confirm: true,
      ws: {
        key: 'contact_list_members_def_column_eliminar',
        url: PREFIX_DOMAIN_API + 'ContactList/Members/',
        method: 'DELETE', 
        querystring: {
          idSuscripcion: 'idSuscripcion'
        }       
      },
      icon: 'delete'

    }
  ]
};
