export const GRUPOS_TIPO_ACTIVIDAD_UPDATE_FORM_FIELDS_DEF = [
  {
    key: 'idGrupo',
    labelKey: 'GRUPOS_TIPO_ACTIVIDAD_UPDATE_FORM_FIELDS_DEF_FIELD_idgrupo',
    label: 'Id',
    type: 'number',
    controlType: 'number'
  },
  {
    key: 'tipoActividad',
    labelKey: 'grupos_tipo_actividad_create_form_fields_def_field_tipoactividad',
    label: 'Tipo de Actividad',
    controlType: 'select',
    value: 'todos',
    options: {
      handlerSourceData: false,
      elementLabel: 'label',
      elementValue: 'value',
      fromData: [ 
        {value: 'R', label: 'Reparación' },
        {value: 'C', label: 'Checklist' },
        {value: 'p', label: 'Piezas a Reparar' },
        {value: 'M', label: 'Mantenimiento Maquinaria' },
        {value: 'EE', label: 'Entrega Maquina Electrica' },
        {value: 'EC', label: 'Entrega Maquina Combustion' },
        {value: 'EP', label: 'Entrega Plataforma' }
      ]
    }
  },
  {
    key: 'titulo',
    labelKey: 'grupos_tipo_actividad_create_form_fields_def_field_titulo',
    label: 'Titulo del Grupo',
    type: 'text',
    controlType: 'textbox'
  },
  {
    key: 'orden',
    labelKey: 'grupos_tipo_actividad_create_form_fields_def_field_orden',
    label: 'Orden',
    type: 'number',
    controlType: 'number'
  }
];
