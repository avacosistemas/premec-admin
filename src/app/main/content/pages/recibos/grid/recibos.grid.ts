import { PREFIX_DOMAIN_API } from 'environments/environment';
import { HTTP_METHODS } from 'app/modules/fwk/core/model/ws-def';

export const RECIBOS_GRID_DEF = {
    columnsDef: [
        {
            columnDef: 'attachmentEntry',
            columnNameKey: 'recibos_grid_column_attachmentEntry'
        },
        {
            columnDef: 'year',
            columnNameKey: 'recibos_grid_column_year'
        },
        {
            columnDef: 'month',
            columnNameKey: 'recibos_grid_column_month',
            hidden: true
        },
        {
            columnDef: 'monthString',
            columnNameKey: 'recibos_grid_column_monthString'
        },
        {
            columnDef: 'tipo',
            columnNameKey: 'recibos_grid_column_tipo'
        },
    ],

    displayedColumns: [
        'attachmentEntry',
        'year',
        'monthString',
        'tipo',
    ],
    sortAllColumns: true,

    actions: [
        {
            actionNameKey: 'recibos_grid_action_download_receipt',
            actionType: 'file-download',
            labelTitle: 'Descargar Recibo',
            icon: 'file_download',

            ws: {
                key: 'DOWNLOAD_RECIBO_WS',
                url: PREFIX_DOMAIN_API + 'descargarRecibo',
                method: 'GET',
                querystring: {
                    id: 'id'
                }
            }
        },
    ],
    deleteAction: false
};

