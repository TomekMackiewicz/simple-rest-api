import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
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
//    MatCardModule,
//    MatFormFieldModule,
//    MatInputModule
} from '@angular/material';

import { EducationStatusListComponent } from './education-status-list.component';
import { EducationStatusAddComponent } from './education-status-add.component';
import { EducationStatusEditComponent } from './education-status-edit.component';

import { ApplicationPipesModule } from '../pipes/application-pipes.module';

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
    ApplicationPipesModule
  ],
  providers: []
})
export class EducationStatusModule { }
