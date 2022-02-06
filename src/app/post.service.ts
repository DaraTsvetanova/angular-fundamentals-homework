import { Injectable } from '@angular/core';
import { Post } from './post';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(this.postsUrl)
      .pipe(catchError(this.handleError<Post[]>('getPosts', [])));
  }

  getPost(id: number): Observable<Post> {
    const url = `${this.postsUrl}/${id}`;
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    return this.http
      .get<Post>(url)
      .pipe(catchError(this.handleError<Post>(`getHero id=${id}`)));
  }

  /** PUT: update the post on the server */
  updatePost(post: Post): Observable<any> {
    return this.http
      .put(this.postsUrl, post, this.httpOptions)
      .pipe(catchError(this.handleError<any>('updatePost')));
  }

  addPost(post: Post): Observable<Post> {
    return this.http
      .post<Post>(this.postsUrl, post, this.httpOptions)
      .pipe(catchError(this.handleError<Post>('addPost')));
  }

  /** DELETE: delete the post from the server */
  deletePost(id: number): Observable<Post> {
    const url = `${this.postsUrl}/${id}`;

    return this.http
      .delete<Post>(url, this.httpOptions)
      .pipe(catchError(this.handleError<Post>('deletePost')));
  }
}
