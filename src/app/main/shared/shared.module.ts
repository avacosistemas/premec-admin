import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { fuseConfig } from '../../fuse-config';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseMainModule } from '../main.module';
import { FwkModule } from '../../modules/fwk/core/fwk.module';
import { DashboardModule } from '../content/dashboard/dashboard.module';
import { AppRoutingModule } from '../../app-routing.module';
import { environment } from 'environments/environment';
import { AppConfigService } from './config/app.config.service';
import { AppConfigAuthGuardService } from './config/app-config-auth-guard.service';
import { FuseContentComponent } from 'app/main/content/content.component';
import { ROUTES } from 'app/main/content/pages/integration.routes';
import { LoginComponent } from '../content/authentication/login/login.component';
import { IntegrationModule } from '../content/integration/integration.module';
import { IntegrationComponent } from '../content/integration/integration.component';




const routes = [
    {
        path     : "auth/login",
        component: LoginComponent
    },
    {
        path     : environment.URL_ROOT,
        component: FuseContentComponent,
        canActivate: [AppConfigAuthGuardService],
        children: ROUTES
    }
  ];

@NgModule({
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        RouterModule.forRoot(routes),
        TranslateModule.forRoot(),
        // Fuse Main and Shared modules
        FuseModule.forRoot(fuseConfig),
        FuseSharedModule,
        FuseMainModule,
        DashboardModule,
        IntegrationModule,
        FwkModule,
    ],
    exports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        // Fuse Main and Shared modules
        FuseSharedModule,
        FuseMainModule,
        DashboardModule,
        // AVACO
        FwkModule,
        AppRoutingModule
    ],
    providers: [
        AppConfigService,
        AppConfigAuthGuardService
    ]
})
export class SharedModule
{
    constructor(configAuthGuardService: AppConfigAuthGuardService,
                configService: AppConfigService){
        configAuthGuardService.addCallbackGuard({
            next: (url) => {
                configService.setConfigByURL(url);
            }
        });
    }
}
