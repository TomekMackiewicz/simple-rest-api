import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
    selector: 'confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {

    title: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) data: any,
        private dialogRef: MatDialogRef<ConfirmDialogComponent>
    ) {
        this.title = data.title;
    }

    confirm() {
        this.dialogRef.close(true);
    }

    cancel() {
        this.dialogRef.close(false);
    }
}
