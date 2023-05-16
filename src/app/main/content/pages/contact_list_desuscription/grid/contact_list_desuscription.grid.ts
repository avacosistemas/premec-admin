export const CONTACT_LIST_DESUSCRIPTION_GRID_DEF = {
  columnsDef: [
    {
      columnDef: 'nombre',
      columnNameKey: 'CONTACT_LIST_DESUSCRIPTION_READ_FORM_FIELDS_DEF_FIELD_name'
    },
    {
      columnDef: 'apellido',
      columnNameKey: 'CONTACT_LIST_DESUSCRIPTION_READ_FORM_FIELDS_DEF_FIELD_lastname'
    },
    {
      columnDef: 'email',
      columnNameKey: 'CONTACT_LIST_DESUSCRIPTION_READ_FORM_FIELDS_DEF_FIELD_email'
    },
    {
      columnDef: 'fechaHoraString',
      columnNameKey: 'CONTACT_LIST_DESUSCRIPTION_READ_FORM_FIELDS_DEF_FIELD_dateTime'
    }
  ],
  sortAllColumns: true,
  displayedColumns: [
    'nombre',
    'apellido',
    'email',
    'fechaHoraString'
  ]
};
