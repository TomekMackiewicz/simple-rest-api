import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from '../../common/services/authentication.service';
import { User } from '../model/user';
import { UiService } from '../../common/services/ui.service';
import { handleError } from '../../common/functions/error.functions';

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
        private uiService: UiService
    ) {}

    login() {
        this.authenticationService.login(this.user.username, this.user.password);
        this.authenticationService.loginError.subscribe(
            (error: any) => {
                let errors = handleError(error);
                if (errors !== null && typeof errors.message !== 'undefined') {
                    this.uiService.openSnackBar(errors.message, 'error-notification-overlay');
                }
                this.ref.detectChanges();
            }
        );
    }

}
