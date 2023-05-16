import { FILTER_TYPE } from "app/modules/fwk/core/service/filter-service/filter.service";
import { PREFIX_DOMAIN_API } from "environments/environment";

export const PERFIL_EMAIL_GRID_DEF = {
  columnsDef: [
    {
      columnDef: 'idContactData',
      id: true,
      columnNameKey: 'perfil_email_grid_def_column_idcontactdata'
    },
    {
      columnDef: 'email',
      columnNameKey: 'perfil_email_grid_def_column_email'
    },
    {
      columnDef: 'tipoEmail',
      columnNameKey: 'perfil_email_grid_def_column_tipoemail'
    }
  ],
  actions : [
    {
      actionNameKey: 'Eliminar',
      icon: 'delete',
      confirm: true,
      ws: {
        key: 'section_topic_grid_def_button_action_bajar',
        url: PREFIX_DOMAIN_API + 'admin/personas/contactos/email',
        method: 'DELETE'
      }
    },
    {
      actionNameKey: 'perfil_email_grid_action_setearparticular',
      icon: 'mark_email_read',
      confirm: true,
      ws: {
        key: 'perfil_email_grid_action_setearparticular',
        url: PREFIX_DOMAIN_API + 'admin/personas/contact/email/particular',
        method: 'PUT'
      }
    },
  ],
  sortAllColumns: true,
  displayedColumns: [
    //'idContactData',
    'tipoEmail',
    'email',
  ],
  displayedActionsCondition: [
    {
      key: 'perfil_email_grid_action_setearparticular',
      expression: {
        key: 'tipoEmail',
        value: 'Particular',
        compare: FILTER_TYPE.NOTEQUALS
      }
    }
  ]
};
