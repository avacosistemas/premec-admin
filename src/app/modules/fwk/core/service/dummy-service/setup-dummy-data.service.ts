import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { User } from '../../model/user';
import { Injectable } from '@angular/core';
import { DummyService } from './dummy.service';
import { DOWNLOAD_FILE_DATA } from './dummy-data/download-file.data';
import { environment } from 'environments/environment';
import { COMPONENTS } from '../../../../../main/content/pages/integration.components';


export class SetUpDummyDataService{
 

  constructor(dummyService: DummyService){
    const functionalities = COMPONENTS.filter(c => c.test).map(c =>  c.test);
    functionalities.forEach(functionality => {
      this.setUpByIntegration(dummyService, functionality);
    });
  }

  setUpByIntegration(dummyService, functionality){
    if (functionality){
      functionality.forEach(integration => {
        integration.dataset.forEach(data => {
          dummyService.httpPost(integration.url, data).subscribe(r2 => {});
        });
      });
    }
  }
 
}
