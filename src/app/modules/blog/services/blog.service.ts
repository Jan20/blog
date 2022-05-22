import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { guides } from 'src/assets/posts/guides/guides';
import { productivity } from 'src/assets/posts/productivity/productivity';
import { reviews } from 'src/assets/posts/reviews/reviews';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private readonly httpClient: HttpClient,
  ) {}

  public getPosts(category: string, topic?: string): Post[] {
    let posts: Post[] = [];
    switch (category) {
      case 'guides': posts = guides; break;
      case 'reviews': posts = reviews; break;
      case 'productivity': posts = productivity; break;
      default: posts = guides;
    }
    if (topic) {
      return posts.filter((post: Post) => post.topic === topic)
    }
    return posts;
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
