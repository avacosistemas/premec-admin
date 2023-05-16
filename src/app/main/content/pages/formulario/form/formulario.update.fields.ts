import { HTML_EDITOR } from "app/modules/fwk/core/model/dynamic-form/dynamic-field";

export const FORMULARIO_UPDATE_FORM_FIELDS_DEF = [
  {
    key: 'id',
    labelKey: 'FORMULARIO_UPDATE_FORM_FIELDS_DEF_FIELD_id',
    label: 'ID',
    type: 'string',
    controlType: 'hidden'
  },
  {
    key: 'name',
    labelKey: 'formulario_create_form_fields_def_field_name',
    label: 'Nombre',
    type: 'string',
    controlType: 'textbox',
    maxLength: 200,
    required: true,
    cssClass: 'formulario_name'
  },
  
  {
    key: 'remarks',
    labelKey: 'formulario_create_form_fields_def_field_remarks',
    label: 'Aclaraciones',
    type: 'string',
    controlType: 'textbox',
    maxLength: 1000,
    cssClass: 'formulario_remarks'
  },
  
  {
    key: 'minQuota',
    labelKey: 'formulario_create_form_fields_def_field_minquota',
    type: 'number',
    controlType: 'number',
    required: true,
    cssClass: 'formulario_minquota'
  },
  {
    key: 'quota',
    labelKey: 'formulario_create_form_fields_def_field_quota',
    label: 'Cupo (0 \u003d sin cupo)',
    type: 'number',
    controlType: 'number',
    required: true,
    cssClass: 'formulario_quota'
  },
  {
    key: 'allowQueue',
    labelKey: 'formulario_create_form_fields_def_field_allowqueue',
    label: 'Lista de Espera',
    type: 'boolean',
    controlType: 'checkbox',
    cssClass: 'formulario_allowqueue'
  },
  {
    key: 'fromDateString',
    labelKey: 'formulario_create_form_fields_def_field_fromdate',
    label: 'Fecha Desde',
    controlType: 'datepicker',
    required: true,
    cssClass: 'formulario_fromdate'
  },
  {
    key: 'toDateString',
    labelKey: 'formulario_create_form_fields_def_field_todate',
    label: 'Fecha Hasta',
    controlType: 'datepicker',
    required: true,
    cssClass: 'formulario_todate'
  },
  
  {
    key: 'validateUser',
    labelKey: 'formulario_create_form_fields_def_field_validateuser',
    label: 'Validate User',
    type: 'boolean',
    controlType: 'checkbox'
  },
  // {
  //   key: 'showUserData',
  //   labelKey: 'formulario_create_form_fields_def_field_showuserdata',
  //   label: 'Mostrar Datos de Usuario',
  //   type: 'boolean',
  //   controlType: 'checkbox'
  // },
  
  // {
  //   key: 'allowUpdates',
  //   labelKey: 'formulario_create_form_fields_def_field_allowupdates',
  //   label: 'Permitir Actualizaci�n de Datos',
  //   type: 'boolean',
  //   controlType: 'checkbox'
  // },
  {
    key: 'showTitle',
    labelKey: 'formulario_create_form_fields_def_field_showtitle',
    type: 'boolean',
    controlType: 'checkbox',
    cssClass: 'formulario_showtitle'
  },
  {
    key: 'headerImage',
    labelKey: 'formulario_create_form_fields_def_field_headerimage',
    label: 'Imagen de Cabecera',
    controlType: 'import_image',
    options: {
      // => https://ckeditor.com/docs/ckfinder/ckfinder3/#!/api/CKFinder.Config-cfg-resourceType
      resourceType: 'Images'
    },
    showPreview: true,
    cssClass: 'formulario_headerimage'
  },
  {
    key: 'place',
    labelKey: 'formulario_create_form_fields_def_field_place',
    label: 'Lugar',
    type: 'string',
    controlType: 'textbox',
    maxLength: 4000,
    cssClass: 'formulario_place'
  },
  {
    key: 'dateString',
    labelKey: 'formulario_create_form_fields_def_field_date',
    label: 'Fecha',
    controlType: 'datepicker',
    cssClass: 'formulario_date'
  },
  {
    key: 'contact',
    labelKey: 'formulario_create_form_fields_def_field_contact',
    label: 'Contacto',
    type: 'string',
    controlType: 'textbox',
    maxLength: 500,
    cssClass: 'formulario_contact'
  },
  {
    key: 'isCurso',
    labelKey: 'formulario_create_form_fields_def_field_isCurso',
    label: 'Es curso',
    type: 'boolean',
    controlType: 'checkbox',
    cssClass: 'formulario_isCurso'
  }
];
