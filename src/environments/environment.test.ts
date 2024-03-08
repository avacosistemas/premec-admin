export const PREFIX_DOMAIN_API =  'http://premec.ddns.net:48080/ws-rest-test/';


export const environment = {
    localAuth: true,
    production: true,
    hmr: false,

    /** AUTHENTICATION */
    AUTHENTICATION_URL:  PREFIX_DOMAIN_API + 'auth',
    AUTHENTICATION_REFRESH_TOKEN_URL:  PREFIX_DOMAIN_API + 'refresh',

    /* Config General URl*/
    URL_ROOT: '',
    URL_LOGIN: '/',
    // Business
    AUTOCOMPLETE_WAITING_TIME: 700
};