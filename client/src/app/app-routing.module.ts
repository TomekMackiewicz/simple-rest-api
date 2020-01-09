import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './common/guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostListComponent } from './post/list/post-list.component';
import { PostAddComponent } from './post/add/post-add.component';
import { PostEditComponent } from './post/edit/post-edit.component';
import { CategoryListComponent } from './post/category/list/category-list.component';
import { CategoryAddComponent } from './post/category/add/category-add.component';
import { CategoryEditComponent } from './post/category/edit/category-edit.component';
import { NotFoundComponent } from './not-found/not-found.component';
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
                path: 'dashboard', 
                component: DashboardComponent,
                canActivate: [AuthGuard],
                data: {
                    expectedRole: 'ROLE_ADMIN'
                }             
            },
            {
                path: 'post', 
                children: [
                    {
                        path: '', 
                        component: PostListComponent,
                        canActivate: [AuthGuard],
                        data: {
                            expectedRole: 'ROLE_ADMIN'
                        }             
                    },
                    {
                        path: 'add', 
                        component: PostAddComponent,
                        canActivate: [AuthGuard],
                        data: {
                            expectedRole: 'ROLE_ADMIN'
                        }             
                    },
                    {
                        path: 'edit/:id', 
                        component: PostEditComponent,
                        canActivate: [AuthGuard],
                        data: {
                            expectedRole: 'ROLE_ADMIN'
                        }             
                    } 
                ]           
            },
            {
                path: 'category', 
                children: [
                    {
                        path: '', 
                        component: CategoryListComponent,
                        canActivate: [AuthGuard],
                        data: {
                            expectedRole: 'ROLE_ADMIN'
                        }             
                    },
                    {
                        path: 'add', 
                        component: CategoryAddComponent,
                        canActivate: [AuthGuard],
                        data: {
                            expectedRole: 'ROLE_ADMIN'
                        }             
                    },
                    {
                        path: 'edit/:id', 
                        component: CategoryEditComponent,
                        canActivate: [AuthGuard],
                        data: {
                            expectedRole: 'ROLE_ADMIN'
                        }             
                    }
                ]             
            }

        ]
    },
    { 
        path: '**', 
        component: NotFoundComponent 
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
