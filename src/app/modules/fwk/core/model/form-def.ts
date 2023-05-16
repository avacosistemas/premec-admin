import { DynamicField } from './dynamic-form/dynamic-field';
import { DynamicFieldBehavior } from './dynamic-form/dynamic-field-behavior';
import { WsDef } from './ws-def';
import { ActionDef } from './component-def/action-def';
import { DisplayActionsCondition } from './display-actions-condition';

export class FormDef{
    key?: string;
    fields: DynamicField<any>[];
    subForms?: FormDef[];
    titleKey?: string;
    title?: string;
    fieldsBehavior?: DynamicFieldBehavior[];
    submitWs?: WsDef;
    initWs?: WsDef;
    actions?: ActionDef[];
    displayActionsCondition?: DisplayActionsCondition[];
    showSubmitContinue?: boolean = false;
    showSubmitButton?: boolean = true;
}
