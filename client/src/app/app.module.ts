import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
    MatProgressSpinnerModule,
//    MatProgressBarModule,
//    MatDialogModule,
//    MatCardModule,
//    MatFormFieldModule,
//    MatInputModule
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';

import { DashboardModule } from './dashboard/dashboard.module';
import { EducationStatusModule } from './user-trait/education-status/education-status.module';

import { AppComponent } from './app.component';
import { NavigationComponent } from './menu-list-item/navigation.component';
import { LoaderComponent } from './common/loader/loader.component';

import { NavService } from './menu-list-item/nav.service';
import { LoaderService } from './common/loader/loader.service';

import { LoaderInterceptor } from './interceptors/loader.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        LoaderComponent
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
        MatProgressSpinnerModule,
        DashboardModule,
        EducationStatusModule
    ],
    providers: [
        NavService, 
        LoaderService,
        { 
            provide: HTTP_INTERCEPTORS, 
            useClass: LoaderInterceptor, 
            multi: true 
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
