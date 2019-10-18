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
import { AppRoutingModule } from './app-routing.module';

import { EducationStatusModule } from './user-trait/education-status/education-status.module';

import { AppComponent } from './app.component';
import { NavigationComponent } from './menu-list-item/navigation.component';



import { NavService } from './menu-list-item/nav.service';

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatToolbarModule,
        MatMenuModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        EducationStatusModule
    ],
    providers: [NavService],
    bootstrap: [AppComponent]
})
export class AppModule { }
