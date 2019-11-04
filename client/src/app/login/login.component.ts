import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from '../common/services/authentication.service';
import { User } from '../user/model/user';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush       
})
export class LoginComponent {
    user: User = new User();
    
    constructor(
        private authenticationService: AuthenticationService,
        private ref: ChangeDetectorRef
    ) {}

    login() {
        this.authenticationService.login(this.user.username, this.user.password);
        this.authenticationService.loginError.subscribe(
            (error) => {
                //this.ref.detectChanges();
            }
        );
    }

}
