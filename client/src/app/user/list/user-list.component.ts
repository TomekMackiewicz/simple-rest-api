import { Component, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder } from '@angular/forms';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators'
import { MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { User } from '../model/user';
import { AuthenticationService } from '../../common/services/authentication.service';
import { UiService } from '../../common/services/ui.service';
import { handleError } from '../../common/functions/error.functions';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements AfterViewInit {
    displayedColumns: string[] = ['select', 'username', 'email', 'enabled'];
    expandedElement: User | null;
    data: User[] = [];
    selection = new SelectionModel<User>(true, []);
    resultsLength = 0;
    isRateLimitReached = false;
    filterForm = this.fb.group({
        username: ['']
    });
    filterPanelOpenState = true;

    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;

    constructor(
        private userService: AuthenticationService,
        private uiService: UiService,
        private fb: FormBuilder,
        private ref: ChangeDetectorRef
    ) {}

    ngAfterViewInit() {
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        this.getUsers();
        this.ref.detectChanges();
    }

    getUsers() {
        merge(this.sort.sortChange, this.paginator.page).pipe(
            startWith({}),
            switchMap(() => {
                return this.userService.getUsers(
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
                return data.users;
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
    
    switchStatus(id: number) {
        //this.router.navigate(['/admin/user/edit/'+id]);
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
        this.getUsers();
        this.ref.detectChanges();
    }

    resetFilter() {
        this.filterForm.reset();
        //this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0); // TODO
        this.getUsers();
        this.ref.detectChanges();
    }
}
