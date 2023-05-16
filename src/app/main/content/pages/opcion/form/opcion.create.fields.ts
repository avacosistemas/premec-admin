export const OPCION_CREATE_FORM_FIELDS_DEF = [
  {
    key: 'idForm',
    labelKey: 'opcion_create_form_fields_def_field_idfield',
    label: 'ID Field',
    controlType: 'hidden',
    mappingQuerystring: true
  },
  {
    key: 'idFormField',
    labelKey: 'opcion_create_form_fields_def_field_idfield',
    label: 'ID Form Field',
    controlType: 'hidden',
    mappingQuerystring: true
  },
  {
    key: 'text',
    labelKey: 'opcion_create_form_fields_def_field_text',
    label: 'Texto',
    type: 'string',
    required: true,
    controlType: 'textbox'
  },
  {
    key: 'value',
    labelKey: 'opcion_create_form_fields_def_field_value',
    label: 'Valor',
    controlType: 'textbox'
  },
  {
    key: 'allowComments',
    labelKey: 'opcion_create_form_fields_def_field_allowComments',
    label: 'Permitir Comentarios',
    controlType: 'checkbox'
  },
  {
    key: 'position',
    labelKey: 'opcion_create_form_fields_def_field_position',
    label: 'Posición',
    controlType: 'number',
    required: true
  }

  

];
