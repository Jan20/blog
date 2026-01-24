import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  PageTitle,
  PageTitleBackground,
} from '../../../components/models/page-title';
import { BlogService } from '../../shared/services/blog.service';
import { PageTitleComponent } from '../../../components/page-title/page-title.component';
import { PostListComponent } from '../../../components/post-list/post-list.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    imports: [
        PageTitleComponent,
        PostListComponent,
        AsyncPipe,
    ],
})
export class CourseComponent {
  private readonly blogService = inject(BlogService);

  public readonly pageTitle = new PageTitle(
    'Angular Guides',
    "Angular is an exceptional web application framework, particularly well-suited for large-scale applications. Below, I've curated a series of posts that delve into specific areas deserving a closer look.",
    PageTitleBackground.ANGULAR_COURSE
  );
  public seriesTitles: Observable<Set<string>>;

  constructor() {
    this.seriesTitles = this.fetchSeries();
  }

  public fetchSeries(): Observable<Set<string>> {
    return this.blogService.getSeriesTitles('course');
  }
}
