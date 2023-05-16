import { Entity } from '../entity';
import { DynamicField } from './dynamic-field';

export class ThenDynamicField extends DynamicField<any>{
  showErrorMsgKey?: string;
  showErrorMsg?: string;
}
