import { Component, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder } from '@angular/forms';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators'
import { MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { UiService } from '../../../common/services/ui.service';
import { ConfirmDialogComponent } from '../../../common/confirm-dialog/confirm-dialog.component';
import { handleError } from '../../../common/functions/error.functions';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListComponent implements AfterViewInit {
    displayedColumns: string[] = ['select', 'name', 'dateCreated', 'dateEdited', 'actions'];
    expandedElement: Category | null;
    data: Category[] = [];
    selection = new SelectionModel<Category>(true, []);
    resultsLength = 0;
    isRateLimitReached = false;
    filterForm = this.fb.group({
        name: ['']
    });
    filterPanelOpenState = true;

    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private categoryService: CategoryService,
        private uiService: UiService,
        private fb: FormBuilder,
        private ref: ChangeDetectorRef
    ) {}

    ngAfterViewInit() {
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        this.getCategories();
        this.ref.detectChanges();
    }

    getCategories() {
        merge(this.sort.sortChange, this.paginator.page).pipe(
            startWith({}),
            switchMap(() => {
                return this.categoryService.getCategories(
                    this.sort.active, 
                    this.sort.direction, 
                    this.paginator.pageIndex+1, 
                    this.paginator.pageSize,
                    this.filterForm.value
                );
            }),
            map(data => {
                this.isRateLimitReached = false;
                this.resultsLength = data.count;
                return data.categories;
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
    
    add() {
        this.router.navigate(['/admin/category/add']);
    }
    
    edit(id: number) {
        this.router.navigate(['/admin/category/edit/'+id]);
    }
    
    delete(id?: number) {
        let ids: number[] = id ? [id] : this.selection.selected.map(({ id }) => id);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = this.uiService.isLargeScreen() ? '33%' : '100%';
        dialogConfig.minWidth = this.uiService.isLargeScreen() ? '33%' : '100%';
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            title: 'delete.confirm.title'
        };        
        const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            data => {
                if (data === true) {
                    this.categoryService.deleteCategories(ids).subscribe(
                        success => {
                            this.getCategories();
                            this.selection.clear();
                            this.uiService.openSnackBar(success, 'success-notification-overlay');
                            this.ref.detectChanges();
                        },
                        error => {
                            let errors = handleError(error);
                            if (errors !== null && typeof errors.message !== 'undefined') {
                                this.uiService.openSnackBar(errors.message, 'error-notification-overlay');
                            }
                            this.ref.detectChanges();
                        }
                    );
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
        this.getCategories();
        this.ref.detectChanges();
    }

    resetFilter() {
        this.filterForm.reset();
        //this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0); // TODO
        this.getCategories();
        this.ref.detectChanges();
    }
}
