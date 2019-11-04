import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './common/guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EducationStatusListComponent } from './user-trait/education-status/education-status-list.component';

const routes: Routes = [
    {
        path: 'login', 
        component: LoginComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'admin',
        children: [
            {
                path: 'education-status', 
                children: [
                    {
                        path: 'list', 
                        component: EducationStatusListComponent                
                    }
                ]                
            },
            {
                path: 'dashboard', 
                component: DashboardComponent             
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
