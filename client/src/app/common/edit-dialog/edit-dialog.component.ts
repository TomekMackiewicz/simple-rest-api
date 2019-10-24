import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { UserTrait } from '../../user-trait/model/user-trait';
import { UserTraitService } from '../../user-trait/service/user-trait.service';

@Component({
    selector: 'edit-dialog',
    templateUrl: './edit-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditDialogComponent implements OnInit {
    id: number;
    title: string;
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
        private userTraitService: UserTraitService
    ) {
        this.id = data.id;
        this.title = data.title;
        this.path = data.path;
    }

    ngOnInit(): void {
        this.userTraitService.getUserTrait(this.id, this.path).subscribe(
            userTrait => {
                this.userTrait = userTrait;
                this.traitForm.setValue(this.userTrait);
            },
            error => {
                console.log(error);
            }
        );
    }

    cancel() {
        this.dialogRef.close(false);
    }

    updateTrait() {
        return this.userTraitService.updateTrait(this.traitForm.value, this.path).subscribe(
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
