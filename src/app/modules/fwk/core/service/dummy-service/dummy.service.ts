import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { User } from '../../model/user';
import { Injectable } from '@angular/core';
import { SetUpDummyDataService } from './setup-dummy-data.service';
import { ComponentDef } from '../../model/component-def/component-def';
import { ComponentDefService } from '../component-def-service/component-def.service';


@Injectable()
export class DummyService{
 
  cache = {};
  localStorageService: LocalStorageService;
  componentsDef: ComponentDef [];
  constructor(private injector: Injector){
    this.localStorageService = injector.get(LocalStorageService);
    const value = this.localStorageService.get('mock_data_storage');
    if (value === undefined || value === null){
      const init = new SetUpDummyDataService(this);
      this.localStorageService.save('mock_data_storage', true);
    }
  }

  httpGet(url){
    return new Observable(o => {
      const cache = this.getCache(url);
      o.next(this.localStorageService.clone(cache[url]));
      o.complete();
    });
  }

  getCache(url){
    let cache = this.localStorageService.get('dummy_service');
    if (cache === undefined || cache === null){
      cache = {};
    }      
    if (cache[url] === undefined){
      cache[url] = [];
    }
    this.cache = cache;
    return this.cache;
  }
  httpPut(url, entity){
    return new Observable(o => {
      const cache = this.getCache(url);
      const newData = cache[url].map(item => item.id === entity.id ? entity : item);
      cache[url] = newData;
      this.cache = cache;
      this.localStorageService.save('dummy_service', cache);
      o.next(this.localStorageService.clone(entity));
      o.complete();
    });
  }

  httpPost(url, entity){
    return new Observable(o => {
      const cache = this.getCache(url);
      entity.id = cache[url].length;
      cache[url].push(entity);
      this.localStorageService.save('dummy_service', cache);
      this.cache = cache;
      o.next(this.localStorageService.clone(entity));
      o.complete();
    });
  }

  httpDelete(url, ids: number[]){
    return new Observable(o => {
      const cache = this.getCache(url);
      ids.forEach(id => {
        
          cache[url] = cache[url].filter(
          el => el.id !== id);
      });
      this.cache = cache;  
      this.localStorageService.save('dummy_service', cache);
        
      o.next();
      o.complete();
    });
  }

}
