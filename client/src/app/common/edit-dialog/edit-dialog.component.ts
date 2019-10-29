import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { UserTrait } from '../../user-trait/model/user-trait';
import { UserTraitService } from '../../user-trait/service/user-trait.service';
import { ErrorService } from '../../common/services/error.service';

@Component({
    selector: 'edit-dialog',
    templateUrl: './edit-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditDialogComponent implements OnInit {
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
        private errorService: ErrorService,
        private ref: ChangeDetectorRef
    ) {
        this.id = data.id;
        this.path = data.path;
    }

    ngOnInit(): void {
        this.userTraitService.getUserTrait(this.id, this.path).subscribe(
            userTrait => {
                this.userTrait = userTrait;
                this.traitForm.setValue(this.userTrait);
            },
            errors => {
                this.errorService.handleError(errors, this.traitForm);
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
            },
            errors => {
                this.errorService.handleError(errors, this.traitForm);
                this.ref.detectChanges();
            }
        );
    }
     
}
