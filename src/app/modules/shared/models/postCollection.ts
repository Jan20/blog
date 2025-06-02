import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from './post';
import { course } from '../../../../assets/posts/course/course';
import { engineering } from '../../../../assets/posts/engineering/engineering';
import { guides } from '../../../../assets/posts/guides/guides';
import { recommendations } from '../../../../assets/posts/recommendations/Recommendations';

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
