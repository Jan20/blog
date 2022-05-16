import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, map, Observable, of, Subject, switchMap } from 'rxjs';
import { Post } from '../models/post';
import posts from '../../../../assets/posts/posts.json';
import { guides } from 'src/assets/posts/guides/guides';
import { reviews } from 'src/assets/posts/reviews/reviews';
import { productivity } from 'src/assets/posts/productivity/productivity';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  public postsSubject: Subject<Post[]> = new Subject<Post[]>();
  private posts: Post[] = [];

  constructor(
    private readonly httpClient: HttpClient,
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
        files.push(new Post(key, value))
      });
    });
    return files;
  }

  public getPosts(category: string): Post[] {
    switch (category) {
      case 'guides': return guides;
      case 'reviews': return reviews;
      case 'productivity': return productivity;
      default: return guides;
    }
  }

  private getPost(category: string, fileName: string): Observable<Post> {
    const url = `/posts/${category}/${fileName}`;
    return this.httpClient.get(`assets/${url}`, { responseType: 'text' }).pipe(
      catchError(this.handleError<string>('getPosts', '[]')),
      switchMap(article => {
        const headline: string = article.split('\n')[1].replace('# ', '');
        const firstParagraph: string = this.cleanParagraph(article);
        const imageUrl: string = article.split('(')[1].split(')')[0]
        return of(new Post(category, fileName, headline, firstParagraph, url, imageUrl))
      })
    );
  }

  private cleanParagraph(article: string): string {
    const firstParagraph: string = article.split('\n')[2];
    let updatedParagraph: string = '';
    for (let i = 0; i < firstParagraph.length; i++) {
      updatedParagraph += firstParagraph[i] !== '*' ? firstParagraph[i] : '';
    }
    return updatedParagraph;
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
