import { Entity } from '../entity';
import { DynamicField } from './dynamic-field';
import { DynamicFieldConditionIf } from './dynamic-field-condition-if';
import { ThenDynamicField } from './dynamic-field-then';


export class DynamicFieldCondition{
  if?: DynamicFieldConditionIf [];
  then: ThenDynamicField[];
  else?: ThenDynamicField[];
}
