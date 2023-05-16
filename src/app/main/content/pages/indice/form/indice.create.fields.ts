import { PREFIX_DOMAIN_API } from "environments/environment";

export const INDICE_CREATE_FORM_FIELDS_DEF = [
  {
    key: 'mes',
    labelKey: 'indice_create_form_fields_def_field_mes',
    label: 'Mes',
    controlType: 'select',
    options: {
      handlerSourceData: false,
      elementLabel: 'nombre',
      elementValue: 'id',
      fromData: [{id: 1, nombre: 'Enero'},
                 {id: 2, nombre: 'Febrero'},
                 {id: 3, nombre: 'Marzo'},
                 {id: 4, nombre: 'Abril'},
                 {id: 5, nombre: 'Mayo'},
                 {id: 6, nombre: 'Junio'},
                 {id: 7, nombre: 'Julio'},
                 {id: 8, nombre: 'Agosto'},
                 {id: 9, nombre: 'Septiembre'},
                 {id: 10, nombre: 'Octubre'},
                 {id: 11, nombre: 'Noviembre'},
                 {id: 12, nombre: 'Diciembre'}
                ]
      }
  },
  {
    key: 'año',
    labelKey: 'indice_create_form_fields_def_field_año',
    label: 'Año',
    type: 'number',
    controlType: 'number',
    value: '2020'
  },
  


  {
    key: 'contactList',
    labelKey: 'indice_create_form_fields_def_field_contactlistid',
    controlType: 'autocomplete-desplegable',
    required: true,
    options: {
      transferIdToField: 'contactListId',
      elementLabel: 'name',
      elementValue: 'id',
      useNativeFilter: false,
      selectElementOrCleanField: 'Debe seleccionar un elemento o limpiar el campo'
    },
    apiOptions: {
      queryString: {
        name: 'contactList'
      },
      defaultShow: 20,
      url: PREFIX_DOMAIN_API + 'Indice/lista'
    }
  },

  {
    key: 'contactListId',
    controlType: 'hidden'
  },
  
];
