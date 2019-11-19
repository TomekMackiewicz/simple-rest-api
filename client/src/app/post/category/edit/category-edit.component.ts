import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from "@angular/material";
import { CategoryService } from '../category.service';
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
        name: ['', Validators.required],
        posts: ['']
    });

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private categoryService: CategoryService,
        private fb: FormBuilder,
        private snackBar: MatSnackBar,
        private ref: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            if (isNaN(params['id'])) {
                this.openSnackBar('error.type.nan', 'error-notification-overlay');
            } else if (params['id'] !== undefined) {
                const id = +params['id'];
                this.categoryService.getCategory(id).subscribe(
                    category => {
                        if (category) {
                            this.category = category;
                            this.categoryForm.setValue(this.category);
                        } else {
                            this.router.navigateByUrl('/404', { skipLocationChange: true });
                        }
                    },
                    error => {
                        this.openSnackBar('errors.not-found', 'error-notification-overlay');
                    }
                );
            } else {
                this.openSnackBar('error.undefined', 'error-notification-overlay');
            }
        });
    }

    updateCategory() {
        return this.categoryService.updateCategory(this.categoryForm.value).subscribe(
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

    openSnackBar(message: string, state: string): void {
        this.snackBar.open(message, 'Close', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: [state]
        });
    } 
}
