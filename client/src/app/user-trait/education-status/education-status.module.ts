import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { 
    MatSidenavModule, 
//    MatCheckboxModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatMenuModule,
    MatListModule,
//    MatProgressSpinnerModule,
//    MatProgressBarModule,
//    MatDialogModule,
    MatCardModule,
    MatExpansionModule,
//    MatFormFieldModule,
//    MatInputModule
} from '@angular/material';

import { EducationStatusListComponent } from './education-status-list.component';
import { EducationStatusAddComponent } from './education-status-add.component';
import { EducationStatusEditComponent } from './education-status-edit.component';

import { ApplicationPipesModule } from '../../pipes/application-pipes.module';

@NgModule({
    declarations: [
        EducationStatusListComponent,
        EducationStatusAddComponent,
        EducationStatusEditComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatToolbarModule,
        MatMenuModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatExpansionModule,
        ApplicationPipesModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
})
    ],
    providers: []
})
export class EducationStatusModule { }

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}