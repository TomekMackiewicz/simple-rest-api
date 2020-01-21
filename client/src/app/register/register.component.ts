import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../common/services/authentication.service';
import { UiService } from '../common/services/ui.service';
import { handleError } from '../common/functions/error.functions';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush       
})

export class RegisterComponent {

    returnUrl: string;
    registrationForm = this.fb.group({
        email: ['', Validators.required],
        username: ['', Validators.required],
        first: ['', Validators.required],
        confirmPassword: ['', Validators.required],
    });

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private authenticationService: AuthenticationService,
        private uiService: UiService,
        private ref: ChangeDetectorRef) {}

    register() {
        this.authenticationService.register(this.registrationForm.value).subscribe(
            (success: string) => {
                this.uiService.openSnackBar(success, 'success-notification-overlay');
                this.router.navigate(['/login']);
            },
            error => {
                let errors = handleError(error, this.registrationForm);
                if (errors !== null && typeof errors.message !== 'undefined') {
                    this.uiService.openSnackBar(errors.message, 'error-notification-overlay');
                }
                this.ref.detectChanges();
            }
        );
    }

    cancel() {
        this.router.navigate(['/login']);
    }
}
