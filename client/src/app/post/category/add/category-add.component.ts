import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from "@angular/material";
import { CategoryService } from '../category.service';
import { handleError } from '../../../common/functions/error.functions';

@Component({
    selector: 'app-category-add',
    templateUrl: './category-add.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryAddComponent {

    categoryForm = this.fb.group({
        name: ['', Validators.required]
    });

    constructor(
        private router: Router,
        private categoryService: CategoryService,
        private fb: FormBuilder,
        private snackBar: MatSnackBar,
        private ref: ChangeDetectorRef
    ) { }

    addCategory() {
        return this.categoryService.addCategory(this.categoryForm.value).subscribe(
            success => {
                this.openSnackBar(success, 'success-notification-overlay');
                this.router.navigate(['/admin/category']);
            },
            error => {
                let errors = handleError(error, this.categoryForm);
                if (errors !== null && typeof errors.message !== 'undefined') {
                    this.openSnackBar(errors.message, 'error-notification-overlay');
                }
                this.ref.detectChanges();
            }
        );
    }

    cancel() {
        this.router.navigate(['/admin/category']);
    }

    openSnackBar(message: string, state: string): void {
        this.snackBar.open(message, 'Close', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: [state]
        });
    } 
}
