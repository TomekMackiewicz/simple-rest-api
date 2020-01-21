import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';
import { UiService } from '../../../common/services/ui.service';
import { Category } from '../category';
import { handleError } from '../../../common/functions/error.functions';

@Component({
    selector: 'app-category-edit',
    templateUrl: './category-edit.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryEditComponent implements OnInit {
    
    category: Category;
    categoryForm = this.fb.group({
        id: [''],
        name: ['', Validators.required]
    });

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private categoryService: CategoryService,
        private uiService: UiService,
        private fb: FormBuilder,
        private ref: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            if (isNaN(params['id'])) {
                this.uiService.openSnackBar('error.type.nan', 'error-notification-overlay');
            } else if (params['id'] !== undefined) {
                const id = +params['id'];
                this.categoryService.getCategory(id).subscribe(
                    category => {
                        if (category && 'id' in category) {
                            this.category = category;
                            this.categoryForm.patchValue({ 
                                id: this.category.id, 
                                name: ('name' in this.category) ? this.category.name : ''
                            });
                        } else {
                            this.router.navigateByUrl('/404', { skipLocationChange: true });
                        }
                    },
                    error => {
                        this.uiService.openSnackBar('errors.not-found', 'error-notification-overlay');
                    }
                );
            } else {
                this.uiService.openSnackBar('error.undefined', 'error-notification-overlay');
            }
        });
    }

    updateCategory() {
        return this.categoryService.updateCategory(this.categoryForm.value).subscribe(
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
