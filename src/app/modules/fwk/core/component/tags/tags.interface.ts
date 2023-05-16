export interface TagsConfiguration {
    // Atributo usado por el placeholder del componente para mostrar el nombre de campo
    label: string;
    // Validación de campo requerido o no
    required?: boolean;
    // el atributo en true deshabilita la posibilidad de ingresar de interacción del usuario con el componente,
    // impidiendo cualquier ingreso por el input o el botón de paleta de colores
    disabled?: boolean;
    // Atributo de tipo string, recibe un string separado por comas que arma la lista de tags a visualizar por el campo
    value?: string;
    options?: TagsInvalidOptions;
}

export interface TagsInvalidOptions {
   // Mensaje de error que se muestra debajo del campo en rojo
   // en el caso de que el formulario presente un error en este campo por haberlo completado
   requiredMessage: string;
   // Mensaje de error que se muestra debajo del campo en rojo cuando se ingresa un valor no contemplado
   invalidValueMessage: string;
   // Ancho del componente
   width?: string;
}
