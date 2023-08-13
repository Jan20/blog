import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularCourse } from 'src/assets/posts/angular-course/AngularCourse';
import { EfficientSoftwareEngineering } from 'src/assets/posts/efficient-software-engineering/EfficientSoftwareEngineering';
import { Guides } from 'src/assets/posts/guides/guides';
import { Recommendations } from 'src/assets/posts/recommendations/Recommendations';
import { Post } from './post';

@Injectable({
  providedIn: 'root',
})
export class PostCollection {
  private readonly categories: { [category: string]: Post[] } = {
    'angular-course': AngularCourse,
    guides: Guides,
    'efficient-software-engineering': EfficientSoftwareEngineering,
    recommendations: Recommendations,
  };

  public selectPosts(category: string): Observable<Post[]> {
    return of(this.categories[category] || []);
  }
}
