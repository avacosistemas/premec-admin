import { CONTROL_TYPE } from '../../../../../modules/fwk/core/model/dynamic-form/dynamic-field';



export const MAILING_CREATE_BEHAVIOR: any[] = 
[
  {
    fieldKey: 'to',
    condition: {
      if: [
        {
          key: 'to',
          value: 'ContactList',
        } 
      ],
      then: [
        {
          key: 'contactList',
          controlType: 'autocomplete-desplegable'
        },
        {
          key: 'matriculadoEstadosIds',
          controlType: 'hidden'
        },
         {
          key: 'matriculadoActividadesIds',
          controlType: 'hidden'
        },
        {
          key: 'file',
          controlType: 'hidden'
        }
      ],
      else: [
        
      ]            
    }
  },
  {
    fieldKey: 'to',
    condition: {
      if: [
        {
          key: 'to',
          value: 'MatriculadoEstados',
        } 
      ],
      then: [
        {
          key: 'contactList',
          controlType: 'hidden'
        },
        {
          key: 'matriculadoEstadosIds',
          controlType: 'pick-list'
        },
         {
          key: 'matriculadoActividadesIds',
          controlType: 'hidden'
        },
        {
          key: 'file',
          controlType: 'hidden'
        }
      ],
      else: [
        
      ]            
    }
  },
  {
      fieldKey: 'to',
      condition: {
        if: [
          {
            key: 'to',
            value: 'MatriculadoActividades',
          } 
        ],
        then: [
          {
            key: 'contactList',
            controlType: 'hidden'
          },
          {
            key: 'matriculadoEstadosIds',
            controlType: 'hidden'
          },
           {
            key: 'matriculadoActividadesIds',
            controlType: 'pick-list'
          },
          {
            key: 'file',
            controlType: 'hidden'
          }
        ],
        else: [
          
        ]            
      }
  },
  {
      fieldKey: 'to',
      condition: {
        if: [
          {
            key: 'to',
            value: 'fromFile',
          } 
        ],
        then: [
          {
            key: 'contactList',
            controlType: 'hidden'
          },
          {
            key: 'matriculadoEstadosIds',
            controlType: 'hidden'
          },
           {
            key: 'matriculadoActividadesIds',
            controlType: 'hidden'
          },
          {
            key: 'file',
            controlType: 'file'
          }
          
        ],
        else: [
          
        ]            
      }
  },
  {
    fieldKey: 'content',
    condition: {
      if: [
        {
          key: 'content',
          value: 'Boletin',
        } 
      ],
      then: [
        {
          key: 'boletin',
          controlType: 'autocomplete-desplegable'
        },
        {
          key: 'page',
          controlType: 'hidden'
        },
         {
          key: 'url',
          controlType: 'hidden'
        }
      ],
      else: [
        
      ]            
    }
  },
  {
    fieldKey: 'content',
    condition: {
      if: [
        {
          key: 'content',
          value: 'Page',
        } 
      ],
      then: [
        {
          key: 'boletin',
          controlType: 'hidden'
        },
        {
          key: 'page',
          controlType: 'autocomplete-desplegable'
        },
        {
          key: 'url',
          controlType: 'hidden'
        }
      ],
      else: [
        
      ]            
    }
  },
  {
    fieldKey: 'content',
    condition: {
      if: [
        {
          key: 'content',
          value: 'URL',
        } 
      ],
      then: [
        {
          key: 'boletin',
          controlType: 'hidden'
        },
        {
          key: 'page',
          controlType: 'hidden'
        },
         {
          key: 'url',
          controlType: 'import_image'
        }
      ],
      else: [
        
      ]            
    }
  },
];


