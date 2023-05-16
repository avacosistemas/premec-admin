import { DynamicField } from '../dynamic-form/dynamic-field';
import { DynamicFieldBehavior } from '../dynamic-form/dynamic-field-behavior';

export class FormsCrudDef{
    filter?: DynamicField<any>[];
    filterBehavior?: DynamicFieldBehavior[];
    update?: DynamicField<any>[];
    updateBehavior?: DynamicFieldBehavior[];
    create?: DynamicField<any>[];
    createBehavior?: DynamicFieldBehavior[];
    read?: DynamicField<any>[];

    // deprecado
    validationAddURL?: string;
    validationEditURL?: string;
}
