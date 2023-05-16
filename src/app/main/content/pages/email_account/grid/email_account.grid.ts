export const EMAIL_ACCOUNT_GRID_DEF = {
  columnsDef: [
    {
      columnDef: 'id',
      columnNameKey: 'email_account_grid_def_column_id'
    },
    {
      columnDef: 'email',
      columnNameKey: 'email_account_grid_def_column_email'
    },
    {
      columnDef: 'displayName',
      columnNameKey: 'email_account_grid_def_column_displayname'
    }
  ],
  sortAllColumns: true,
  deleteAction: true,
  displayedColumns: [
    'email',
    'displayName'
  ]
};
