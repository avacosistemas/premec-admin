import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PREFIX_DOMAIN_API } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class UploadService {

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${PREFIX_DOMAIN_API}admin/bulkUpload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

}
