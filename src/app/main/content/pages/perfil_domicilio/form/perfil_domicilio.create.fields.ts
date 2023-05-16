import { REGEX_KEY_ONLY_NUMBERS } from "app/modules/fwk/constants";
import { REGEX_KEY_CODIGO_POSTAL, REGEX_KEY_NO_WHITE_SPACES } from "app/modules/fwk/core/service/dynamic-form/form.validator.service";
import { PREFIX_DOMAIN_API } from "environments/environment";

export const PERFIL_DOMICILIO_CREATE_FORM_FIELDS_DEF = [
  {
    key: 'idContact',
    labelKey: 'perfil_domicilio_create_form_fields_def_field_idcontactdata',
    label: 'idContact',
    type: 'string',
    controlType: 'hidden',
    mappingQuerystring: true
  },
  {
    key: 'calle',
    labelKey: 'perfil_domicilio_create_form_fields_def_field_calle',
    label: 'Calle',
    type: 'string',
    controlType: 'textbox',
    required: true,
    minLength: 1,
    maxLength: 100,
    validation: {
      regexKey: REGEX_KEY_NO_WHITE_SPACES
    }
  },
  {
    key: 'altura',
    labelKey: 'perfil_domicilio_create_form_fields_def_field_altura',
    label: 'Altura',
    type: 'string',
    controlType: 'textbox',
    required: true,
    minLength: 1,
    maxLength: 7,
    validation: {
      regexKey: REGEX_KEY_ONLY_NUMBERS
    }
  },
  {
    key: 'piso',
    labelKey: 'perfil_domicilio_create_form_fields_def_field_piso',
    label: 'Piso',
    type: 'string',
    controlType: 'textbox',
    maxLength: 2,
    validation: {
      regexKey: REGEX_KEY_ONLY_NUMBERS
    }
  },
  {
    key: 'depto',
    labelKey: 'perfil_domicilio_create_form_fields_def_field_dpto',
    label: 'Departamento',
    type: 'string',
    controlType: 'textbox',
    minLength: 1,
    maxLength: 20
  },
  {
    key: 'localidad',
    labelKey: 'perfil_domicilio_create_form_fields_def_field_localidad',
    label: 'Localidad',
    type: 'string',
    controlType: 'textbox',
    required: true,
    minLength: 1,
    maxLength: 100,
    validation: {
      regexKey: REGEX_KEY_NO_WHITE_SPACES
    }
  },
  {
    key: 'codigoPostal',
    labelKey: 'perfil_domicilio_create_form_fields_def_field_codiopostal',
    label: 'Codigo Postal',
    type: 'string',
    controlType: 'textbox',
    required: true,
    maxLength: 8,
    validation: {
      regexKey: REGEX_KEY_CODIGO_POSTAL
    }
  },
  {
    key: 'idTipoDomicilio',
    labelKey: 'perfil_domicilio_create_form_fields_def_field_tipodomicilio',
    controlType: 'select',
    required: true,
    options: {
      elementLabel: 'nombre',
      elementValue: 'id',
      fromWs: {
        url: PREFIX_DOMAIN_API + 'siteConsumer/tipoContacto',
      }
    }
  },
];
