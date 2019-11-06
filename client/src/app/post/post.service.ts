import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post, Posts } from './post';
import { HEADERS, BASE_URL } from '../const/http';
import { prepareError } from '../common/functions/error.functions';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(
        private httpClient: HttpClient
    ) {}

    getPost(id: number, path: string): Observable<Post> {     
        return this.httpClient.get<Post>(BASE_URL+path+'/'+id)
            .pipe(catchError(prepareError));
    }

    getPosts(sort: string, order: string, page: number, size: number, filters: any, path: string): Observable<Posts> {  
        let params = new HttpParams()
            .set('sort', sort)
            .set('order', order)
            .set('page', page.toString())
            .set('size', size.toString())
            .set('filters', JSON.stringify(filters))
            .set('path', path);
        return this.httpClient.get<Posts>(BASE_URL+path, {headers: HEADERS, params: params})
            .pipe(catchError(prepareError));   
    }

    addPost(post: Post, path: string): Observable<string> {
        return this.httpClient.post<string>(BASE_URL+path, post, {headers: HEADERS})
            .pipe(catchError(prepareError));
    }

    updatePost(post: Post, path: string): Observable<any> {
        return this.httpClient.patch<any>(BASE_URL+path+'/'+post.id, post, {headers: HEADERS})
            .pipe(catchError(prepareError));
    }
       
    deletePosts(ids: Array<number>, path: string): Observable<string> {            
        return this.httpClient.request<string>('delete', BASE_URL+path, { body: ids })
            .pipe(catchError(prepareError));
    }

}

