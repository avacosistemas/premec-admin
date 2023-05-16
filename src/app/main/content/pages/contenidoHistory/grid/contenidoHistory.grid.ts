import { PREFIX_DOMAIN_API} from "environments/environment";
import { HTML_EDITOR } from "app/modules/fwk/core/model/dynamic-form/dynamic-field";
import { GridDef } from "app/modules/fwk/core/model/component-def/grid-def";

export const CONTENIDO_HISTORY_GRID_DEF: GridDef = {
  columnsDef: [
    {
      columnDef: 'title',
      columnNameKey: 'contenido_grid_def_column_title'
    },
    {
      columnDef: 'showTitle',
      columnNameKey: 'contenido_grid_def_column_showtitle'
    },
    {
      columnDef: 'subTitle',
      columnNameKey: 'contenido_grid_def_column_subtitle'
    },
    // {
    //   columnDef: 'source',
    //   columnNameKey: 'contenido_grid_def_column_source'
    // },
    {
      columnDef: 'summary',
      columnNameKey: 'contenido_grid_def_column_summary'
    },
    {
      columnDef: 'text',
      columnNameKey: 'contenido_grid_def_column_text'
    },
    {
      columnDef: 'link',
      columnNameKey: 'contenido_grid_def_column_link'
    },
    {
      columnDef: 'linkTarget',
      columnNameKey: 'contenido_grid_def_column_linktarget'
    },
    {
      columnDef: 'publishDate',
      columnNameKey: 'contenido_grid_def_column_publishdate'
    },
    {
      columnDef: 'expirationDate',
      columnNameKey: 'contenido_grid_def_column_expirationdate'
    },
    {
      columnDef: 'showPublishDate',
      columnNameKey: 'contenido_grid_def_column_showpublishdate'
    },
    {
      columnDef: 'eventCategoryId',
      columnNameKey: 'contenido_grid_def_column_eventcategoryid'
    },
    {
      columnDef: 'eventStartDate',
      columnNameKey: 'contenido_grid_def_column_eventstartdate'
    },
    {
      columnDef: 'eventEndDate',
      columnNameKey: 'contenido_grid_def_column_eventenddate'
    },
    {
      columnDef: 'eventPlace',
      columnNameKey: 'contenido_grid_def_column_eventplace'
    },
    {
      columnDef: 'createDateString',
      columnNameKey: 'contenido_grid_def_column_createdate'
    },
    {
      columnDef: 'lastEditDate',
      columnNameKey: 'contenido_grid_def_column_lasteditdate'
    },
    {
      columnDef: 'allowAnonymous',
      columnNameKey: 'contenido_grid_def_column_allowanonymous'
    },
    {
      columnDef: 'publishDateString',
      columnNameKey: 'Fecha Publicación'
    },
    {
      columnDef: 'expirationDateString',
      columnNameKey: 'Fecha Expiración'
    },
    {
      columnDef: 'id',
      key: true,
      columnNameKey: 'contenido_grid_def_column_id'
    },
    {
      columnDef: 'lastEditDateString',
      columnNameKey: 'contenido_grid_def_column_lastEditDateString'
    },
    {
      columnDef: 'createUser',
      columnNameKey: 'contenido_grid_def_column_createUser'
    },
    {
      columnDef: 'lastEditUser',
      columnNameKey: 'contenido_grid_def_column_lastEditUser'
    }
  ],
  sortAllColumns: true,
  deleteAction: false,
  displayedColumns: [
    'lastEditUser',
    'lastEditDateString',
  ],
  actions: [
    {
      actionNameKey: 'contenido_grid_def_button_action_resumen',
      icon: 'notes',
      formDef: {
        showSubmitButton: false,
        fields:[
          {
            key: 'summary',
            labelKey: 'contenido_create_form_fields_def_field_summary',
            label: 'Resumen',
            controlType: HTML_EDITOR
          }
        ]
      }
    },
    {
      actionNameKey: 'contenido_grid_def_button_action_texto',
      icon: 'menu_book',
      formDef: {
        showSubmitButton: false,
        fields:[
          {
            key: 'text',
            labelKey: 'contenido_create_form_fields_def_field_text',
            label: 'Texto',
            controlType: HTML_EDITOR
          }
        ]
      }
    },
    {
      actionNameKey: 'contenido_grid_def_button_action_restore',
      icon: 'repartition',
      formDef: {
        showSubmitContinue: false,
        fields:[
          {
            key: 'info',
            labelKey: 'CONTENIDO_HISTORY_FORM_FIELDS_INFO',
            label: 'Restaurar Info',
            controlType: 'checkbox'
          },
          {
            key: 'agenda',
            labelKey: 'CONTENIDO_HISTORY_FORM_FIELDS_AGENDA',
            label: 'Restaurar Agenda',
            controlType: 'checkbox'
          },  
          {
            key: 'beneficios',
            labelKey: 'CONTENIDO_HISTORY_FORM_FIELDS_BENEFICIOS',
            label: 'Restaurar Beneficios',
            controlType: 'checkbox'
          }, 
          {
            key: 'resumen',
            labelKey: 'CONTENIDO_HISTORY_FORM_FIELDS_RESUMEN',
            label: 'Restaurar Resumen',
            controlType: 'checkbox'
          }, 
          {
            key: 'texto',
            labelKey: 'CONTENIDO_HISTORY_FORM_FIELDS_TEXTO',
            label: 'Restaurar Texto',
            controlType: 'checkbox'
          }, 
          {
            key: 'id',
            labelKey: 'CONTENIDO_UPDATE_FORM_FIELDS_DEF_FIELD_id',
            label: 'Id',
            controlType: 'hidden'
          }
        ]
      },
      ws: {
        key: 'contenido_grid_def_button_action_restore',
        url: PREFIX_DOMAIN_API + 'Content/RestoreVersion',
        method: 'PUT'
      }
    }
  ]
};
