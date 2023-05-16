import { Component, OnInit} from '@angular/core';
import { Injector } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { COMPONENTS } from '../../../main/content/pages/integration.components';
import { AbstractComponent } from 'app/modules/fwk/core/component/abstract-component.component';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class IntegrationComponent extends AbstractComponent implements OnInit{
  route: ActivatedRoute;

  template: string;
  constructor(injector: Injector) {
    super(injector);
    this.route = injector.get(ActivatedRoute);
  }

  ngOnInit(){
    const component = this.getComponentDefByUrl(this.route.routeConfig.path);
    if (component){
      this.template = component.template;
      this.setUpComponentDef(component);
    }
  }

  getComponentDefByUrl(url: string): any {
    if (url){
      const component = COMPONENTS.find(comp => comp.navigation.url === ('/' + url));
      return component === undefined ? undefined : component;
    }
    return;
  }
}
