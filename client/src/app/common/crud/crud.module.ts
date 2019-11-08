import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatQuillModule } from '@webacad/ng-mat-quill';
import { 
    MatSidenavModule, 
    MatCheckboxModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatMenuModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
} from '@angular/material';
import { ApplicationPipesModule } from '../../pipes/application-pipes.module';

import { AddDialogComponent } from '../../common/add-dialog/add-dialog.component';
import { EditDialogComponent } from '../../common/edit-dialog/edit-dialog.component';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';

@NgModule({
    declarations: [
        AddDialogComponent,
        EditDialogComponent,
        ConfirmDialogComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ApplicationPipesModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatMenuModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatCardModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        MatSnackBarModule,
        MatQuillModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [],
    entryComponents: [AddDialogComponent, EditDialogComponent, ConfirmDialogComponent]
})
export class CrudModule { }

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}