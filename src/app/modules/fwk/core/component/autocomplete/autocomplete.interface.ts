import { Observable } from "rxjs";

export interface AutocompleteConfiguration {
    key: string;
    // Atributo usado por el placeholder del componente para mostrar el nombre de campo
    label: string;
    // Validación de campo requerido o no
    required?: boolean;
    // el atributo en true deshabilita la posibilidad de ingresar de interacción del usuario con el componente,
    // impidiendo cualquier ingreso por el input o el botón de paleta de colores
    disabled?: boolean;
    // Atributo de tipo string, recibe un string separado por comas que arma la lista de tags a visualizar por el campo
    value?: string;
    options?: AutocompleteOptions;
}

export interface AutocompleteOptions {
   // Mensaje de error que se muestra debajo del campo en rojo
   // en el caso de que el formulario presente un error en este campo por haberlo completado
   requiredMessage: string;
   // Mensaje de error en rojo que se muestra debajo del campo  cuando se ingresa un valor no contemplado
   invalidValueMessage?: string;
   // Mensaje de error en rojo que se muestra debajo del campo  cuando se ingresa un valor y no se selecciona un elemento de la lista
   selectElementOrCleanField?: string;
   // Elemento elemento del objeto seleccionado que se usa como label del campo a mostrar
   elementLabel: string;
   // Elemento elemento del objeto seleccionado que se usa como valor del campo
   elementValue: string;
   // Use Native filter
   useNativeFilter?: boolean;
   // Usado para pasar el id a otro campo
   transferIdToField: string;
   // Filtra el form que esta actualmente
   useFormSenderFilter?: boolean;
}

export interface AutocompleteChangeValue {
    // Valor cambio
    value: string;
}

export interface AutocompleteSearchTerm {
    search(term: string): Observable<any[]>;
}


export interface ApiAutocompleteConfiguration extends AutocompleteConfiguration {
    // Configuracion para llamado de la api de autocompletado
    apiOptions: ApiAutocompleteOptions;
}

export interface ApiAutocompleteOptions {
    // Mapeo de campos de formulario pasados por query string al request de la api
    queryString?: any;
    // Url de la api a llamar
    url?: string;
    // Data default si no hay config de api
    fromData?: any [];
    defaultShow?: number;
 }
 