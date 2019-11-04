import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

    loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private router: Router
    ) {}

    isLoggedIn(value: boolean) {
        this.loggedIn.next(value);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        var token = this.getToken();
        var expectedRole = route.data.expectedRole;
        
        // Skip check for login page
        if (state.url === '/login') {
            this.isLoggedIn(false);
            return true;
        }

        // If no specific role is expected and we have a token, assume authorized
        if (token && typeof expectedRole === 'undefined') {
            this.isLoggedIn(true);
            return true;
        }

        // Role expected, but no token - assume not authorized
        if (!token) {
            return false;
        }

        // If user role matches expected role and token is valid - user is authorized
        if (this.isUserAuthorized(token, expectedRole) && !this.isTokenExpired(token)) {
            this.isLoggedIn(true);
            return true;
        }

        // If user has role admin, he is allowed to visit the dashboard, we just block the specific page
        if (this.userHasAdminRole(token, expectedRole)) {
            this.isLoggedIn(true);
        } else {
            this.isLoggedIn(false);
        }

        this.router.navigate(['/denied'], {queryParams: {returnUrl: state.url}});

        return false;
    }

    userHasAdminRole(token: string, expectedRole: string) {
        var roles = this.getUserRoles(token);
        if (roles.find(role => role == 'ROLE_ADMIN')) {
            return true;
        }

        return false;        
    }

    getToken(): string {
        return localStorage.getItem('token');
    }
    
    isUserAuthorized(token: string, expectedRole: string) {
        var roles = this.getUserRoles(token);

        if (roles.find(role => role == 'ROLE_SUPER_ADMIN')) {
            return true;
        }

        if (roles.find(role => role == expectedRole)) {
            return true;
        }

        return false;
    }

    getUserRoles(token: string) {
        return this.decodeToken(token).roles;
    }

    decodeToken(token: string) {
        return jwt_decode(token);
    }

    isTokenExpired(token: string): boolean {
        const date = this.getTokenExpirationDate(token);
        
        if(date === undefined) {
            return false;
        }
        
        return !(date.valueOf() > new Date().valueOf());
    } 

    getTokenExpirationDate(token: string): Date {
        var decoded: any = this.decodeToken(token);

        if (decoded.exp === undefined) {
            return null;
        }

        const date = new Date(0); 
        date.setUTCSeconds(decoded.exp);

        return date;
    }

}
