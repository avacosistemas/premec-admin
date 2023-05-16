import { Injectable } from '@angular/core';
import { I18n } from '../../model/i18n';
import { ActionDef, ACTION_TYPES } from '../../model/component-def/action-def';
import { Observable ,  of } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { HTTP_METHODS } from '../../model/ws-def';
import { GenericHttpService } from '../generic-http-service/generic-http.service';
import { constants } from 'fs';
export const LOGIN_FORM_USERDATA = 'LOGIN_FORM_USERDATA';
export const I18N_DATA = 'I18N_DATA';
export const TO_CLONE_DATA = 'TO_CLONE_DATA';
export const USER_DATA_FOR_FORCE_CHANGE_PASSWORD = 'USER_DATA_FOR_FORCE_CHANGE_PASSWORD';
export const TOKEN_NAME = 'jwt_token';

@Injectable()
export class FileService {

  constructor(private localStorageService: LocalStorageService,
              private genericHttpService: GenericHttpService) { }

  downloadFileByAction(action: ActionDef, entity): Observable<any>{
        if (action.actionType === ACTION_TYPES.file_download){

          const observable = new Observable( obs => {
            const ws = this.localStorageService.clone(action.ws);
            ws.method = HTTP_METHODS.get;
          // ws.url = action.ws.url + '/' + entity.id;
          this.genericHttpService.callWs(ws, entity).subscribe(
            r => {
              if (Object.prototype.toString.call(r) === '[object Array]') {
                if (r.length > 0){
                  r = r[0];
                }
              }
              this.downloadFileOctectStream(r);
            }, 
            e => {
              obs.error(e);
            }, 
            () => {
              obs.complete();
            }
          );
          
        }
      );
      return observable;
    }
    return of();
  }

  private downloadFile(fileEntity){
   const array = new Uint8Array(fileEntity.file);
   this.createAndDownloadBlobFile(array, undefined, fileEntity.fileName);
  }

  private downloadFileOctectStream(fileEntity){
    const decoded_data = atob(fileEntity.file);
    // this.downloadFile(fileEntity);
    const byteNumbers = new Array(decoded_data.length);
    for (let i = 0; i < decoded_data.length; i++) {
        byteNumbers[i] = decoded_data.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    this.createAndDownloadBlobFile(byteArray, undefined, fileEntity.fileName);
  }
          
  createAndDownloadBlobFile(body, options, filename) {
    const blob = new Blob([body], options);
    if (navigator.msSaveBlob) 
    { 
        // IE 10+
        navigator.msSaveBlob(blob, filename);
    } 
    else
    {
        const link = document.createElement('a');
        // Browsers that support HTML5 download attribute
        if (link.download !== undefined) 
        {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
  }

  public downloadCsv(data: any, exportFileName: string) {
      const csvData = this.convertToCSV(data);
      const blob = new Blob([csvData], { type: 'text/csv;charset=iso-8859-1;' });

      if (navigator.msSaveBlob) { // IE 10+
          navigator.msSaveBlob(blob, this.createFileName(exportFileName));
      } else {
        const link = document.createElement('a');
          if (link.download !== undefined) { // feature detection
              // Browsers that support HTML5 download attribute
              const url = URL.createObjectURL(blob);
              link.setAttribute('href', url);
              link.setAttribute('download', this.createFileName(exportFileName));
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
          }
      }
  }
  private convertToCSV(objarray: any) {
    const array = typeof objarray !== 'object' ? JSON.parse(objarray) : objarray;
    let str = '';
    let row = '';

      for (let index in objarray[0]) {
          //Now convert each value to string and comma-separated
          row += index + ',';
      }
      row = row.slice(0, -1);
      //append Label row with line break
      str += row + '\r\n';

      for (let i = 0; i < array.length; i++) {
        let line = '';
          for (let index in array[i]) {
              if (line != '') line += ','
              line += JSON.stringify(array[i][index]);
          }
          str += line + '\r\n';
      }
      return str;
  }

  private  createFileName(exportFileName: string): string {
      const date = new Date();
      return (exportFileName +
          date.toLocaleDateString() + '_' +
          date.toLocaleTimeString()
          + '.csv');
  }
}
