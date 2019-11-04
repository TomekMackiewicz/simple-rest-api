import { Component, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";
import { UserTraitService } from '../../user-trait/service/user-trait.service';
import { handleError } from '../../common/functions/error.functions';

@Component({
    selector: 'confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {

    title: string;
    description: string;
    ids: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) data: any,
        private dialogRef: MatDialogRef<ConfirmDialogComponent>, 
        private userTraitService: UserTraitService,
        private snackBar: MatSnackBar,
        private ref: ChangeDetectorRef 
    ) {
        this.title = data.title;
        this.description = data.description;
        this.ids = data.ids;
    }

    confirm() {
        this.userTraitService.deleteTraits(this.ids, '/education-status').subscribe(
            success => {
                this.dialogRef.close(true);
                this.openSnackBar(success, 'success-notification-overlay');
            },
            error => {
                let errors = handleError(error, null);
                if (errors !== null && typeof errors.message !== 'undefined') {
                    this.openSnackBar(errors.message, 'error-notification-overlay');
                }
                this.ref.detectChanges();
            }
        );
    }

    cancel() {
        this.dialogRef.close(false);
    }

    openSnackBar(message: string, state: string): void {
        this.snackBar.open(message, 'Close', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: [state]
        });
    } 
}
