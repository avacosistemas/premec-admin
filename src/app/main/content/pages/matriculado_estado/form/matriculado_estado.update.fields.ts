export const MATRICULADO_ESTADO_UPDATE_FORM_FIELDS_DEF = [
  {
    key: 'id',
    labelKey: 'MATRICULADO_ESTADO_UPDATE_FORM_FIELDS_DEF_FIELD_id',
    label: 'Id',
    type: 'hidden',
    controlType: 'hidden'
  },
  {
    key: 'codigo',
    labelKey: 'MATRICULADO_ESTADO_UPDATE_FORM_FIELDS_DEF_FIELD_codigo',
    label: 'Codigo',
    type: 'string',
    readonly: true,
    disabled: true,
    controlType: 'textbox'
  },
  {
    key: 'nombre',
    labelKey: 'MATRICULADO_ESTADO_UPDATE_FORM_FIELDS_DEF_FIELD_nombre',
    label: 'Nombre',
    type: 'string',
    controlType: 'textbox'
  },
  {
    key: 'esActivo',
    labelKey: 'MATRICULADO_ESTADO_UPDATE_FORM_FIELDS_DEF_FIELD_esactivo',
    label: 'Es Activo',
    type: 'checkbox',
    controlType: 'checkbox'
  },
  {
    key: 'puedeGenerarCredencial',
    labelKey: 'MATRICULADO_ESTADO_UPDATE_FORM_FIELDS_DEF_FIELD_puedegenerarcredencial',
    label: 'Puede Generar Credencial',
    type: 'checkbox',
    controlType: 'checkbox'
  },
  {
    key: 'puedeGenerarCertificado',
    labelKey: 'MATRICULADO_ESTADO_UPDATE_FORM_FIELDS_DEF_FIELD_puedegenerarcertificado',
    label: 'Puede Generar Certificado',
    type: 'checkbox',
    controlType: 'checkbox'
  },
  {
    key: 'esActivoFicha',
    labelKey: 'MATRICULADO_ESTADO_UPDATE_FORM_FIELDS_DEF_FIELD_esactivoficha',
    label: 'Activo en Ficha',
    type: 'checkbox',
    controlType: 'checkbox'
  }
];
