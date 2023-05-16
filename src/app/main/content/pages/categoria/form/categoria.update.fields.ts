export const CATEGORIA_UPDATE_FORM_FIELDS_DEF = [
  {
    key: 'id',
    labelKey: 'CATEGORIA_UPDATE_FORM_FIELDS_DEF_FIELD_id',
    label: 'Id',
    controlType: 'hidden'
  },
  {
    key: 'nombre',
    labelKey: 'CATEGORIA_UPDATE_FORM_FIELDS_DEF_FIELD_nombre',
    label: 'Nombre',
    type: 'string',
    controlType: 'textbox',
    required: true,
    maxLength: 200
  },
  {
    key: 'descripcion',
    labelKey: 'CATEGORIA_UPDATE_FORM_FIELDS_DEF_FIELD_descripcion',
    label: 'Descripcion',
    type: 'string',
    controlType: 'textbox',
    maxLength: 400
  }
];
