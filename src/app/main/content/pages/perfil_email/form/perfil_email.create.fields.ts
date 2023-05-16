import { REGEX_KEY_EMAIL } from "app/modules/fwk/core/service/dynamic-form/form.validator.service";
import { PREFIX_DOMAIN_API } from "environments/environment";

export const PERFIL_EMAIL_CREATE_FORM_FIELDS_DEF = [
  {
    key: 'idContact',
    labelKey: 'perfil_email_create_form_fields_def_field_idcontactdata',
    label: 'idContact',
    type: 'string',
    controlType: 'hidden',
    mappingQuerystring: true
  },
  {
    key: 'idTipoEmail',
    labelKey: 'perfil_email_create_form_fields_def_field_tipoemail',
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
  {
    key: 'email',
    labelKey: 'perfil_email_create_form_fields_def_field_email',
    label: 'Email',
    type: 'string',
    controlType: 'textbox',
    required: true,
    validation: {
      regexKey: REGEX_KEY_EMAIL
    },
    maxLength: 250
  },

];