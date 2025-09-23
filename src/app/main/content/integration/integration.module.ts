import { NgModule } from '@angular/core';
import { IntegrationComponent } from './integration.component';
import { COMPONENTS } from '../../../main/content/pages/integration.components';
import { FuseSharedModule } from '@fuse/shared.module';
import { navigation } from '../../../navigation/navigation';
import { FwkModule } from 'app/modules/fwk/core/fwk.module';
import { NavigationService } from 'app/modules/fwk/core/service/navigation/navigation.service';
import { I18nService } from 'app/modules/fwk/core/service/i18n-service/i18n.service';
import { ComponentDefService } from 'app/modules/fwk/core/service/component-def-service/component-def.service';
import { SharedModule } from 'app/main/shared/shared.module';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

const integration = [IntegrationComponent];
@NgModule({
  imports: [
    FuseSharedModule,
    FwkModule
  ],
  entryComponents: integration,
  declarations: integration,
  exports: integration,
  providers: [],
})
export class IntegrationModule {
  constructor(
    private navigationService: NavigationService,
    private componentDefService: ComponentDefService,
    private fuseTranslationLoader: FuseTranslationLoaderService
  ) {
    this.componentDefService.setComponentUser(COMPONENTS);
    const components = this.componentDefService.getComponents();

    components.forEach(component => {
      if (component.i18n && component.i18n.words) {
        const localeObject = {
          lang: component.i18n.lang || 'es',
          data: component.i18n.words
        };
        this.fuseTranslationLoader.loadTranslations(localeObject);
      }
    });

    navigationService.setNavigation(navigation);
    navigationService.setUpByMappingComponent(components);
  }
}