import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserTrait, UserTraits } from '../model/user-trait';
import { HEADERS } from '../../const/http';
import { prepareError } from '../../common/functions/error.functions';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserTraitService {

    constructor(
        private httpClient: HttpClient,
        //private errorService: ErrorService
    ) {}

    getUserTrait(id: number, path: string): Observable<UserTrait> {     
        return this.httpClient.get<UserTrait>(environment.base_url+path+'/'+id)
            .pipe(catchError(prepareError));
    }

    getUserTraits(sort: string, order: string, page: number, size: number, filters: any, path: string): Observable<UserTraits> {  
        let params = new HttpParams()
            .set('sort', sort)
            .set('order', order)
            .set('page', page.toString())
            .set('size', size.toString())
            .set('filters', JSON.stringify(filters))
            .set('path', path);
        return this.httpClient.get<UserTraits>(environment.base_url+path, {headers: HEADERS, params: params})
            .pipe(catchError(prepareError));   
    }

    addUserTrait(trait: UserTrait, path: string): Observable<string> {
        return this.httpClient.post<string>(environment.base_url+path, trait, {headers: HEADERS})
            .pipe(catchError(prepareError));
    }
    
    updateTrait(trait: UserTrait, path: string): Observable<any> {
        return this.httpClient.patch<any>(environment.base_url+path+'/'+trait.id, trait, {headers: HEADERS})
            .pipe(catchError(prepareError));
    }
       
    deleteTraits(ids: Array<number>, path: string): Observable<string> {            
        return this.httpClient.request<string>('delete', environment.base_url+path, { body: ids })
            .pipe(catchError(prepareError));
    }

}
