import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NotificationService } from 'app/modules/fwk/core/service/notification/notification.service';
import { Observable } from 'rxjs';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  selectedFiles: FileList;
  progressInfos = [];
  message = '';

  fileInfos: Observable<any>;

  constructor(private uploadService: UploadService,
              private notificationService: NotificationService) { }

  selectFiles(event) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  uploadFiles() {
    this.message = '';
  
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }

  upload(idx, file) {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
  
    this.uploadService.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.notificationService.notifySuccess('Archivos subidos correctamente');
        }
      },
      err => {
        this.progressInfos[idx].value = 0;
        this.message = 'Error al subir el archivo:' + file.name;
        this.notificationService.notifyError(this.message);
      });
  }

}
