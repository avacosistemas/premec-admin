import { HTML_EDITOR } from "app/modules/fwk/core/model/dynamic-form/dynamic-field";

function todaynow() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = String(today.getFullYear());
  return  dd + "/" + mm + "/" + yyyy;
}

export const FORMULARIO_CREATE_FORM_FIELDS_DEF = [
  {
    key: 'name',
    labelKey: 'formulario_create_form_fields_def_field_name',
    label: 'Nombre',
    type: 'string',
    controlType: 'textbox',
    maxLength: 200,
    required: true,
    cssClass: 'formulario_create_name'
  },
  
  {
    key: 'remarks',
    labelKey: 'formulario_create_form_fields_def_field_remarks',
    label: 'Aclaraciones',
    type: 'string',
    controlType: 'textbox',
    maxLength: 1000,
    cssClass: 'formulario_create_remarks'
  },
  
  {
    key: 'minQuota',
    labelKey: 'formulario_create_form_fields_def_field_minquota',
    type: 'number',
    controlType: 'number',
    required: true,
    cssClass: 'formulario_create_minquota'
  },
  {
    key: 'quota',
    labelKey: 'formulario_create_form_fields_def_field_quota',
    label: 'Cupo (0 \u003d sin cupo)',
    type: 'number',
    controlType: 'number',
    required: true,
    cssClass: 'formulario_create_quota'
  },
  {
    key: 'allowQueue',
    labelKey: 'formulario_create_form_fields_def_field_allowqueue',
    label: 'Lista de Espera',
    type: 'boolean',
    controlType: 'checkbox',
    cssClass: 'formulario_create_allowwqueue'
  },
  {
    key: 'fromDateString',
    labelKey: 'formulario_create_form_fields_def_field_fromdate',
    label: 'Fecha Desde',
    controlType: 'datepicker',
    required: true,
    cssClass: 'formulario_create_fromdate'
  },
  {
    key: 'toDateString',
    labelKey: 'formulario_create_form_fields_def_field_todate',
    label: 'Fecha Hasta',
    controlType: 'datepicker',
    required: true,
    cssClass: 'formulario_create_todate'
  },
  
  {
    key: 'validateUser',
    labelKey: 'formulario_create_form_fields_def_field_validateuser',
    label: 'Validate User',
    type: 'boolean',
    controlType: 'checkbox',
    cssClass: 'formulario_create_validateuser'
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
    cssClass: 'formulario_create_showtitle'
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
    cssClass: 'formulario_create_headerimage'
  },
  {
    key: 'place',
    labelKey: 'formulario_create_form_fields_def_field_place',
    label: 'Lugar',
    type: 'string',
    controlType: 'textbox',
    maxLength: 4000,
    cssClass: 'formulario_create_place'
  },
  {
    key: 'dateString',
    labelKey: 'formulario_create_form_fields_def_field_date',
    label: 'Fecha',
    type: 'string',
    controlType: 'datepicker',
    cssClass: 'formulario_create_date'
  },
  {
    key: 'contact',
    labelKey: 'formulario_create_form_fields_def_field_contact',
    label: 'Contacto',
    type: 'string',
    controlType: 'textbox',
    maxLength: 500,
    cssClass: 'formulario_create_contact'
  },
  {
    key: 'isCurso',
    labelKey: 'formulario_create_form_fields_def_field_isCurso',
    label: 'Es curso',
    type: 'boolean',
    controlType: 'checkbox',
    cssClass: 'formulario_create_isCurso'
  }
  
];
