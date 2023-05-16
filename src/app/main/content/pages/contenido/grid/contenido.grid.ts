import { PREFIX_DOMAIN_API, PREFIX_INSTITUCIONAL } from "environments/environment";
import { HTML_EDITOR } from "app/modules/fwk/core/model/dynamic-form/dynamic-field";
import { GridDef } from "app/modules/fwk/core/model/component-def/grid-def";
import { CONTENIDO_HISTORY_DEF } from "../../contenidoHistory/contenidoHistory.def";
import { CONTENIDO_HISTORY_NAV_DEF } from "../../contenidoHistory/navigation/contenidoHistory.nav";

export const CONTENIDO_GRID_DEF: GridDef = {
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
  groupActions: true,
  sortAllColumns: true,
  deleteAction: true,
  displayedColumns: [
    'title',
    'publishDateString',
    'expirationDateString',
    'createUser',
    'createDateString',
    'lastEditUser',
    'lastEditDateString',
  ],
  actions: [
    {
      actionNameKey: 'contenido_grid_def_button_action_resumen',
      icon: 'notes',
      formDef: {
        showSubmitContinue: true,
        fields:[
          {
            key: 'summary',
            labelKey: 'contenido_create_form_fields_def_field_summary',
            label: 'Resumen',
            controlType: HTML_EDITOR
          }
        ]
      },
      ws: {
        key: 'contenido_grid_def_button_action_resumen',
        url: PREFIX_DOMAIN_API + 'Content/UpdateSummary',
        method: 'PUT'
      }
    },
    {
      actionNameKey: 'contenido_grid_def_button_action_texto',
      icon: 'menu_book',
      formDef: {
        showSubmitContinue: true,
        fields:[
          {
            key: 'text',
            labelKey: 'contenido_create_form_fields_def_field_text',
            label: 'Texto',
            controlType: HTML_EDITOR
          }
        ]
      },
      
      ws: {
        key: 'contenido_grid_def_button_action_texto',
        url: PREFIX_DOMAIN_API + 'Content/UpdateText',
        method: 'PUT'
      }
    },
    {
      actionNameKey: 'contenido_grid_def_button_action_imagenes',
      icon: 'photo_album',
      actionType: 'redirect',
      redirect: {
        url: '/contentImage',
        querystring: {
          contentId : 'id',
          parentTitle: 'title'
        }
      }
    },
    {
      actionNameKey: 'Previsualizar',
      actionType: 'redirect',
      redirect: {
        externalUrl: true,
        openTab: true,
        idUrl: true,
        url: PREFIX_INSTITUCIONAL +  '/notaPreview',
        querystring: {
          id : 'id'
        }
      },
      icon: 'filter_none'
    },
    {
      actionNameKey: 'contenido_grid_def_button_action_duplicate',
      icon: 'control_point_duplicate',
      formDef: {
        showSubmitContinue: false,
        fields:[
          {
            key: 'title',
            labelKey: 'CONTENIDO_FILTER_FORM_FIELDS_DEF_FIELD_title',
            label: 'T�tulo',
            controlType: 'textbox'
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
        key: 'contenido_grid_def_button_action_duplicate',
        url: PREFIX_DOMAIN_API + 'Content/Duplicate',
        method: 'POST'
        
        
      }
    },
    {
      actionNameKey: 'Secciones',
      actionType: 'redirect',
      redirect: {
        url: "/seccionesContenido",
        querystring: {
          contenidoId : 'id'
        }
      },
      icon: 'dashboard'
    },
    {
      actionNameKey: 'Versiones Anteriores',
      actionType: 'redirect',
      redirect: {
        url: CONTENIDO_HISTORY_NAV_DEF.url,
        querystring: {
          contentId : 'id',
          parentTitle: 'title'
        }
      },
      icon: 'manage_history'
    },
    
  ]
};
