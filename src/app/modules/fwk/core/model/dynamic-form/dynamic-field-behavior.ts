import { Entity } from '../entity';
import { DynamicField } from './dynamic-field';
import { DynamicFieldCondition } from './dynamic-field-condition';

export class DynamicFieldBehavior{
  fieldKey: string;
  condition: DynamicFieldCondition;
}
