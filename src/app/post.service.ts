import { Injectable } from '@angular/core';
import { Post } from './post';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  posts: Post[] = [];
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  loadPosts(): void {
    if (this.posts.length) return;
    this.http
      .get<Post[]>(this.postsUrl)
      .pipe(catchError(this.handleError<Post[]>('getPosts', [])))
      .subscribe((posts: Post[]) => (this.posts = posts));
  }

  getPost(id: number): Observable<Post> {
    const url = `${this.postsUrl}/${id}`;
    return this.http
      .get<Post>(url)
      .pipe(catchError(this.handleError<Post>(`getPost id=${id}`)));
  }

  updatePost(post: Post): Observable<any> {
    const observable = this.http
      .put(`${this.postsUrl}/${post.id}`, post, this.httpOptions)
      .pipe(catchError(this.handleError<any>('updatePost')));

    observable.subscribe(
      (post: Post) =>
        (this.posts = this.posts.map((p) => {
          if (p.id === post.id) {
            return post;
          }
          return p;
        }))
    );
    return observable;
    // return this.http
    //   .put(`${this.postsUrl}/${post.id}`, post, this.httpOptions)
    //   .pipe(catchError(this.handleError<any>('updatePost')));
  }

  addPost(post: Post): Observable<Post> {
    return this.http
      .post<Post>(this.postsUrl, post, this.httpOptions)
      .pipe(catchError(this.handleError<Post>('addPost')));
  }

  deletePost(id: number): Observable<Post> {
    const url = `${this.postsUrl}/${id}`;

    return this.http
      .delete<Post>(url, this.httpOptions)
      .pipe(catchError(this.handleError<Post>('deletePost')));
  }
}
