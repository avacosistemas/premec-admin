import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { environment } from 'environments/environment';
import { AbstractFormComponent } from 'app/modules/fwk/core/component/abstract-form.component';
import { LocalStorageService } from 'app/modules/fwk/core/service/local-storage/local-storage.service';
import { AuthService } from 'app/modules/fwk/core/service/security/auth.service';
import { DynamicField } from 'app/modules/fwk/core/model/dynamic-form/dynamic-field';


export const LOGIN_NAME = 'login';
export const CHANGE_PASSWORD_REQUIRED = 'CHANGE_PASSWORD_REQUIRED';

@Component({
    // tslint:disable-next-line:component-selector
    selector   : 'app-login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.scss'],
    animations : fuseAnimations
})
export class LoginComponent extends AbstractFormComponent implements OnInit {

    loginForm: FormGroup;
    loginFormErrors: any;
    fields: any = [{
                key: 'username',
                label: 'Usuario',
                required: 'true',
                controlType: 'textbox'
            },
            {
                key: 'password',
                label: 'Contraseña',
                required: 'true',
                order: '2',
                controlType: 'password'
            }];
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private localStorageService: LocalStorageService,
        injector: Injector
    ) {
        super(injector);

        this.loginFormErrors = {
            username   : {},
            password: {}
        };

    }

    customFuseConfig() {

        return {
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none',
                theme_options: false
            }
        };
    }
    getMessageErrorValidation(key, label) {
        const field = new DynamicField<any>();
        field.key = key;
        field.label = label;
        return this.formService.getMessageErrorValidation(this.loginForm, field);
    }
    onInit() {
        
        this.loginForm = this.formService.toFormGroup(this.fields, {}, undefined);

        const formUserData = this.localStorageService.getLoginFormUserData();
        if (formUserData) {
            this.formService.patchFields(this.loginForm, formUserData);
        }
        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });

    }

    onLoginFormValuesChanged() {
        for ( const field in this.loginFormErrors ) {
            if ( !this.loginFormErrors.hasOwnProperty(field) ) {
                continue;
            }

            // Clear previous errors
            this.loginFormErrors[field] = {};

            // Get the control
            const control = this.loginForm.get(field);

            if ( control && control.dirty && !control.valid ) {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }

    onSubmit() {

        const user = { username: this.loginForm.controls.username.value,
                       password: this.loginForm.controls.password.value};
        const control = this.requestQeue.addRequest();
        this.authService.login(user.username, user.password)
            .subscribe(rest => {                   
                    control.received();
                    this.router.navigate(['/']);
                },
                error => {
                    if (error.status === 401) {
                        this.loginFormErrors.userorpassinvalid = true;
                        console.log(this.loginFormErrors);
                    }
                    control.received();
                },
                () => {
                    this.router.navigate(['/']);
                }
            );
        }

        getI18nName(): string {
            return 'login';
        }
}
