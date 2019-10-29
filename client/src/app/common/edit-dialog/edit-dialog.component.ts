import { Component, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";
import { UserTrait } from '../../user-trait/model/user-trait';
import { UserTraitService } from '../../user-trait/service/user-trait.service';
import { handleError } from '../../common/functions/error.functions';

@Component({
    selector: 'edit-dialog',
    templateUrl: './edit-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditDialogComponent {
    id: number;
    path: string;
    userTrait: UserTrait;
    traitForm = this.fb.group({
        id: [''],
        label: ['', Validators.required]
    });

    constructor(
        public dialogRef: MatDialogRef<EditDialogComponent>, 
        @Inject(MAT_DIALOG_DATA) data: any,
        private fb: FormBuilder,
        private userTraitService: UserTraitService,
        private snackBar: MatSnackBar,
        private ref: ChangeDetectorRef
    ) {
        this.id = data.id;
        this.path = data.path
        this.userTraitService.getUserTrait(this.id, this.path).subscribe(
            userTrait => {
                this.userTrait = userTrait;
                this.traitForm.setValue(this.userTrait);
            },
            error => {
                let errors = handleError(error, this.traitForm);
                if (typeof errors.message !== 'undefined') {
                    this.openSnackBar(errors.message, 'error-notification-overlay');
                }
                this.ref.detectChanges();
            }
        );
    }

    cancel() {
        this.dialogRef.close(false);
    }

    updateTrait() {
        return this.userTraitService.updateTrait(this.traitForm.value, this.path).subscribe(
            success => {
                this.dialogRef.close(true);
                this.openSnackBar(success, 'success-notification-overlay');
            },
            error => {
                let errors = handleError(error, this.traitForm);
                if (errors !== null && typeof errors.message !== 'undefined') {
                    this.openSnackBar(errors.message, 'error-notification-overlay');
                }
                this.ref.detectChanges();
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
