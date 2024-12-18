export const REPORTE_HORAS_MAQUINA_GRID_DEF = {
  columnsDef: [
    {
      columnDef: 'serviceCallId',
      columnNameKey: 'reporte_horas_maquina_grid_def_column_servicecallid'
    },
    {
      columnDef: 'idActividad',
      columnNameKey: 'reporte_horas_maquina_grid_def_column_idactividad'
    },
    {
      columnDef: 'fechaString',
      columnNameKey: 'reporte_horas_maquina_grid_def_column_fecha'
    },
    {
      columnDef: 'horasMaquina',
      columnNameKey: 'reporte_horas_maquina_grid_def_column_horasmaquina'
    },
    {
      columnDef: 'promedio',
      columnNameKey: 'reporte_horas_maquina_grid_def_column_promedio'
    },
    {
      columnDef: 'promedioString',
      columnNameKey: 'reporte_horas_maquina_grid_def_column_promediostring'
    },
    {
      columnDef: 'contractId',
      columnNameKey: 'reporte_horas_maquina_grid_def_column_contractid'
    },
    {
      columnDef: 'horasContratadas',
      columnNameKey: 'reporte_horas_maquina_grid_def_column_horascontratadas'
    }
  ],
  sortAllColumns: true,
  displayedColumns: [
    'serviceCallId',
    'idActividad',
    'fechaString',
    'horasMaquina',
    'promedio',
    'contractId',
    'horasContratadas',
    'promedioString'
  ]
};
