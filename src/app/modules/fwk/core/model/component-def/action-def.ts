import { WsDef } from '../ws-def';
import { DynamicField } from '../dynamic-form/dynamic-field';
import { HtmlModalDef } from './html-modal-def';
import { FormDef } from '../form-def';
export const ACTION_TYPES = {
    normal: 'normal',
    file_download: 'file-download',
    redirect: 'redirect'
};
export class ActionDef {
    // Obligatorios
    actionNameKey?: string;
    // Opcionales
    /* 
      El atributo indefinido indica que la query del wsdef va a ser normal.
      file-download -> indica descarga de archivo desde una url tipo get, a esta se le pasa el id del registro
    */
    actionName?: string;
    icon?: string;
    form?: DynamicField<any>[];
    formDef?: FormDef;
    actionType?: string;
    htmlModal?: HtmlModalDef; // Si es un modal que muestra contenido html especificar su contenido
    gridModal?: any;
    ws?: WsDef;
    input?: any;
    confirm?: any;
    redirect?: any;
}
