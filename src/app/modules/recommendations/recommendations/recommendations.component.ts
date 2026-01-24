import { Component, inject } from '@angular/core';
import {
  PageTitle,
  PageTitleBackground,
} from '../../../components/models/page-title';
import {Observable} from "rxjs";
import {BlogService} from "../../shared/services/blog.service";

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  standalone: false,
})
export class RecommendationsComponent {
  private readonly blogService = inject(BlogService);

  public readonly pageTitle = new PageTitle(
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
