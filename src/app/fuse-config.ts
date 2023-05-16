/**
 * Default Fuse Configuration
 *
 * You can edit these options to change the default options. All these options also can be changed per component
 * basis. See `app/main/content/pages/authentication/login/login.component.ts` constructor method to learn more
 * about changing these options per component basis.
 */
export const fuseConfig = {
    layout          : {
        navigation      : 'left', // 'right', 'left', 'top', 'none'
        navigationFolded: false, // true, false
        toolbar         : 'below', // 'above', 'below', 'none'
        footer          : 'none', // 'above', 'below', 'none'
        mode            : 'fullwidth', // 'boxed', 'fullwidth'
        theme_options : true
    },
    colorClasses    : {
        toolbar: 'mat-light-green-700-bg',
        navbar : 'mat-fuse-dark-700-bg',
        footer : 'mat-fuse-dark-900-bg',
        title: 'white-500-fg',
        primary_button: 'mat-green-300-bg',
        primary_button_fg: 'white-500-fg',
        secondary_button: 'mat-blue-500-bg',
        secondary_button_fg: 'white-500-fg'
    },
    customScrollbars: true,
    routerAnimation : 'fadeIn' // fadeIn, slideUp, slideDown, slideRight, slideLeft, none
};

// http://fuse-angular-material.withinpixels.com/ui/colors
