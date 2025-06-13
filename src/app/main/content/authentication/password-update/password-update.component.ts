import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { environment } from 'environments/environment';
import { AbstractComponent } from 'app/modules/fwk/core/component/abstract-component.component';
import { AuthService } from 'app/modules/fwk/core/service/security/auth.service';
import { LocalStorageService } from 'app/modules/fwk/core/service/local-storage/local-storage.service';
import { User } from 'app/modules/fwk/core/model/user';
import { ForceChangePasswordUser } from 'app/modules/fwk/core/model/force-change-password-user.interface';

export const BAD_CREDENTIAL = 'BAD_CREDENTIAL';
@Component({
    selector: 'app-password-update',
    templateUrl: './password-update.component.html',
    styleUrls: ['./password-update.component.scss'],
    animations: fuseAnimations
})
export class PasswordUpdateComponent extends AbstractComponent implements OnInit {
    resetPasswordForm: FormGroup;
    resetPasswordFormErrors: any;
    currentUser: string;
    translations: { [key: string]: string };
    formSubmittedSuccessfully: boolean = false;
    countdown: number = 5;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        public route: ActivatedRoute,
        private localStorageService: LocalStorageService,
        injector: Injector
    ) {
        super(injector);
        this.translations = {
            form_title: 'CAMBIAR CONTRASEÑA',
            form_password_confirm_required: 'El campo confirmar contraseña es requerido',
            form_current_password_required: 'El campo contraseña actual es requerido',
            form_new_password_required: 'El campo nueva contraseña es requerido',
            form_password_not_match: 'Las contraseñas ingresadas no coinciden',
            form_button_reset: 'CAMBIAR',
            form_button_return_home: 'Volver',
            form_current_password: 'Contraseña actual',
            form_new_password: 'Nueva contraseña',
            form_new_password_confirm: 'Confirmar contraseña',
            form_current_password_invalid: 'La contraseña ingresada es invalida',
            success_message_title: '¡Contraseña Actualizada!',
            success_message_line1: 'Su contraseña ha sido actualizada con éxito.',
            success_message_line2: 'Será redirigido a la pantalla de inicio de sesión en:',
            seconds_text: 'segundos'
        };

        this.setUpI18n({
            name: 'reset_password',
            lang: 'es',
            dictionary: this.translations
        });

        this.configService.setConfig({
            layout: {
                navigation: 'none',
                toolbar: 'none',
                footer: 'none'
            }
        });

        this.resetPasswordFormErrors = {
            currentPassword: {},
            newPassword: {},
            passwordConfirm: {}
        };
    }

    ngOnInit() {
        super.ngOnInit();
        let currentPasswordValue: string = '';
        let usernameValue: string = '';

        const clienteParam = this.route.snapshot.queryParams['cliente'];
        if (clienteParam) {
            usernameValue = clienteParam;
            currentPasswordValue = '';
        } else {
            const cachedForceChangeUser: ForceChangePasswordUser = this.localStorageService.getUserDataForForceChangePassword();
            if (cachedForceChangeUser && cachedForceChangeUser.username) {
                usernameValue = cachedForceChangeUser.username;
                currentPasswordValue = cachedForceChangeUser.password || '';
            }
        }

        if (!usernameValue) {
            const loggedInUser: User = this.authService.getUserLocalStorage();
            if (loggedInUser && loggedInUser.username) {
                usernameValue = loggedInUser.username;
            } else {
                console.warn('No se pudo obtener el username de ninguna fuente válida.');
            }
        }

        this.currentUser = usernameValue;

        const currentPasswordField = {
            value: currentPasswordValue,
            disabled: currentPasswordValue !== ''
        };

        this.resetPasswordForm = this.formBuilder.group({
            currentPassword: [currentPasswordField, Validators.required],
            newPassword: ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPassword]]
        });

        this.resetPasswordForm.valueChanges.subscribe(() => {
            this.onResetPasswordFormValuesChanged();
        });
    }

    translate(key: string): string {
        return this.translations[key] || key;
    }

    getI18nName(): string {
        return 'reset_password';
    }

    onResetPasswordFormValuesChanged() {
        for (const field in this.resetPasswordFormErrors) {
            if (!this.resetPasswordFormErrors.hasOwnProperty(field)) {
                continue;
            }

            this.resetPasswordFormErrors[field] = {};
            const control = this.resetPasswordForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.resetPasswordFormErrors[field] = control.errors;
            }
        }
    }

    onSubmit() {
        const currentPassword = this.resetPasswordForm.controls.currentPassword.value;
        const resetPassword = this.resetPasswordForm.controls.newPassword.value;

        this.authService.updatePassword(this.currentUser, currentPassword, resetPassword)
            .subscribe(res => {
                this.notificationService.notifySuccess(this.translate('success_message_line1'));
                this.formSubmittedSuccessfully = true;

                const countdownInterval = setInterval(() => {
                    this.countdown--;
                    if (this.countdown <= 0) {
                        clearInterval(countdownInterval);
                        this.authService.logout();
                        this.router.navigate([environment.URL_LOGIN]);
                    }
                }, 1000);

            }, error => {
                if (error.status === 409 && error.error.status === BAD_CREDENTIAL) {
                    this.resetPasswordForm.controls.currentPassword.setErrors({ 'userCurrentPasswordInvalid': true });
                }
                this.notificationService.notifyError("Ocurrió un error al actualizar la contraseña.");
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
    if (!control.parent || !control) {
        return;
    }

    const password = control.parent.get('newPassword');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if (!password || !passwordConfirm) {
        return;
    }

    if (passwordConfirm.value === '') {
        return;
    }

    if (password.value !== passwordConfirm.value) {
        return {
            passwordsNotMatch: true
        };
    }
}