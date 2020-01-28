import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../common/services/authentication.service';
import { UiService } from '../../common/services/ui.service';
import { User } from '../model/user';
import { handleError } from '../../common/functions/error.functions';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {

    user: User;
    userProfileForm = this.fb.group({
        id: [''],
        username: ['', Validators.required],
        email: ['', Validators.required]
    });
    
    constructor(
        private router: Router,
        private fb: FormBuilder,
        private ref: ChangeDetectorRef,
        private authenticationService: AuthenticationService,
        private uiService: UiService
    ) {}

    ngOnInit(): void {
        this.authenticationService.getUser(parseInt(localStorage.getItem('userId'))).subscribe(
            (data: User) => {
                this.user = data;
                this.userProfileForm.patchValue({ 
                    id: this.user.id, 
                    username: ('username' in this.user) ? this.user.username : '',
                    email: ('email' in this.user) ? this.user.email : ''
                });
            },
            error => {
                this.uiService.openSnackBar(error.message, 'error-notification-overlay');
            }                
        );
    }

    updateUser() {
        return this.authenticationService.updateUser(this.userProfileForm.value).subscribe(
            success => {
                this.uiService.openSnackBar(success, 'success-notification-overlay');
            },
            error => {
                let errors = handleError(error, this.userProfileForm);
                if (errors !== null && typeof errors.message !== 'undefined') {
                    this.uiService.openSnackBar(errors.message, 'error-notification-overlay');
                }
                this.ref.detectChanges();
            }
        );
    }

    cancel() {
        this.router.navigate(['/admin/dashboard']);
    }
}
