import { RADIO_BUTTON } from "app/modules/fwk/core/model/dynamic-form/dynamic-field";
import { EMAIL } from "app/modules/fwk/core/model/dynamic-form/dynamic-field";
import { PREFIX_DOMAIN_API } from "environments/environment";

export const CONTACT_LIST_MEMBERS_CREATE_FORM_FIELDS_DEF = [    
  {
    key: 'kindMember',
    label: 'Miembro',
    required: true,
    controlType: RADIO_BUTTON,
    value: 'Nuevo',
    options: {
      options: [
        {value: 'Nuevo', label: 'Nuevo' },
        {value: 'Existente', label: 'Existente' },
      ]
    }
  },
  {
    key: 'nombre',
    labelKey: 'contact_list_members_create_form_fields_def_field_name',
    label: 'Nombre',
    type: 'string',
    required: true,
    length: 50,
    controlType: 'textbox'
  },
  {
    key: 'apellido',
    labelKey: 'contact_list_members_create_form_fields_def_field_lastName',
    label: 'Apellido',
    type: 'string',
    required: true,
    length: 50,
    controlType: 'textbox'
  },
  {
    key: 'email',
    labelKey: 'contact_list_members_create_form_fields_def_field_email',
    label: 'Email',
    required: true,
    type: 'string',
    controlType: EMAIL
  },
  {
    key: 'emailList',
    labelKey: 'Email',
    controlType: 'autocomplete',
    options: {
      transferIdToField: 'email',
      elementLabel: 'name',
      elementValue: 'id',
      useNativeFilter: false,
    },
    apiOptions: {     
      queryString: {
        title: 'emailList'
      },
      defaultShow: 20,
      url: PREFIX_DOMAIN_API + 'ContactList/GetContactMails'
    }
  },
  {
    key: 'listId',
    controlType: 'hidden',
    mappingQuerystring: true
  },
  {
    key: 'row',
    value: -1,
    controlType: 'hidden'
  }
];
