import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder } from '@angular/forms';
import { MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { UserTrait } from '../model/user-trait';

@Component({
    selector: 'app-education-status-list',
    templateUrl: './education-status-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationStatusListComponent implements OnInit {
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
        //private gameService: GameService,
        //private alertService: AlertService,
        //public dialog: MatDialog,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
    }

}
