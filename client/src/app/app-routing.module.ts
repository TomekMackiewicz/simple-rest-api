import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EducationStatusListComponent } from './user-trait/education-status/education-status-list.component';
import { EducationStatusAddComponent } from './user-trait/education-status/education-status-add.component';
import { EducationStatusEditComponent } from './user-trait/education-status/education-status-edit.component';

const routes: Routes = [
    { 
        path: 'admin',
        children: [
            {
                path: 'education-status', 
                children: [
                    {
                        path: 'list', 
                        component: EducationStatusListComponent                
                    },
                    {
                        path: 'add', 
                        component: EducationStatusAddComponent
                    },
                    {
                        path: 'edit', 
                        component: EducationStatusEditComponent
                    }
                ]                
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
