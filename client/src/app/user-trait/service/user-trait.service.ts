import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { UserTrait, UserTraits } from '../model/user-trait';
import { HEADERS, BASE_URL } from '../../const/http';
import { ErrorService } from '../../common/services/error.service';

@Injectable({
    providedIn: 'root'
})
export class UserTraitService {

    constructor(
        private httpClient: HttpClient,
        public datepipe: DatePipe,
        private errorService: ErrorService
    ) {}

    getUserTrait(id: number, path: string): Observable<UserTrait> {     
        return this.httpClient.get<UserTrait>(BASE_URL+path+'/'+id)
            .pipe(retry(3), catchError(this.errorService.prepareError));
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
            .pipe(retry(3), catchError(this.errorService.prepareError));   
    }

    addUserTrait(trait: UserTrait, path: string): Observable<string> {
        return this.httpClient.post<string>(BASE_URL+path, trait, {headers: HEADERS})
            .pipe(retry(3), catchError(this.errorService.prepareError));
    }
    
    updateTrait(trait: UserTrait, path: string): Observable<any> {
        return this.httpClient.patch<any>(BASE_URL+path+'/'+trait.id, trait, {headers: HEADERS})
            .pipe(retry(3), catchError(this.errorService.prepareError));
    }
       
    deleteTraits(ids: Array<number>, path: string): Observable<string> {            
        return this.httpClient.request<string>('delete', BASE_URL+path, { body: ids })
            .pipe(retry(3), catchError(this.errorService.prepareError));
    }

}
