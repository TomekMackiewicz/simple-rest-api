// TODO: rename to user service, move to user folder

import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as decode from 'jwt-decode';
import { Router } from '@angular/router';
import { prepareError } from '../../common/functions/error.functions';
import { environment } from '../../../environments/environment';
import { UserRegistration } from '../../user/model/user';
import { HEADERS } from '../../const/http';
import { User, Users } from '../../user/model/user';

@Injectable()
export class AuthenticationService {

    currentUsername: BehaviorSubject<string> = new BehaviorSubject<string>('');
    admin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    loginError: EventEmitter<any> = new EventEmitter();
    
    getUsername(value: string) {
        this.currentUsername.next(value);
    }
        
    constructor(
        private httpClient: HttpClient,
        private router: Router           
    ) {};
       
    login(username: string, password: string) { 
        return this.httpClient.post<any>(environment.base_url+'/login_check', {
            username: username, 
            password: password
        }).subscribe(
            data => {
                var token: any = decode(data.token);
                if (token) {             
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('currentUsername', token.username); // TODO: set user object
                    localStorage.setItem('userId', token.userId);
                    localStorage.setItem('userRole', token.roles[0]);                    
                    this.getUsername(localStorage.getItem('currentUsername'));
                    if (token.roles[0] == 'ROLE_SUPER_ADMIN' || token.roles[0] == 'ROLE_ADMIN') {
                        this.router.navigate(['/admin/dashboard']);
                    } else {
                        this.router.navigate(['/denied']);
                    }               
                }
            },
            error => {
                 this.loginError.emit(error.error);
            }
        );
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUsername');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        this.getUsername('');
        this.router.navigate(['/login']);
    }

    register(user: UserRegistration) {
        return this.httpClient.post(environment.base_url+'/users/register', { 
            email: user.email, 
            username: user.username, 
            plainPassword: {
                first: user.password,
                second: user.confirmPassword
            }
        }).pipe(catchError(prepareError));
    }

    getUser(id: number): Observable<User> {
        return this.httpClient.get<User>(environment.base_url+'/users/'+id, {headers: HEADERS})
            .pipe(catchError(prepareError));
    }

    getUsers(sort: string = '', order: string = '', page: number = 0, size: number = 0, filters: any = []): Observable<Users> { 
        let params = new HttpParams()
            .set('sort', sort)
            .set('order', order)
            .set('page', page.toString())
            .set('size', size.toString())
            .set('filters', JSON.stringify(filters));
        return this.httpClient.get<Users>(environment.base_url+'/users', {headers: HEADERS, params: params})
            .pipe(catchError(prepareError));   
    }

    updateUser(user: User) {
        return this.httpClient.patch<any>(environment.base_url+'/users/'+user.id, { 
            username: user.username,
            email: user.email
        }).pipe(catchError(prepareError));
    }
}