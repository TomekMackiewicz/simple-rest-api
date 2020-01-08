import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { CategoryService } from '../category/category.service';
import { UiService } from '../../common/services/ui.service';
import { handleError } from '../../common/functions/error.functions';
import { Category } from '../category/category';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
    selector: 'app-post-add',
    templateUrl: './post-add.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostAddComponent implements OnInit {

    categories: Category[] = [];
    public Editor = ClassicEditor;
    postForm = this.fb.group({
        title: ['', Validators.required],
        slug: ['', Validators.required],
        body: [''],
        categories: [this.categories]
    });

    constructor(
        private router: Router,
        private postService: PostService,
        private categoryService: CategoryService,
        private uiService: UiService,
        private fb: FormBuilder,
        private ref: ChangeDetectorRef
    ) { }
    
    ngOnInit(): void {
        this.categoryService.getCategories().subscribe(
            data => {
                this.categories = data.categories;
            },
            error => {
                console.log(error);
            }
        );
    }

    addPost() {
        return this.postService.addPost(this.postForm.value).subscribe(
            success => {
                this.uiService.openSnackBar(success, 'success-notification-overlay');
                this.router.navigate(['/admin/post']);
            },
            error => {
                let errors = handleError(error, this.postForm);
                if (errors !== null && typeof errors.message !== 'undefined') {
                    this.uiService.openSnackBar(errors.message, 'error-notification-overlay');
                }
                this.ref.detectChanges();
            }
        );
    }

    cancel() {
        this.router.navigate(['/admin/post']);
    }

}
