import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from '../common/services/authentication.service';
import { User } from '../user/model/user';
import { AlertService } from '../common/services/alert.service';
import { handleError } from '../common/functions/error.functions';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
    user: User = new User();
    
    constructor(
        private authenticationService: AuthenticationService,
        private ref: ChangeDetectorRef,
        private alertService: AlertService
    ) {}

    login() {
        this.authenticationService.login(this.user.username, this.user.password);
        this.authenticationService.loginError.subscribe(
            (error: any) => {
                let errors = handleError(error);
                if (errors !== null && typeof errors.message !== 'undefined') {
                    this.alertService.openSnackBar(errors.message, 'error-notification-overlay');
                }
                this.ref.detectChanges();
            }
        );
    }

}
