import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category, Categories } from './category';
import { HEADERS } from '../../const/http';
import { prepareError } from '../../common/functions/error.functions';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(
        private httpClient: HttpClient
    ) {}

    getCategory(id: number): Observable<Category> {     
        return this.httpClient.get<Category>(environment.admin_url+'/category/'+id)
            .pipe(catchError(prepareError));
    }

    getCategories(sort: string, order: string, page: number, size: number, filters: any): Observable<Categories> { 
        let params = new HttpParams()
            .set('sort', sort)
            .set('order', order)
            .set('page', page.toString())
            .set('size', size.toString())
            .set('filters', JSON.stringify(filters));
        return this.httpClient.get<Categories>(environment.admin_url+'/category', {headers: HEADERS, params: params})
            .pipe(catchError(prepareError));   
    }

    addCategory(category: Category): Observable<string> {
        return this.httpClient.post<string>(environment.admin_url+'/category', category, {headers: HEADERS})
            .pipe(catchError(prepareError));
    }

    updateCategory(category: Category): Observable<any> {
        return this.httpClient.patch<any>(environment.admin_url+'/category/'+category.id, category, {headers: HEADERS})
            .pipe(catchError(prepareError));
    }
       
    deleteCategories(ids: Array<number>): Observable<string> {            
        return this.httpClient.request<string>('delete', environment.admin_url+'/category', { body: ids })
            .pipe(catchError(prepareError));
    }

}

