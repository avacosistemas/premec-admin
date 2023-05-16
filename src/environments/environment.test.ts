export const PREFIX_DOMAIN_API =  'https://cpauorgapi-test.azurewebsites.net/api/';
export const PREFIX_INSTITUCIONAL = 'https://test.cpau.org';

export const environment = {
    localAuth: true,
    
    production: true,
    hmr: false,

    /** AUTHENTICATION */
    AUTHENTICATION_URL:  PREFIX_DOMAIN_API + 'User/login',
    AUTHENTICATION_REFRESH_TOKEN_URL:  PREFIX_DOMAIN_API + 'Auth/refresh',

    /* Config General URl*/
    URL_ROOT: '',
    URL_LOGIN: PREFIX_INSTITUCIONAL,
    // Business

    URL_SECCIONES: 'seccion',
    URL_CONTENIDOS: 'contenido',
    URL_IMAGEN: 'imagen',
    URL_BOLETIN: 'boletin',
    URL_INDICE: 'indice',
    URL_MAILING: 'mailing',
    URL_FORMULARIO: 'formulario',
    URL_ABM_MODAL: 'modalHome',
    URL_PUBLICIDAD: 'bannerCampaing',
    URL_PRODUCTO_EXTERNO : 'productoExterno',
    URL_NOTICIA_CARROUSEL : 'noticiaCarrousel',
    URL_LOGOUT_API: PREFIX_DOMAIN_API + 'user/logout',
    URL_PERFIL_IDENTIFICACION: 'perfilIdentificacion',
    URL_IDENTIFICACION_BUSQUEDA: 'identificacionBusqueda',
    URL_DOMICILIOS: 'domicilio',
    URL_MESSAGE_TEMPLATE: 'messageTemplate',
	URL_IMAGEN_SUBIR: 'perfilMatriculadoUpload',
	URL_EMAIL_ACCOUNT: 'emailAccount',
    URL_ABM_ROLES: 'abmrole',
    AUTOCOMPLETE_WAITING_TIME: 700
};