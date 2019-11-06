import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";
import { UserTrait } from '../../user-trait/model/user-trait';
import { UserTraitService } from '../../user-trait/service/user-trait.service';
import { handleError } from '../../common/functions/error.functions';

@Component({
    selector: 'add-dialog',
    templateUrl: './add-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddDialogComponent implements OnInit {
    path: string;
    userTrait: UserTrait;
    traitForm: any;
    formTemplate: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) data: any,
        public dialogRef: MatDialogRef<AddDialogComponent>, 
        private fb: FormBuilder,
        private userTraitService: UserTraitService,
        private snackBar: MatSnackBar,
        private ref: ChangeDetectorRef
    ) {
        this.path = data.path;
        this.formTemplate = data.formTemplate;
    }

    ngOnInit() {
        let group = {}; 
        this.formTemplate.forEach(input_template => {
            group[input_template.label] = new FormControl('');  
        });
        this.traitForm = this.fb.group(group);
    }

    cancel(): void {
        this.dialogRef.close(false);
    }

    addTrait() {
        return this.userTraitService.addUserTrait(this.traitForm.value, this.path).subscribe(
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

    openSnackBar(message: string, state: string): void {
        this.snackBar.open(message, 'Close', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: [state]
        });
    }     
}
