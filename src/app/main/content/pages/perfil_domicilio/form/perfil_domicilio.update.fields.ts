import { REGEX_KEY_ONLY_NUMBERS } from "app/modules/fwk/constants";
import { REGEX_KEY_CODIGO_POSTAL } from "app/modules/fwk/core/service/dynamic-form/form.validator.service";
import { PREFIX_DOMAIN_API } from "environments/environment";

export const PERFIL_DOMICILIO_UPDATE_FORM_FIELDS_DEF = [
  {
    key: 'contactDataId',
    labelKey: 'perfil_domicilio_create_form_fields_def_field_idcontactdata',
    label: 'contactDataId',
    type: 'string',
    controlType: 'hidden',
    mappingQuerystring: true
  },
  {
    key: 'calle',
    labelKey: 'PERFIL_DOMICILIO_UPDATE_FORM_FIELDS_DEF_FIELD_calle',
    label: 'Calle',
    type: 'string',
    controlType: 'textbox',
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  {
    key: 'altura',
    labelKey: 'PERFIL_DOMICILIO_UPDATE_FORM_FIELDS_DEF_FIELD_altura',
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
    labelKey: 'PERFIL_DOMICILIO_UPDATE_FORM_FIELDS_DEF_FIELD_piso',
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
    labelKey: 'PERFIL_DOMICILIO_UPDATE_FORM_FIELDS_DEF_FIELD_dpto',
    label: 'Departamento',
    type: 'string',
    controlType: 'textbox',
    minLength: 1,
    maxLength: 20,
  },
  {
    key: 'localidad',
    labelKey: 'PERFIL_DOMICILIO_UPDATE_FORM_FIELDS_DEF_FIELD_localidad',
    label: 'Localidad',
    type: 'string',
    controlType: 'textbox',
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  {
    key: 'codigoPostal',
    labelKey: 'PERFIL_DOMICILIO_UPDATE_FORM_FIELDS_DEF_FIELD_codiopostal',
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
    labelKey: 'PERFIL_DOMICILIO_UPDATE_FORM_FIELDS_DEF_FIELD_tipodomicilio',
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
