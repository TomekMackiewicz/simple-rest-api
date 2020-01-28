import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { 
    MatSidenavModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatMenuModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';

import { DashboardModule } from './dashboard/dashboard.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

import { AppComponent } from './app.component';
import { NavigationComponent } from './menu-list-item/navigation.component';
import { LoaderComponent } from './common/loader/loader.component';

import { AuthGuard } from './common/guards/auth.guard';

import { NavService } from './menu-list-item/nav.service';
import { LoaderService } from './common/loader/loader.service';
import { AuthenticationService } from './common/services/authentication.service';

import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ApplicationPipesModule } from './pipes/application-pipes.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        LoaderComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatToolbarModule,
        MatMenuModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        DashboardModule,
        PostModule,
        UserModule,
        ApplicationPipesModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        AuthGuard,
        TokenInterceptor,
        NavService,
        AuthenticationService, 
        LoaderService,
        { 
            provide: HTTP_INTERCEPTORS, 
            useClass: LoaderInterceptor, 
            multi: true 
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}