import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { guides } from 'src/assets/posts/guides/guides';
import { recommendations } from 'src/assets/posts/recommendations/Recommendations';
import { Post } from './post';
import { engineering } from 'src/assets/posts/engineering/engineering';
import { course } from 'src/assets/posts/course/course';

@Injectable({
  providedIn: 'root',
})
export class PostCollection {
  private readonly categories: { [category: string]: Post[] } = {
    course: course,
    guides: guides,
    engineering: engineering,
    recommendations: recommendations,
  };

  public selectPosts(category: string): Observable<Post[]> {
    return of(this.categories[category] || []);
  }
}
