import { NgModule } from '@angular/core';
import { SharedModule } from './main/shared/shared.module';
import { AppComponent } from './app.component';
import { IntegrationModule } from './main/content/integration/integration.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
       AppRoutingModule, 
       SharedModule
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
