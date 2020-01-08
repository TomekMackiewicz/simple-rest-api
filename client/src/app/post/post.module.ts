import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
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
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatSelectModule
} from '@angular/material';
import { CrudModule } from '../common/crud/crud.module';

import { PostListComponent } from './list/post-list.component';
import { PostAddComponent } from './add/post-add.component';
import { CategoryListComponent } from './category/list/category-list.component';
import { CategoryAddComponent } from './category/add/category-add.component';
import { CategoryEditComponent } from './category/edit/category-edit.component';

import { ApplicationPipesModule } from '../pipes/application-pipes.module';

@NgModule({
    declarations: [
        PostListComponent,
        PostAddComponent,
        CategoryListComponent,
        CategoryAddComponent,
        CategoryEditComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
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
        MatDatepickerModule,
        MatNativeDateModule,
        MatTooltipModule,
        MatSelectModule,
        ApplicationPipesModule,
        CrudModule,
        CKEditorModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
})
    ],
    providers: [DatePipe]
})
export class PostModule { }

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}