import { Component, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { UserTrait } from '../../user-trait/model/user-trait';
import { UserTraitService } from '../../user-trait/service/user-trait.service';
import { ErrorService } from '../../common/services/error.service';

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
        private errorService: ErrorService,
        private ref: ChangeDetectorRef
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
            },
            errors => {
                this.errorService.handleError(errors, this.traitForm);
                this.ref.detectChanges();
            }
        );
    }
     
}
