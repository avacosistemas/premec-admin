import { NgModule } from '@angular/core';
import { SharedModule } from './main/shared/shared.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PasswordUpdateModule } from './main/content/authentication/password-update/password-update.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        SharedModule,
        PasswordUpdateModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
