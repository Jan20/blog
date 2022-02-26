import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject } from 'rxjs';
import { Post } from '../models/post';
import posts from '../../../../assets/posts/posts.json';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  public postsSubject: Subject<Post[]> = new Subject<Post[]>();
  private posts: Post[] = [];

  constructor(
    private httpClient: HttpClient,
  ) {
    this.posts = this.importFileNames();
  }

  /**
   * Loads the posts JSON from the asssets directory and returns an array of
   * posts, based on the data provided in the JSON.
   * 
   * @returns: Array of Posts.
   */
  private importFileNames(): Post[] {
    const files: Post[] = [];
    Object.keys(posts).forEach(key => {
      posts[key as keyof typeof posts].forEach(value => {
        files.push(new Post(value, key))
      });
    });
    return files;
  }

  /**
   * 
   */
  public fetchPosts(): void {
    this.posts.forEach((post, index) => {
      this.httpClient.get(`/assets/posts/${post.category}/${post.fileName}`, { responseType: 'text' })
        .pipe(catchError(this.handleError<string>('getPosts', '[]')))
        .subscribe(response => {
          post.headline = response.split("\n")[0].replace("# ", "")
          post.firstParagraph = response.split("\n")[1]
          post.link = `blog/posts/${post.category}/${post.fileName}`
          this.posts[index] = post
          this.postsSubject.next(this.posts)
        })
    })
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`HeroService: ${message}`);
  }
}
