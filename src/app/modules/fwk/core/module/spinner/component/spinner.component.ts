import { OnInit, Component, Injector, Input, Output, EventEmitter} from '@angular/core';
import { DynamicField } from '../../../model/dynamic-form/dynamic-field';
import { FormGroup } from '@angular/forms';
import { AbstractComponent } from '../../../component/abstract-component.component';
import { SpinnerService } from '../service/spinner.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent extends AbstractComponent implements OnInit {

  @Input()
  spinnerKey: string;  

  spinnerService: SpinnerService;
  controlSpinner: any;

  constructor(private injector: Injector){
    super(injector);
    this.spinnerService = injector.get(SpinnerService);
  }

  onInit(){
    this.controlSpinner = this.spinnerService.addSpinner(this.spinnerKey);
  }

  get show(){
    if (this.controlSpinner){
      return this.controlSpinner.isShow();
    }
    return false;
  }
}
