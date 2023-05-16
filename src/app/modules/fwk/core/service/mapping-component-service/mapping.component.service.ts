import { Navigation } from 'selenium-webdriver';
import { NavigationService } from '../navigation/navigation.service';
import { Observable } from 'rxjs';
import { Route, Routes } from '@angular/router';
import { ComponentDef } from '../../model/component-def/component-def';

export class MappingComponentService {

  constructor() { }

  static resolveStyles(mappings: ComponentDef[]){
      const styleUrls: any [] = [];
      mappings.forEach(mapping => {
          styleUrls.push(mapping.styleUrl);
      });
      console.log(styleUrls);
      return (styleUrls);
  }
}
