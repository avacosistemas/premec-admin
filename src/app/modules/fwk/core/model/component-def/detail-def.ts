import { Entity } from '../entity';
import { WsDef } from '../ws-def';
import { ComponentDef } from './component-def';
import { GridDef } from './grid-def';
import { FormDef } from '../form-def';

export class DetailDef extends ComponentDef {
    formDef: FormDef;
}
