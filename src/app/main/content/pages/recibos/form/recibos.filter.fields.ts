export const RECIBOS_FILTER_FORM_FIELDS_DEF = [
  {
    key: 'year',
    labelKey: 'recibos_filter_form_fields_def_field_year',
    label: 'Año',
    type: 'number',
    controlType: 'textbox'
  },
  {
    key: 'month',
    labelKey: 'recibos_filter_form_fields_def_field_month',
    label: 'Mes',
    controlType: 'select',
    options: {
      handlerSourceData: false,
      elementLabel: 'label',
      elementValue: 'value',
      fromData: [
        { value: '', label: 'Todos' },
        { value: 1, label: 'Enero' },
        { value: 2, label: 'Febrero' },
        { value: 3, label: 'Marzo' },
        { value: 4, label: 'Abril' },
        { value: 5, label: 'Mayo' },
        { value: 6, label: 'Junio' },
        { value: 7, label: 'Julio' },
        { value: 8, label: 'Agosto' },
        { value: 9, label: 'Septiembre' },
        { value: 10, label: 'Octubre' },
        { value: 11, label: 'Noviembre' },
        { value: 12, label: 'Diciembre' }
      ]
    }
  },
  {
    key: 'tipo',
    labelKey: 'recibos_filter_form_fields_def_field_tipo',
    label: 'Tipo de Recibo',
    controlType: 'select',
    options: {
      handlerSourceData: false,
      elementLabel: 'label',
      elementValue: 'value',
      fromData: [
        { value: '', label: 'Todos' },
        { value: 'Sueldo Jornal', label: 'Sueldo Jornal' },
        { value: 'Sueldo Mensual', label: 'Sueldo Mensual' },
        { value: 'SAC', label: 'SAC' },
        { value: 'Vacaciones Jornal', label: 'Vacaciones Jornal' },
        { value: 'Vacaciones Mensual', label: 'Vacaciones Mensual' },
        { value: 'Ajustes Retroactivos', label: 'Ajustes Retroactivos' },
        { value: 'Adelanto', label: 'Adelanto' },
        { value: 'Préstamo', label: 'Préstamo' }
      ]
    }
  },
  {
    key: 'attachmentEntry',
    labelKey: 'recibos_filter_form_fields_def_field_attachmentEntry',
    label: 'Referencia del Recibo',
    type: 'text',
    controlType: 'textbox'
  }
];