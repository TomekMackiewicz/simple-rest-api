import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { CategoryService } from '../category/category.service';
import { UiService } from '../../common/services/ui.service';
import { Post } from '../post';
import { Category } from '../category/category';
import { handleError } from '../../common/functions/error.functions';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
    selector: 'app-post-edit',
    templateUrl: './post-edit.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostEditComponent implements OnInit {
    
    post: Post;
    categories: Category[] = [];
    editor = ClassicEditor;
    postForm = this.fb.group({
        id: [''],
        title: ['', Validators.required],
        slug: ['', Validators.required],
        body: [''],
        categories: [this.categories]
    });

    constructor(
        private router: Router,
        private route: ActivatedRoute,
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
                console.log(error); // TODO: handle error
            }
        );
        this.route.params.forEach((params: Params) => {
            if (isNaN(params['id'])) {
                this.uiService.openSnackBar('error.type.nan', 'error-notification-overlay');
            } else if (params['id'] !== undefined) {
                const id = +params['id'];
                this.postService.getPost(id).subscribe(
                    post => {
                        if (post) {
                            this.post = post;
                            this.postForm.patchValue({ 
                                id: this.post.id, 
                                title: this.post.title, 
                                slug: this.post.slug, 
                                body: this.post.body, 
                                categories: this.post.categories.map(({ id }) => id)
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

    updatePost() {
        return this.postService.updatePost(this.postForm.value).subscribe(
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
