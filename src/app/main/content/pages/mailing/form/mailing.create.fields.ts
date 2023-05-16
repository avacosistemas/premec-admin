import { PREFIX_DOMAIN_API } from "environments/environment";
import { RADIO_BUTTON, IMPORT_IMAGE } from "app/modules/fwk/core/model/dynamic-form/dynamic-field";

export const MAILING_CREATE_FORM_FIELDS_DEF = [
  {
    key: 'accountList',
    labelKey: 'mailing_create_form_fields_def_field_cuenta',
    label: 'Cuenta',
    controlType: 'autocomplete-desplegable',
    required: true,
    options: {
      transferIdToField: 'accountId',
      elementLabel: 'friendlyName',
      elementValue: 'id',
      useNativeFilter: false,
      selectElementOrCleanField: 'Debe seleccionar un elemento o limpiar el campo'
    },
    apiOptions: {
      queryString: {
        title: 'accountList'
      },
      defaultShow: 20,
      url: PREFIX_DOMAIN_API + 'EmailAccount/accounts'
    }
  },
  {
    key: 'accountId',
    controlType: 'hidden'
  },
  {
    key: 'subject',
    labelKey: 'mailing_create_form_fields_def_field_asunto',
    label: 'Asunto',
    type: 'string',
    required: true,
    controlType: 'textbox'
  },
  {
    key: 'agenda_title',
    labelKey: 'Parámetros',
    title: 'Parámetros',
    controlType: 'checkbox'
  },
  {
    key: 'hasParameters',
    labelKey: 'Detalle Deuda',
    type: 'boolean',
    controlType: 'checkbox'
  },

  {
    key: 'includeAddress',
    labelKey: 'Domicilio (solo para Matriculados por estado)',
    type: 'boolean',
    controlType: 'checkbox'
  },


  {
    key: 'agenda_title',
    labelKey: 'Destinatarios',
    title: 'Destinatarios',
    controlType: 'checkbox'
  },
  {
    key: 'to',
    label: 'Destinatarios',
    required: true,
    requiredMessage: 'Debe seleccionar un destinatario',
    controlType: RADIO_BUTTON,
    value: 'ContactList',
    options: {
      options: [
        {value: 'ContactList', label: 'Lista de Contactos' },
        {value: 'MatriculadoEstados', label: 'Matrículados por Estado' },
        {value: 'MatriculadoActividades', label: 'Matrículados por Actividades' },
        {value: 'fromFile', label: 'Importar desde Archivo' }
      ]
    }
  },
  {
    key: 'contactList',
    labelKey: 'Lista de Contactos',
    controlType: 'autocomplete-desplegable',
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
      url: PREFIX_DOMAIN_API + 'ContactList/GetSelectByProp'
    }
  },
  {
    key: 'contactListId',
    controlType: 'hidden'
  },
  {
    key: 'matriculadoEstadosIds',
    labelKey: 'Matriculados Por Estado y Actividades',
    controlType: 'pick-list',
    options: {
        compositeKey: ['id'],
        elementLabel: 'nombre',
        titleFrom: 'Matriculados por Estado',
        titleTo: 'Matriculados Seleccionados',
        fromWs: {
            key: 'matriculados_estado_ws',
            url: PREFIX_DOMAIN_API + 'MatriculadoEstado/GetAllWithGroupNumber' // REVISAR
        }
    }
  },
  {
    key: 'matriculadoActividadesIds',
    labelKey: 'Matriculados Por Actividades',
    controlType: 'pick-list',
    options: {
        compositeKey: ['id'],
        elementLabel: 'nombre',
        titleFrom: 'Matriculados por Actividades',
        titleTo: 'Matriculados Seleccionados',
        fromWs: {
            key: 'matriculados_actividades_ws',
            url: PREFIX_DOMAIN_API + 'MatriculadoActividad/GetAllByGroupName' // REVISAR
        }
    }
  },
  {
    key: 'file',
    label: 'Importart',
    labelKey: 'Archivo (solo xls, xlsx)',
    controlType: 'file',
    icon: 'file_upload'    
  },
  {
    key: 'info_title',
    labelKey: 'Contenido',
    title: 'Contenido',
    controlType: 'checkbox'
  },

  {
    key: 'content',
    label: 'Contenido',
    required: true,
    requiredMessage: 'Debe seleccionar un contenido',
    controlType: RADIO_BUTTON,
    value: 'Boletin',
    options: {
      options: [
        {value: 'Boletin', label: 'Boletín' },
        {value: 'Page', label: 'Página del Sitio' },
        {value: 'URL', label: 'Url' }
      ]
    }
  },

  {
    key: 'boletin',
    label: 'Boletin',
    labelKey: 'mailing_create_form_fields_def_field_boletin',
    controlType: 'autocomplete-desplegable',
    options: {
      transferIdToField: 'boletinId',
      elementLabel: 'name',
      elementValue: 'id',
      useNativeFilter: false,
      selectElementOrCleanField: 'Debe seleccionar un elemento o limpiar el campo'
    },
    apiOptions: {
      queryString: {
        titulo: 'boletin'
      },
      defaultShow: 20,
      url: PREFIX_DOMAIN_API + 'Boletin/GetSelectByProp'
    }
  },

  {
    key: 'boletinId',
    controlType: 'hidden'
  },

  {
    key: 'page',
    labelKey: 'mailing_create_form_fields_def_field_paginasitio',
    controlType: 'autocomplete-desplegable',
    options: {
      transferIdToField: 'pageId',
      elementLabel: 'name',
      elementValue: 'id',
      useNativeFilter: false,
      selectElementOrCleanField: 'Debe seleccionar un elemento o limpiar el campo'
    },
    apiOptions: {
      queryString: {
        name: 'page'
      },
      defaultShow: 20,
      url: PREFIX_DOMAIN_API + 'Boletin/contenido'
    }
  },
  {
    key: 'pageId',
    controlType: 'hidden'
  },
  {
    key: 'url',
    labelKey: 'mailing_create_form_fields_def_field_url',
    label: 'URL',
    controlType: 'import_image',
    icon: 'attach_file',
    showPreview: true
  }
  
  
  



  // {
  //   key: 'incluirDesuscriptos',
  //   labelKey: 'Incluir Desuscriptos',
  //   type: 'boolean',
  //   controlType: 'checkbox'
  // },

];
