
import { FormGroup } from '@angular/forms';
import { MatTab } from '@angular/material/tabs/typings/tab';
import { DynamicField } from '../../../../model/dynamic-form/dynamic-field';

export class ItemTab {
    tab: MatTab;
    name: string;
    entity: any;
    dtoName: string;
    formName: string;
    isEdit: boolean;
    fieldsName: string;
    fields: DynamicField<any>;
}
