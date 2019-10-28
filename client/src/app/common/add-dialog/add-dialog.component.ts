import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";
import { UserTrait } from '../../user-trait/model/user-trait';
import { UserTraitService } from '../../user-trait/service/user-trait.service';

@Component({
    selector: 'add-dialog',
    templateUrl: './add-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddDialogComponent {
    path: string;
    userTrait: UserTrait;
    traitForm = this.fb.group({
        label: ['', Validators.required]
    });

    constructor(
        public dialogRef: MatDialogRef<AddDialogComponent>, 
        @Inject(MAT_DIALOG_DATA) data: any,
        private fb: FormBuilder,
        private userTraitService: UserTraitService,
        private snackBar: MatSnackBar
    ) {
        this.path = data.path;
    }

    cancel() {
        this.dialogRef.close(false);
    }

    addTrait() {
        return this.userTraitService.addUserTrait(this.traitForm.value, this.path).subscribe(
            success => {
                this.dialogRef.close(true);
                this.openSnackBar(success, 'success-notification-overlay');
            },
            error => {
                this.openSnackBar(error, 'error-notification-overlay');
            }
        );
    }

    openSnackBar(message: string, state: string) {
        this.snackBar.open(message, 'Close', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: [state]
        });
    }     
}
