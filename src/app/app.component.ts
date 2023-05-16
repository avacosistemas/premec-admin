import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as navigationSpanish } from './navigation/i18n/es';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
@Component({
    selector   : 'fuse-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    constructor(
        private translate: TranslateService,
        private fuseSplashScreen: FuseSplashScreenService,
        private fuseTranslationLoader: FuseTranslationLoaderService
    )
    {
        // Add languages
        this.translate.addLangs(['es']);

        // Set the default language
        this.translate.setDefaultLang('es');

        // Set the navigation translations
        this.fuseTranslationLoader.loadTranslations(navigationSpanish);

        // Use a language
        this.translate.use('es');
    }
}

