import { DynamicField } from '../dynamic-form/dynamic-field';
import { DynamicFieldBehavior } from '../dynamic-form/dynamic-field-behavior';
import { FormDef } from '../form-def';

export class FormsDef{
    filter?: FormDef;
    update?: FormDef;
    create?: FormDef;
    read?: FormDef;
}
