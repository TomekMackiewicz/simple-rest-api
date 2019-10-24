import { Component, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder } from '@angular/forms';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators'
import { MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { UserTrait } from '../model/user-trait';
import { UserTraitService } from '../service/user-trait.service';
import { AddDialogComponent } from '../../common/add-dialog/add-dialog.component';
import { EditDialogComponent } from '../../common/edit-dialog/edit-dialog.component';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-education-status-list',
    templateUrl: './education-status-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationStatusListComponent implements AfterViewInit {
    displayedColumns: string[] = ['select', 'label'];
    expandedElement: UserTrait | null;
    data: UserTrait[] = [];
    selection = new SelectionModel<UserTrait>(true, []);
    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;
    
    filterForm = this.fb.group({
        label: ['']
    });
    filterPanelOpenState = true;

    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;

    constructor(
        public dialog: MatDialog,
        //private router: Router,
        private userTraitService: UserTraitService,
        //private alertService: AlertService,
        private fb: FormBuilder,
        private ref: ChangeDetectorRef
    ) {}

    ngAfterViewInit() {       
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        this.getUserTraits();
    }
    
    getUserTraits() {
        merge(this.sort.sortChange, this.paginator.page).pipe(
            startWith({}),
            switchMap(() => {
                this.isLoadingResults = true;
                return this.userTraitService.getUserTraits(
                    this.sort.active, 
                    this.sort.direction, 
                    this.paginator.pageIndex+1, 
                    this.paginator.pageSize,
                    this.filterForm.value,
                    '/education-status'
                );
            }),
            map(data => {
                this.isLoadingResults = false;
                this.isRateLimitReached = false;
                this.resultsLength = data.total_count;
                return data.traits;
            }),
            catchError(() => {
                this.isLoadingResults = false;
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
        //dialogConfig.panelClass = '';
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            id: id,
            path: '/education-status'
        };        
        const dialogRef = this.dialog.open(EditDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            data => {
                if (data === true) {
                    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
                    this.getUserTraits();
                    this.ref.detectChanges();
                }
            }
        );
    }

    openAddDialog(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = this.isLargeScreen() ? '33%' : '100%';
        dialogConfig.minWidth = this.isLargeScreen() ? '33%' : '100%';
        //dialogConfig.panelClass = '';
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            path: '/education-status'
        };        
        const dialogRef = this.dialog.open(AddDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            data => {
                if (data === true) {
                    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
                    this.getUserTraits();
                    this.ref.detectChanges();
                }
            }
        );
    }

    deleteTraits() {
        this.openConfirmDeleteDialog();
    }

    openConfirmDeleteDialog(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            title: 'delete.confirm.title',
            description: 'delete.confirm.description'
        };        
        const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
       
        dialogRef.afterClosed().subscribe(
            data => {
                if (data === true) {
                    var ids = this.selection.selected.map(({ id }) => id);
                    this.userTraitService.deleteTraits(ids, '/education-status').subscribe(
                        success => {
                            //this.alertService.success(success, true);
                            this.getUserTraits();
                            this.selection.clear();
                            this.ref.detectChanges();
                        },
                        error => {
                            console.log(error);
                            //this.alertService.error(error, true);
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
        //this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        this.getUserTraits();
        this.ref.detectChanges();
    }

    resetFilter() {
        this.filterForm.reset();
        //this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        this.getUserTraits();
        this.ref.detectChanges();
    }
}
