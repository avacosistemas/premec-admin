export interface ImportImageConfiguration {
    // Atributo usado por el placeholder del componente para mostrar el nombre de campo
    label: string;
    // Validación de campo requerido o no
    required?: boolean;
    // el atributo en true deshabilita la posibilidad de ingresar de interacción del usuario con el componente,
    // impidiendo cualquier ingreso por el input o el botón de paleta de colores
    disabled?: boolean;
    // Atributo de tipo string, representando un código hexa, con el que se puede inicializar el campo a nivel de código en la aplicacion
    value?: string;
    options?: ImportImageOptions;
    icon?: string;
    iconOpenUrl?: string;
    showPreview?: boolean;
}


export interface ImportImageOptions {
   // Mensaje de error que se muestra debajo del campo en rojo
   // en el caso de que el formulario presente un error en este campo por haberlo completado
   requiredMessage: string;
   // Mensaje de error que se muestra debajo del campo en rojo cuando se ingresa un valor hexadecimal no contemplado
   invalidValueMessage: string;
   // tipos de archivos permitidos
   resourceType?: string; // Types: Images
}
