import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Injector } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { fuseAnimations } from '@fuse/animations';
import { environment } from 'environments/environment';
import { AbstractComponent } from 'app/modules/fwk/core/component/abstract-component.component';
import { AuthService } from 'app/modules/fwk/core/service/security/auth.service';
import { LocalStorageService } from 'app/modules/fwk/core/service/local-storage/local-storage.service';

export const BAD_CREDENTIAL = 'BAD_CREDENTIAL';
@Component({
    // tslint:disable-next-line:component-selector
    selector   : 'app-password-update',
    templateUrl: './password-update.component.html',
    styleUrls  : ['./password-update.component.scss'],
    animations : fuseAnimations
})
export class PasswordUpdateComponent extends AbstractComponent {

    resetPasswordForm: FormGroup;
    resetPasswordFormErrors: any;
    currentUser: String;
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        public route: ActivatedRoute,
        private localStorageService: LocalStorageService,
        injector: Injector
    ) {
        super(injector);
        this.setUpI18n({
            name: 'reset_password',
            lang: 'es',
            dictionary: {
                form_title: 'CAMBIAR CONTRASEÑA',
                form_password_confirm_required: 'El campo confirmar contraseña es requerido',
                form_current_password_required: 'El campo contraseña actual es requerido',
                form_new_password_required: 'El campo nueva contraseña es requerido',
                form_password_not_match: 'Las contraseñas ingresadas no coinciden',
                form_button_reset: 'CAMBIAR',
                form_button_return_home: 'Volver',
                form_current_password : 'Contraseña actual',
                form_new_password : 'Nueva contraseña',
                form_new_password_confirm : 'Confirmar contraseña',
                form_current_password_invalid : 'La contraseña ingresada es invalida'
            }
        });
        this.configService.setConfig({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });

        this.resetPasswordFormErrors = {
            currentPassword       : {},
            newPassword       : {},
            passwordConfirm: {}
        };
    }

    onInit() {
        let currentPassword = '';

        let cacheUserData = this.route.snapshot.queryParams['cliente'];
        if (cacheUserData === undefined) {
            cacheUserData = this.localStorageService.getUserDataForForceChangePassword();
        }

        if (cacheUserData) {
            currentPassword = cacheUserData.password;
            this.currentUser = cacheUserData.username;
        } 
        
        const clienteParam = this.route.snapshot.queryParams['cliente'];

        if (clienteParam){
            this.currentUser = clienteParam;
            currentPassword = '';
        }
        const currentPasswordField = {
            value: currentPassword,
            disabled: currentPassword !== ''
        };

        this.resetPasswordForm = this.formBuilder.group({
            currentPassword       : [currentPasswordField, Validators.required],
            newPassword       : ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPassword]]
        });

        this.resetPasswordForm.valueChanges.subscribe(() => {
            this.onResetPasswordFormValuesChanged();
        });

        if (this.currentUser === undefined){
            this.currentUser = this.authService.getUserLocalStorage().username;
        }


      
    }

    getI18nName(): string {
        return 'reset_password';
    }

    onResetPasswordFormValuesChanged() {
        for ( const field in this.resetPasswordFormErrors ) {
            if ( !this.resetPasswordFormErrors.hasOwnProperty(field) ) {
                continue;
            }

            // Clear previous errors
            this.resetPasswordFormErrors[field] = {};
            // Get the control
            const control = this.resetPasswordForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.resetPasswordFormErrors[field] = control.errors;
            }
        }
    }

    onSubmit() {

        const currentPassword = this.resetPasswordForm.controls.currentPassword.value;
        const resetPassword = this.resetPasswordForm.controls.newPassword.value;

        this.authService.updatePassword(this.currentUser, currentPassword, resetPassword
            ).subscribe(res => {
                this.notificationService.notifySuccess("Contraseña actualizada con éxito. Vuelva a iniciar sesión.");
                setTimeout(() => {
                    this.authService.logout();
                this.router.navigate([environment.URL_LOGIN]);
                }, 5000);
            }, error => {
                if (error.status === 409 && error.error.status === BAD_CREDENTIAL) {
                    this.resetPasswordForm.controls.currentPassword.setErrors({'userCurrentPasswordInvalid' : true});
                }
            });
    }

    getCurrentPasswordErrorMessage() {
        if (this.resetPasswordForm.controls.currentPassword.errors.userCurrentPasswordInvalid) {
            return this.translate('form_current_password_invalid');
        } else if (this.resetPasswordForm.controls.currentPassword.errors.required) {
            return this.translate('form_current_password_required');
        }
        return;
    }
}


function confirmPassword(control: AbstractControl) {
    if ( !control.parent || !control ) {
        return;
    }

    const password = control.parent.get('newPassword');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if ( !password || !passwordConfirm ) {
        return;
    }

    if ( passwordConfirm.value === '' ) {
        return;
    }

    if ( password.value !== passwordConfirm.value ) {
        return {
            passwordsNotMatch: true
        };
    }


}
