import { ComponentDef } from './component-def';
export class ContextMenu {
  key?: string;
  url?: string;
  labelKey?: string;
  label?: string;
  permission?: string;

}
export class ToolbarComponentDef extends ComponentDef {
    
  contextMenu: ContextMenu[];

}
