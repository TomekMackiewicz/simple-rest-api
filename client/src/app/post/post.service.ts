import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post, Posts } from './post';
import { HEADERS } from '../const/http';
import { prepareError } from '../common/functions/error.functions';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(
        private httpClient: HttpClient
    ) {}

    getPost(id: number, path: string): Observable<Post> {     
        return this.httpClient.get<Post>(environment.admin_url+path+'/'+id)
            .pipe(catchError(prepareError));
    }

    getPosts(sort: string, order: string, page: number, size: number, filters: any): Observable<Posts> { 
        let params = new HttpParams()
            .set('sort', sort)
            .set('order', order)
            .set('page', page.toString())
            .set('size', size.toString())
            .set('filters', JSON.stringify(filters));
        return this.httpClient.get<Posts>(environment.admin_url+'/post', {headers: HEADERS, params: params})
            .pipe(catchError(prepareError));
    }

    addPost(post: Post): Observable<string> {
        return this.httpClient.post<string>(environment.admin_url+'/post', post, {headers: HEADERS})
            .pipe(catchError(prepareError));
    }

    updatePost(post: Post, path: string): Observable<any> {
        return this.httpClient.patch<any>(environment.admin_url+'/post/'+post.id, post, {headers: HEADERS})
            .pipe(catchError(prepareError));
    }
       
    deletePosts(ids: Array<number>): Observable<string> {            
        return this.httpClient.request<string>('delete', environment.admin_url+'/post', { body: ids })
            .pipe(catchError(prepareError));
    }

}

