import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { UserTrait, UserTraits } from '../model/user-trait';
import { HEADERS, BASE_URL } from '../../const/http';

@Injectable({
    providedIn: 'root'
})
export class UserTraitService {
            
    constructor(
        private httpClient: HttpClient,
        public datepipe: DatePipe
    ) {}

    getUserTrait(id: number, path: string): Observable<UserTrait> {     
        return this.httpClient.get<UserTrait>(BASE_URL+path+'/'+id)
            .pipe(retry(1), catchError(this.handleError));
    }

    getUserTraits(sort: string, order: string, page: number, size: number, filters: any, path: string): Observable<UserTraits> {  
        let params = new HttpParams()
            .set('sort', sort)
            .set('order', order)
            .set('page', page.toString())
            .set('size', size.toString())
            .set('filters', JSON.stringify(filters))
            .set('path', path);
        return this.httpClient.get<UserTraits>(BASE_URL+path, {headers: HEADERS, params: params})
            .pipe(retry(1), catchError(this.handleError));   
    }

//    addGame(game: Game): Observable<string> {
//        return this.httpClient.post<string>(BASE_URL+'/games', game, HTTP_OPTIONS)
//            .pipe(catchError(this.handleError));
//    }
//    
    updateTrait(trait: UserTrait, path: string): Observable<any> {
        return this.httpClient.patch<any>(BASE_URL+path+'/'+trait.id, trait, {headers: HEADERS})
            .pipe(catchError(this.handleError));
    }
       
    deleteTraits(ids: Array<number>, path: string): Observable<string> {            
        return this.httpClient.request<string>('delete', BASE_URL+path, { body: ids })
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred.
            errorMessage = error.error.message;
        } else {
            // The backend returned an unsuccessful response code.
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);

        return throwError(errorMessage);
    };
                 
}
