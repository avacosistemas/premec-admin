import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Injector } from '@angular/core';
import { OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { MessageService } from '../message/message.service';


export abstract class BaseService {

  protected messageService: MessageService;
  protected localStorageService: LocalStorageService;
  constructor(protected injector: Injector) {
     this.messageService = injector.get(MessageService);
     this.localStorageService = injector.get(LocalStorageService);
  }

  /** Log a EService message with the MessageService */
  protected log(message: string) {
    this.messageService.add('EService: ' + message);
  }
}
