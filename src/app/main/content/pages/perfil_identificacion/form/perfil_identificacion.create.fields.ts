import { PREFIX_DOMAIN_API } from "environments/environment";

export const PERFIL_IDENTIFICACION_CREATE_FORM_FIELDS_DEF = [
  {
    key: 'tipo',
    labelKey: 'perfil_identificacion_create_form_fields_def_field_tipo',
    label: 'Tipo',
    type: 'string',
    controlType: 'textbox'
  },
  {
    key: 'matricula',
    labelKey: 'perfil_identificacion_create_form_fields_def_field_matricula',
    label: 'Matricula',
    type: 'string',
    controlType: 'textbox'
  },
  {
    key: 'estado',
    labelKey: 'perfil_identificacion_create_form_fields_def_field_estado',
    label: 'Estado',
    type: 'string',
    controlType: 'textbox'
  },
  {
    key: 'nombre',
    labelKey: 'perfil_identificacion_create_form_fields_def_field_nombre',
    label: 'Nombre',
    type: 'string',
    controlType: 'textbox'
  },
  {
    key: 'apellido',
    labelKey: 'perfil_identificacion_create_form_fields_def_field_apellido',
    label: 'Apellido',
    type: 'string',
    controlType: 'textbox'
  },
  {
    key: 'sexo',
    labelKey: 'perfil_identificacion_create_form_fields_def_field_sexo',
    controlType: 'select',
    options: {
      handlerSourceData: false,
      elementLabel: 'nombre',
      elementValue: 'id',
      fromData: [{id: 'M', nombre: 'Masculino'},
                 {id: 'F', nombre: 'Femenino'}]
    }
  },
  {
    key: 'email',
    labelKey: 'perfil_identificacion_create_form_fields_def_field_email',
    label: 'Email',
    type: 'string',
    controlType: 'textbox'
  },
  {
    key: 'idTipoDocumento',
    labelKey: 'perfil_identificacion_create_form_fields_def_field_tipodocumento',
    controlType: 'select',
    options: {
      elementLabel: 'nombre',
      elementValue: 'id',
      fromWs: {
        url: PREFIX_DOMAIN_API + 'siteConsumer/tipoDocumento',
      }
    }
  },
  {
    key: 'numeroDocumento',
    labelKey: 'perfil_identificacion_create_form_fields_def_field_numerodocumento',
    label: 'Numero Documento',
    type: 'string',
    controlType: 'textbox'
  },
  {
    key: 'usuario',
    labelKey: 'perfil_identificacion_create_form_fields_def_field_usuario',
    label: 'Usuario',
    type: 'string',
    controlType: 'textbox'
  },
  {
    key: 'fechaNacimiento',
    labelKey: 'perfil_identificacion_create_form_fields_def_field_fechanacimiento',
    label: 'Fecha Nacimiento',
    type: 'datepicker',
    controlType: 'datepicker'
  }
];
