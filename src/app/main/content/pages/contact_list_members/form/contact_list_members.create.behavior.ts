import { EMAIL } from "app/modules/fwk/core/model/dynamic-form/dynamic-field";

export const CONTACT_LIST_MEMBERS_CREATE_BEHAVIOR: any[] = 
[
  {
    fieldKey: 'kindMember',
    condition: {
      if: [
        {
          key: 'kindMember',
          value: 'Nuevo',
        } 
      ],
      then: [
        {
          key: 'nombre',
          controlType: 'textbox'

        },
        {
          key: 'apellido',
          controlType: 'textbox'
        },
         {
          key: 'email',
          controlType: EMAIL
        },
         {
          key: 'emailList',
          controlType: 'hidden'
        }

      ],
      else: [
        
      ]            
    }
  },
  {
    fieldKey: 'kindMember',
    condition: {
      if: [
        {
          key: 'kindMember',
          value: 'Existente',
        } 
      ],
      then: [
        {
          key: 'nombre',
          value: null,
          controlType: 'hidden',
          required: false
        },
        {
          key: 'apellido',
          controlType: 'hidden',
          value: null,
          required: false
        },
         {
          key: 'email',
          controlType: 'hidden'
        },
         {
          key: 'emailList',
          controlType: 'autocomplete'
        }
      ],
      else: [
        
      ]            
    }
  }
];


