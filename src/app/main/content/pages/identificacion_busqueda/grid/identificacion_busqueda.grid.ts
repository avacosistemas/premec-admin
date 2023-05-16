export const IDENTIFICACION_BUSQUEDA_GRID_DEF = {
  columnsDef: [
    {
      columnDef: 'idUser',
      columnNameKey: 'identificacion_busqueda_grid_def_column_iduser'
    },
    {
      columnDef: 'idContact',
      columnNameKey: 'identificacion_busqueda_grid_def_column_idcontact',
    },
    {
      columnDef: 'tipo',
      columnNameKey: 'identificacion_busqueda_grid_def_column_tipo'
    },
    {
      columnDef: 'matricula',
      columnNameKey: 'identificacion_busqueda_grid_def_column_matricula'
    },
    {
      columnDef: 'estado',
      columnNameKey: 'identificacion_busqueda_grid_def_column_estado'
    },
    {
      columnDef: 'nombre',
      columnNameKey: 'identificacion_busqueda_grid_def_column_nombre'
    },
    {
      columnDef: 'apellido',
      columnNameKey: 'identificacion_busqueda_grid_def_column_apellido'
    },
    {
      columnDef: 'email',
      columnNameKey: 'identificacion_busqueda_grid_def_column_email'
    },
    {
      columnDef: 'tipoDocumento',
      columnNameKey: 'identificacion_busqueda_grid_def_column_tipodocumento'
    },
    {
      columnDef: 'numeroDocumento',
      columnNameKey: 'identificacion_busqueda_grid_def_column_numerodocumento'
    },
    {
      columnDef: 'username',
      columnNameKey: 'identificacion_busqueda_grid_def_column_username'
    },
    {
      columnDef: 'fechaNacimiento',
      columnNameKey: 'identificacion_busqueda_grid_def_column_fechanacimiento'
    }
  ],
  sortAllColumns: true,
  displayedColumns: [
    // 'idUser',
    // 'idContact',
    'tipo',
    'matricula',
    'estado',
    'nombre',
    'apellido',
    'email',
    'tipoDocumento',
    'numeroDocumento',
    'username',
    'fechaNacimiento'
  ],
  actions: [
    {
      actionNameKey: 'Editar',
      actionType: 'redirect',
      redirect: {
        url: '/perfilIdentificacion',
        querystring: {
          idContact : 'idContact',
          parentTitle: 'apellido'
        }
      },
      icon: 'edit'
    }
  ]
};
