
import { Entity } from '../entity';
export const EMAIL = 'email';
export const TEXTBOX = 'textbox';
export const PASSWORD: any = 'password';
export const HIDDEN: any = 'hidden';
export const NUMBER = 'number';
export const AUTOCOMPLETE: any = 'autocomplete';
export const AUTOCOMPLETE_DESPLEGABLE: any = 'autocomplete-desplegable';
export const SELECT: any = 'select';
export const DATEPICKER: any = 'datepicker';
export const DATETIMEPICKER: any = 'datetimepicker';
export const CHECKBOX: any = 'checkbox';
export const TEXTAREA: any = 'textarea';
export const PICKLIST: any = 'pick-list';
export const FILE: any = 'file';
export const RADIO_BUTTON = 'radio-button';
export const HTML_EDITOR = 'html_editor';
export const HTML = 'HTML';
export const DISCLAIMER = 'DISCLAIMER';
export const FLOAT = 'FLOAT';
export const COLOR_PICKER = 'COLOR_PICKER';
export const TAGS = 'TAGS';
export const IMPORT_IMAGE = 'IMPORT_IMAGE';
export const IMAGE_PREVIEW = 'IMAGE_PREVIEW';
export const IMAGE_PREVIEW_SRC = 'IMAGE_PREVIEW_SRC';
export const CONTROL_TYPE = {
  email: EMAIL,
  textbox : TEXTBOX,
  password: PASSWORD,
  hidden : HIDDEN,
  number : NUMBER,
  float : FLOAT,
  autocomplete  : AUTOCOMPLETE,
  autocomplete_desplegable: AUTOCOMPLETE_DESPLEGABLE,
  select : SELECT,
  datepicker : DATEPICKER,
  datetimepicker : DATETIMEPICKER,
  checkbox : CHECKBOX,
  textarea : TEXTAREA,
  picklist : PICKLIST,
  file: FILE,
  radio_button: RADIO_BUTTON,
  html: HTML,
  html_editor: HTML_EDITOR,
  disclaimer: DISCLAIMER,
  color_picker: COLOR_PICKER,
  tags: TAGS,
  import_image: IMPORT_IMAGE,
  image_preview: IMAGE_PREVIEW,
  image_preview_src: IMAGE_PREVIEW_SRC
};

export enum ControlTypeEnum {
  email = 'EMAIL',
  textbox = 'TEXTBOX',
  password = 'PASSWORD',
  hidden = 'HIDDEN',
  number = 'NUMBER',
  float = 'FLOAT',
  autocomplete  = 'AUTOCOMPLETE',
  autocomplete_desplegable  = 'AUTOCOMPLETE-DESPLEGABLE',
  select = 'SELECT',
  datepicker = 'DATEPICKER',
  datetimepicker = 'DATETIMEPICKER',
  checkbox = 'CHECKBOX',
  textarea = 'TEXTAREA',
  picklist = 'PICKLIST',
  file =  'FILE',
  radio_button = 'RADIO-BUTTON',
  html = 'HTML',
  html_ditor = 'HTML_EDITOR',
  color_picker = 'color_picker',
  tags = 'tags',
  import_image = 'import_image',
  image_preview = 'image_preview',
  image_preview_src = 'image_preview_src'
}

export class DynamicField<T>{
  // Atributos obligatorios
  key: string;
  // Esto en los formularios normales es obligatorio
  labelKey?: string;
  /*
     se utiliza para indicar al formulario cual es el campo id, 
     si no se especifica, se toma el campo con nombre de atributo id
   */
  id?: boolean;
   
  controlType: string;
  mappingQuerystring?: boolean;
  // Atributos opcionales
  value?: T;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  options?: any;
  apiOptions?: any;
  maxLength?: any;
  minLength?: any;
  minValue?: any;
  maxValue?: any;
  length?: any;
  validation?: any;
  validations?: any;
  filterType?: any;
  requiredMessage?: string;
  maxLengthMessage?: string;
  minValueMessage?: string;
  maxValueMessage?: string;
  lengthMessage?: string;
  cssClass?: string;
  // Deprecated
  order?: number;
  conditions?: any;

  constructor(options: {
      value?: T,
      key?: string,
      label?: string,
      required?: boolean,
      order?: number,
      controlType?: string,
      cssClass?: string
    } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.cssClass = options.cssClass || '';
  }

}
