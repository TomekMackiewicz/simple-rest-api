import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';
import { UiService } from '../../../common/services/ui.service';
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
        private uiService: UiService,
        private fb: FormBuilder,
        private ref: ChangeDetectorRef
    ) { }

    addCategory() {
        return this.categoryService.addCategory(this.categoryForm.value).subscribe(
            success => {
                this.uiService.openSnackBar(success, 'success-notification-overlay');
                this.router.navigate(['/admin/category']);
            },
            error => {
                let errors = handleError(error, this.categoryForm);
                if (errors !== null && typeof errors.message !== 'undefined') {
                    this.uiService.openSnackBar(errors.message, 'error-notification-overlay');
                }
                this.ref.detectChanges();
            }
        );
    }

    cancel() {
        this.router.navigate(['/admin/category']);
    }

}
