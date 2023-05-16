import { HTML_EDITOR } from "app/modules/fwk/core/model/dynamic-form/dynamic-field";
import { PREFIX_DOMAIN_API, PREFIX_INSTITUCIONAL } from "environments/environment";
import { GridDef } from "app/modules/fwk/core/model/component-def/grid-def";
import { FORMULARIO_HISTORY_NAV_DEF } from "../../formulario_history/navigation/formulario_history.nav";

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

/*const form_receipt = [
  {
    key: 'showReceipt',
    labelKey: 'formulario_create_form_fields_def_field_showreceipt',
    label: 'Mostrar Comprobante',
    type: 'boolean',
    controlType: 'checkbox'
  },
  {
    key: 'receiptFooter',
    labelKey: 'formulario_create_form_fields_def_field_receiptfooter',
    label: 'Pie del Comprobante',
    controlType: HTML_EDITOR,
    maxLength: 8000
  }
]*/

export const FORMULARIO_GRID_DEF: GridDef = {
  columnsDef: [
    {
      columnDef: 'id',
      id: true,
      columnNameKey: 'formulario_grid_def_column_id'
    },
    {
      columnDef: 'name',
      columnNameKey: 'formulario_grid_def_column_name'
    },
    {
      columnDef: 'description',
      columnNameKey: 'formulario_grid_def_column_description'
    },
    {
      columnDef: 'remarks',
      columnNameKey: 'formulario_grid_def_column_remarks'
    },
    {
      columnDef: 'finalMessage',
      columnNameKey: 'formulario_grid_def_column_finalmessage'
    },
    {
      columnDef: 'minQuota',
      columnNameKey: 'formulario_grid_def_column_minquota'
    },
    {
      columnDef: 'allowQueue',
      columnNameKey: 'formulario_grid_def_column_allowqueue'
    },
    {
      columnDef: 'fromDate',
      columnNameKey: 'formulario_grid_def_column_fromdate'
    },
    {
      columnDef: 'toDate',
      columnNameKey: 'formulario_grid_def_column_todate'
    },
    {
      columnDef: 'createDate',
      columnNameKey: 'formulario_grid_def_column_createdate'
    },
    {
      columnDef: 'lastEditDateString',
      columnNameKey: 'formulario_grid_def_column_lastEditDateString'
    },
    {
      columnDef: 'createUser',
      columnNameKey: 'formulario_grid_def_column_createUser'
    },
    {
      columnDef: 'lastEditUser',
      columnNameKey: 'formulario_grid_def_column_lastEditUser'
    },
    {
      columnDef: 'validateUser',
      columnNameKey: 'formulario_grid_def_column_validateuser'
    },
    {
      columnDef: 'showUserData',
      columnNameKey: 'formulario_grid_def_column_showuserdata'
    },
    {
      columnDef: 'showReceipt',
      columnNameKey: 'formulario_grid_def_column_showreceipt'
    },
    {
      columnDef: 'receiptFooter',
      columnNameKey: 'formulario_grid_def_column_receiptfooter'
    },
    {
      columnDef: 'allowUpdates',
      columnNameKey: 'formulario_grid_def_column_allowupdates'
    },
    {
      columnDef: 'showTitle',
      columnNameKey: 'formulario_grid_def_column_showtitle'
    },
    {
      columnDef: 'headerImage',
      columnNameKey: 'formulario_grid_def_column_headerimage'
    },
    {
      columnDef: 'place',
      columnNameKey: 'formulario_grid_def_column_place'
    },
    {
      columnDef: 'date',
      columnNameKey: 'formulario_grid_def_column_date'
    },
    {
      columnDef: 'dateString',
      columnNameKey: 'formulario_grid_def_column_date'
    },
    {
      columnDef: 'contact',
      columnNameKey: 'formulario_grid_def_column_contact'
    },
    {
      columnDef: 'inscriptos',
      columnNameKey: 'formulario_grid_def_column_inscriptos'
    },
    {
      columnDef: 'quota',
      columnNameKey: 'formulario_grid_def_column_quotacol'
    },
    {
      columnDef: 'isPublished',
      columnNameKey: 'formulario_grid_def_column_isPublished'
    },
    {
      columnDef: 'isCurso',
      columnNameKey: 'formulario_grid_def_column_isCurso'
    }
  ],
  sortAllColumns: true,
  groupActions: true,
  deleteAction: true,
  displayedColumns: [
    'id',
    'name',
    'fromDate',
    'toDate',
    'minQuota',
    'inscriptos',
    'quota',
    'isCurso',
    'dateString',
    'lastEditUser',
    'lastEditDateString'

  ],
  actions: [
    {
      actionNameKey: 'formulario_grid_def_button_action_descripcion',
      icon: 'description',
      formDef : {
        fields: [form_descripcion],
        showSubmitContinue: true
      },
      ws: {
        key: 'formulario_grid_def_button_action_descripcion',
        url: PREFIX_DOMAIN_API + 'Form/UpdateDescription/',
        method: 'PUT'
      }
    },
    {
      actionNameKey: 'formulario_grid_def_button_action_finalMessage',
      icon: 'message',
      formDef: {
        fields: [ form_finalMessage ],
        showSubmitContinue: true
      },
      ws: {
        key: 'formulario_grid_def_button_action_finalMessage',
        url: PREFIX_DOMAIN_API + 'Form/UpdateFinalMessage/',
        method: 'PUT'
      }
    },
    {
      actionNameKey: 'formulario_grid_def_button_action_receipt',
      icon: 'receipt',
      formDef: {
        showSubmitContinue: true,
        fields : [
          {
            key: 'showReceipt',
            labelKey: 'formulario_create_form_fields_def_field_showreceipt',
            label: 'Mostrar Comprobante',
            controlType: 'checkbox'
          },
          {
            key: 'receiptFooter',
            labelKey: 'formulario_create_form_fields_def_field_receiptfooter',
            label: 'Pie del Comprobante',
            controlType: HTML_EDITOR
          }
        ]
      },
      ws: {
        key: 'formulario_grid_def_button_action_receipt',
        url: PREFIX_DOMAIN_API + 'Form/UpdateReceipt/',
        method: 'PUT'
      }
    },
    {
      actionNameKey: 'formulario_grid_def_button_action_campos',
      icon: 'format_list_bulleted',
      actionType: 'redirect',
      redirect: {
        url: '/campo',
        querystring: {
          idForm : 'id',
          parentTitle: 'name'
        }
      }
    },
    {
      actionNameKey: 'formulario_grid_def_button_action_inscriptos',
      icon: 'group',
      actionType: 'redirect',
      redirect: {
        url: '/formResponse',
        querystring: {
          idForm : 'id',
          parentTitle: 'name'
        }
      }
    },
    {
      actionNameKey: 'formulario_grid_def_button_action_copiar',
      icon: 'file_copy',
      form: [
        {
          key: 'name',
          labelKey: 'formulario_create_form_fields_def_field_name',
          label: 'Nombre',
          controlType: 'textbox',
          maxLength: 200,
          required: true
        }
      ],
      ws: {
        key: 'formulario_grid_def_button_action_copiar',
        url: PREFIX_DOMAIN_API + 'Form/copiar/',
        method: 'PUT'
      }
    },
    {
      actionNameKey: 'formulario_grid_def_button_action_publicar',
      icon: 'cloud_upload',
      confirm: true,
      ws: {
        key: 'formulario_grid_def_button_action_publicar',
        url: PREFIX_DOMAIN_API + 'Form/publicar/',
        method: 'PUT'
      }
    },
    {
      actionNameKey: 'formulario_grid_def_button_action_despublicar',
      icon: 'cloud_download',
      confirm: true,
      ws: {
        key: 'formulario_grid_def_button_action_despublicar',
        url: PREFIX_DOMAIN_API + 'Form/despublicar/',
        method: 'PUT'
      }
    },
    {
      actionNameKey: 'formulario_grid_button_action_file_export',
      actionType: 'file-download',
      icon: 'launch',
      ws: {
        key: 'formulario_grid_button_action_file_export',
        url: PREFIX_DOMAIN_API + 'Form/ExportForm',
        method: 'GET',
        querystring: {
          idForm: 'id'
        }
      }
    },
    {
      actionNameKey: 'Previsualizar',
      actionType: 'redirect',
      redirect: {
        openTab: true,
        externalUrl: true,
        idUrl: true,
        url: PREFIX_INSTITUCIONAL + '/formularios',
        querystring: {
          id : 'id'
        }
      },
      icon: 'filter_none'
    },
    {
      actionNameKey: 'Versiones Anteriores',
      actionType: 'redirect',
      redirect: {
        url: FORMULARIO_HISTORY_NAV_DEF.url,
        querystring: {
          formularioId : 'id',
          parentTitle: 'name'
        }
      },
      icon: 'manage_history'
    }
    
  ],
  displayedActionsCondition: [
     {
       key: 'formulario_grid_def_button_action_publicar',
       expression: {
                     key: 'isNotPublished',
                     value: true
                   }
     },
     {
       key: 'formulario_grid_def_button_action_despublicar',
       expression: {
                     key: 'isPublished',
                     value: true
                   }
     }
  ]
};
