import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
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
        private userTraitService: UserTraitService
    ) {
        this.path = data.path;
    }

    cancel() {
        this.dialogRef.close(false);
    }

    addTrait() {
        return this.userTraitService.addUserTrait(this.traitForm.value, this.path).subscribe(
            success => {
                console.log(success);
                this.dialogRef.close(true);
                //this.alertService.success(success, true);
            },
            error => {
                console.log(error);
                //this.alertService.error(error, true);
            }
        );
    }
     
}
