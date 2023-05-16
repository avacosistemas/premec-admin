import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Injector } from '@angular/core';
import { OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { MessageService } from '../message/message.service';
import { CrudService } from '../crud-service/crud.service';
import { Entity } from '../../model/entity';

@Injectable()
export class BaseCrudService extends CrudService<any> {

  constructor(protected injector: Injector) { 
     super('', injector);
  }
  
  setBaseURL(url: string){
    this.baseUrl = url;
  }
}
