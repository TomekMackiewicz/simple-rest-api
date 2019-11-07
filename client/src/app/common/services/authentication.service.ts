import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import * as decode from 'jwt-decode';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthenticationService {

    currentUsername: BehaviorSubject<string> = new BehaviorSubject<string>('');
    admin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    loginError: EventEmitter<any> = new EventEmitter();
    
    getUsername(value: string) {
        this.currentUsername.next(value);
    }
        
    constructor(
        private http: HttpClient,
        private router: Router           
    ) {};
       
    login(username: string, password: string) { 
        return this.http.post<any>(environment.base_url+'/login_check', {
            username: username, 
            password: password
        }).subscribe(
            data => {
                var token: any = decode(data.token);
                if (token) {             
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('currentUsername', token.username);
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
}