import { Component } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';

@Component({
    // tslint:disable-next-line:component-selector
    selector   : 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls  : ['./dashboard.component.scss']
})
export class DashboardComponent
{
    constructor(private fuseTranslationLoader: FuseTranslationLoaderService)
    {
        
    }
}
