import { Component, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder } from '@angular/forms';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators'
import { MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { UserTrait } from '../model/user-trait';
import { UserTraitService } from '../service/user-trait.service';

@Component({
    selector: 'app-education-status-list',
    templateUrl: './education-status-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationStatusListComponent implements AfterViewInit {
    displayedColumns: string[] = ['select', 'label'];
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
        //private router: Router,
        private userTraitService: UserTraitService,
        //private alertService: AlertService,
        //public dialog: MatDialog,
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
}
