
export const CAMPO_CREATE_BEHAVIOR = 
[
  {
    fieldKey: 'type',
    condition: {
      if: [
        {
          key: 'type',
          value: 'checkbox',
        } 
      ],
      then: [
        {
          key: 'minValue',
          controlType: 'number'
        },
        {
          key: 'maxValue',
          controlType: 'number'
        },
      ],
      else: [
        {
          key: 'minValue',
          controlType: 'hidden',
          value: null,
        },
        {
          key: 'maxValue',
          controlType: 'hidden',
          value: null,
        },
      ]            
    }
  },
  {
    fieldKey: 'maxValue',
    condition: {
      if: [
        {
          key: 'maxValue',
          compare: 'LESS',
          toField: 'minValue',
          avoidThenOnValueNull: true,
        } 
      ],
      then: [
        {
          key: 'maxValue',
          controlType: 'number',
          showErrorMsg: 'La cantidad maxima no puede ser menor a la minima'
        },
      ],
      else: [
        
      ]            
    }
  },
  {
    fieldKey: 'dependentField',
    condition: {
      if: [
        {
          key: 'dependentField',
          compare: 'HAS-VALUE'
        } 
      ],
      then: [
        {
          key: 'dependentValue',
          controlType: 'autocomplete-desplegable',
          value: null,
        },
      ],
      else: [
        {
          key: 'dependentValue',
          controlType: 'hidden',
          value: null,
        }
      ]            
    }
  },

];


