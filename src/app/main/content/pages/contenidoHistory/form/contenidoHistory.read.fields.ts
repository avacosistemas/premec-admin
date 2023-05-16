export const CONTENIDO_HISTORY_READ_FORM_FIELDS_DEF = [
  {
    key: 'info_title',
    labelKey: 'contenido_create_form_fields_def_title_info',
    title: 'Info',
    controlType: 'checkbox'
  },
  {
    key: 'title',
    labelKey: 'contenido_create_form_fields_def_field_title',
    type: 'string',
    controlType: 'textbox',
    required: true,
    maxLength: 1000
  },
  {
    key: 'showTitle',
    labelKey: 'contenido_create_form_fields_def_field_showtitle',
    type: 'checkbox',
    controlType: 'checkbox'
  },
  {
    key: 'subTitle',
    labelKey: 'contenido_create_form_fields_def_field_subtitle',
    type: 'string',
    controlType: 'textbox',
    maxLength: 200
  },
  {
    key: 'publishDateString',
    labelKey: 'contenido_create_form_fields_def_field_publishdate',
    controlType: 'datetimepicker',
  },
  {
    key: 'showPublishDate',
    labelKey: 'contenido_create_form_fields_def_field_showPublishDate',
    type: 'checkbox',
    controlType: 'checkbox'
  },

  {
    key: 'expirationDateString',
    labelKey: 'contenido_create_form_fields_def_field_expirationdate',
    controlType: 'datetimepicker',
  },

  {
    key: 'link',
    labelKey: 'contenido_create_form_fields_def_field_link',
    label: 'Link',
    controlType: 'import_image',
    maxLength: 500,
    icon: 'attach_file',
    showPreview: true,
  },
  {
    key: 'linkTarget',
    labelKey: 'contenido_create_form_fields_def_field_linktarget',
    label: 'LinkTarget',
    type: 'select',
    controlType: 'select',
    required: true,
    value: 0,
    options: {
      handlerSourceData: false,
      elementLabel: 'nombre',
      elementValue: 'id',
      fromData: [{id: 0, nombre: '_self'},
                 {id: 1, nombre: '_blank'},
                 {id: 2, nombre: '_parent'},
                 {id: 3, nombre: '_top'},
                 {id: 4, nombre: '_search'}]
      }
  },

  {
    key: 'posicionGaleria',
    labelKey: 'contenido_create_form_fields_def_field_linktarget_posiciongaleria',
    label: 'Galería',
    value: 1,
    controlType: 'select',
    options: {
      handlerSourceData: false,
      elementLabel: 'nombre',
      elementValue: 'id',
      fromData: [{id: 1, nombre: 'No Mostrar'},
                 {id: 2, nombre: 'Mostrar Arriba'},
                 {id: 3, nombre: 'Mostrar Abajo'}
                ]
      }
  },
  
  {
    key: 'agenda_title',
    labelKey: 'contenido_create_form_fields_def_title_agenda',
    title: 'Agenda',
    controlType: 'checkbox'
  },

  {
    key: 'eventStartDateString',
    labelKey: 'contenido_create_form_fields_def_field_eventstartdate',
    label: 'Fecha Inicio',
    controlType: 'datetimepicker',
  },
  {
    key: 'showEventStartDate',
    labelKey: 'Mostrar Fecha Inicio',
    type: 'checkbox',
    controlType: 'checkbox'
  },
  {
    key: 'agenda_title',
    labelKey: 'contenido_create_form_fields_def_title_beneficios',
    title: 'Beneficios',
    controlType: 'checkbox'
  },

  {
    key: 'percent',
    labelKey: 'contenido_create_form_fields_def_field_porcentaje',
    controlType: 'number',
    required: false
  },

];
