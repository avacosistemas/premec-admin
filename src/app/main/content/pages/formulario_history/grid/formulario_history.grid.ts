import { HTML_EDITOR, TEXTAREA } from "app/modules/fwk/core/model/dynamic-form/dynamic-field";
import { PREFIX_DOMAIN_API } from "environments/environment";

const form_descripcion = 
  {
    key: 'description',
    labelKey: 'formulario_create_form_fields_def_field_description',
    label: 'Descripción',
    controlType: HTML_EDITOR
  }

const form_finalMessage = {
  key: 'finalMessage',
  labelKey: 'formulario_create_form_fields_def_field_finalmessage',
  label: 'Mensaje Final',
  controlType: HTML_EDITOR
}

const form_receipt = {
    key: 'receiptFooter',
    labelKey: 'formulario_create_form_fields_def_field_receiptfooter',
    label: 'Pie del Comprobante',
    controlType: HTML_EDITOR
  }

export const FORMULARIO_HISTORY_GRID_DEF = {
  columnsDef: [
    {
      columnDef: 'id',
      columnNameKey: 'formulario_history_grid_def_column_id',
      id: true
    },
    {
      columnDef: 'formularioId',
      columnNameKey: 'formulario_history_grid_def_column_formularioid'
    },
    {
      columnDef: 'name',
      columnNameKey: 'formulario_history_grid_def_column_name'
    },
    {
      columnDef: 'remarks',
      columnNameKey: 'formulario_history_grid_def_column_remarks'
    },
    {
      columnDef: 'minQuota',
      columnNameKey: 'formulario_history_grid_def_column_minquota'
    },
    {
      columnDef: 'quota',
      columnNameKey: 'formulario_history_grid_def_column_quota'
    },
    {
      columnDef: 'fromDateString',
      columnNameKey: 'formulario_history_grid_def_column_fromdatestring'
    },
    {
      columnDef: 'toDateString',
      columnNameKey: 'formulario_history_grid_def_column_todatestring'
    },
    {
      columnDef: 'validateUser',
      columnNameKey: 'formulario_history_grid_def_column_validateuser'
    },
    {
      columnDef: 'showTitle',
      columnNameKey: 'formulario_history_grid_def_column_showtitle'
    },
    {
      columnDef: 'headerImage',
      columnNameKey: 'formulario_history_grid_def_column_headerimage'
    },
    {
      columnDef: 'place',
      columnNameKey: 'formulario_history_grid_def_column_place'
    },
    {
      columnDef: 'dateString',
      columnNameKey: 'formulario_history_grid_def_column_datestring'
    },
    {
      columnDef: 'isCurso',
      columnNameKey: 'formulario_history_grid_def_column_iscurso'
    },
    {
      columnDef: 'fields',
      columnNameKey: 'formulario_history_grid_def_column_fields'
    },
    {
      columnDef: 'description',
      columnNameKey: 'formulario_history_grid_def_column_description'
    },
    {
      columnDef: 'finalMessage',
      columnNameKey: 'formulario_history_grid_def_column_finalmessage'
    },
    {
      columnDef: 'showReceipt',
      columnNameKey: 'formulario_history_grid_def_column_showreceipt'
    },
    {
      columnDef: 'receiptFooter',
      columnNameKey: 'formulario_history_grid_def_column_receiptfooter'
    },
    {
      columnDef: 'lastEditUser',
      columnNameKey: 'formulario_history_grid_def_column_updateuser'
    },
    {
      columnDef: 'lastEditDateString',
      columnNameKey: 'formulario_history_grid_def_column_updatedatestring'
    }
  ],
  sortAllColumns: true,
  displayedColumns: [
    'lastEditUser',
    'lastEditDateString'
  ],
  actions : [
    {
      actionNameKey: 'formulario_history_grid_def_column_descripcion',
      icon: 'description',
      formDef : {
        showSubmitButton: false,
        fields: [form_descripcion]
      }
    },
    {
      actionNameKey: 'formulario_history_grid_def_column_finalMessge',
      icon: 'message',
      formDef: {
        fields: [ form_finalMessage ],
        showSubmitButton: false
      }
    },
    {
      actionNameKey: 'formulario_history_grid_def_column_receipt',
      icon: 'receipt',
      formDef: {
        showSubmitButton: false,
        fields : [
          {
            key: 'showReceipt',
            labelKey: 'formulario_history_grid_def_column_showReceipt',
            label: 'Mostrar Comprobante',
            controlType: 'checkbox'
          },
          {
            key: 'receiptFooter',
            labelKey: 'formulario_history_grid_def_column_receiptfooter',
            label: 'Pie del Comprobante',
            controlType: HTML_EDITOR
          }
        ]
      }
    },
    {
      actionNameKey: 'formulario_history_grid_def_column_fields',
      icon: 'format_list_bulleted',
      formDef: {
        fields: [ 
          {
            key: 'fieldsIndented',
            label: 'Fields',
            controlType: TEXTAREA
          }
         ],
        showSubmitButton: false
      }
    },
    {
      actionNameKey: 'formulario_history_grid_def_column_restoreversion',
      icon: 'repartition',
      formDef: {
        showSubmitContinue: false,
        fields:[
          {
            key: 'checkGeneralSettings',
            label: 'Restaurar Info',
            controlType: 'checkbox'
          },
          {
            key: 'checkDescription',
            label: 'Restaurar Descripción',
            controlType: 'checkbox'
          },  
          {
            key: 'checkFinalMessage',
            label: 'Restaurar Mensaje Final',
            controlType: 'checkbox'
          }, 
          {
            key: 'checkResumen',
            labelKey: 'CONTENIDO_HISTORY_FORM_FIELDS_RESUMEN',
            label: 'Restaurar Resumen',
            controlType: 'checkbox'
          }, 
          {
            key: 'checkReceipt',
            label: 'Restaurar Comprobante',
            controlType: 'checkbox'
          }, 
          {
            key: 'checkFields',
            label: 'Restaurar Campos',
            controlType: 'checkbox'
          }, 
          {
            key: 'id',
            controlType: 'hidden'
          }
        ]
      },
      ws: {
        key: 'formulario_history_grid_def_column_restoreversion',
        url: PREFIX_DOMAIN_API + 'Form/RestoreVersion',
        method: 'PUT'
      }
    }
  ]
};
