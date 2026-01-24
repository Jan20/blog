import { Component, inject } from '@angular/core';
import {
  PageTitle,
  PageTitleBackground,
} from '../../../components/models/page-title';
import {Observable} from "rxjs";
import {BlogService} from "../../shared/services/blog.service";
import { PageTitleComponent } from '../../../components/page-title/page-title.component';
import { PostListComponent } from '../../../components/post-list/post-list.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-recommendations',
    templateUrl: './recommendations.component.html',
    imports: [
        PageTitleComponent,
        PostListComponent,
        AsyncPipe,
    ],
})
export class RecommendationsComponent {
  private readonly blogService: BlogService = inject(BlogService);

  public readonly pageTitle: PageTitle = new PageTitle(
    'Recommendations',
    "Over the years, I've discovered several books that have proven to be particularly valuable. Here are a few of them listed below.",
    PageTitleBackground.RECOMMENDATIONS
  );

  public seriesTitles: Observable<Set<string>>;

  constructor() {
    this.seriesTitles = this.fetchSeries();
  }

  public fetchSeries(): Observable<Set<string>> {
    return this.blogService.getSeriesTitles('recommendations');
  }
}
