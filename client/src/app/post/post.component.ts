import { Component, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder } from '@angular/forms';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators'
import { MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { Post } from './post';
import { PostService } from './post.service';
import { AddDialogComponent } from '../common/add-dialog/add-dialog.component';
import { EditDialogComponent } from '../common/edit-dialog/edit-dialog.component';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements AfterViewInit {
    displayedColumns: string[] = ['select', 'title', 'body'];
    expandedElement: Post | null;
    data: Post[] = [];
    selection = new SelectionModel<Post>(true, []);
    resultsLength = 0;
    isRateLimitReached = false;
    filterForm = this.fb.group({
        title: ['']
    });
    filterPanelOpenState = true;

    formTemplate = [
      {
        "type": "input",
        "name": "title",
        "label": "title",
        "errors": [
            'required'
        ]
      },
      {
        "type": "textarea",
        "name": "body",
        "label": "body",
        "errors": [
            'required'
        ]
      }
    ];

    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;

    constructor(
        public dialog: MatDialog,
        private postService: PostService,
        private fb: FormBuilder,
        private ref: ChangeDetectorRef
    ) {}

    ngAfterViewInit() {
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        this.getPosts();
        this.ref.detectChanges();
    }

    getPosts() {
        merge(this.sort.sortChange, this.paginator.page).pipe(
            startWith({}),
            switchMap(() => {
                return this.postService.getPosts(
                    this.sort.active, 
                    this.sort.direction, 
                    this.paginator.pageIndex+1, 
                    this.paginator.pageSize,
                    this.filterForm.value,
                    '/post'
                );
            }),
            map(data => {
                this.isRateLimitReached = false;
                this.resultsLength = data.count;
                return data.posts;
            }),
            catchError(() => {
                this.isRateLimitReached = true;
                return observableOf([]);
            })
        ).subscribe(data => {
            this.data = data;
            this.ref.detectChanges();
        });
    }

    // TODO: DRY!
    isLargeScreen() {
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        return width > 720 ? true : false;
    }

    openEditDialog(id: number): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = this.isLargeScreen() ? '33%' : '100%';
        dialogConfig.minWidth = this.isLargeScreen() ? '33%' : '100%';
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            id: id,
            path: '/post'
        };        
        const dialogRef = this.dialog.open(EditDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            data => {
                if (data === true) {
                    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
                    this.getPosts();
                    this.ref.detectChanges();
                }
            }
        );
    }

    openAddDialog(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = this.isLargeScreen() ? '66%' : '100%';
        dialogConfig.minWidth = this.isLargeScreen() ? '66%' : '100%';
        dialogConfig.height = '80%';
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            path: '/post',
            formTemplate: this.formTemplate
        };        
        const dialogRef = this.dialog.open(AddDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            data => {
                if (data === true) {
                    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
                    this.getPosts();
                    this.ref.detectChanges();
                }
            }
        );
    }

    openConfirmDeleteDialog(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = this.isLargeScreen() ? '33%' : '100%';
        dialogConfig.minWidth = this.isLargeScreen() ? '33%' : '100%';
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            title: 'delete.confirm.title',
            description: 'delete.confirm.description',
            path: '/post',
            ids: this.selection.selected.map(({ id }) => id)
        };        
        const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            data => {
                if (data === true) {
                    this.getPosts();
                    this.ref.detectChanges();
                }
            }
        );
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.data.length;
        return numSelected === numRows;
    }

    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.data.forEach(row => this.selection.select(row));
    }

    applyFilter() {
        //this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0); // TODO
        this.getPosts();
        this.ref.detectChanges();
    }

    resetFilter() {
        this.filterForm.reset();
        //this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0); // TODO
        this.getPosts();
        this.ref.detectChanges();
    }
}
