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
    selector: 'app-guides',
    templateUrl: './guides.component.html',
    imports: [
        PageTitleComponent,
        PostListComponent,
        AsyncPipe,
    ],
})
export class GuidesComponent {
  private readonly blogService = inject(BlogService);

  public readonly pageTitle = new PageTitle(
    'Guides',
    'Over the years, I have encountered a rather vast array of technical challenges. Thus, I would like to share some of them that have not yet been exclusively covered elsewhere or deserve further explanation.',
    PageTitleBackground.GUIDES
  );
  public readonly seriesTitles: Observable<Set<string>> = this.fetchSeries();

  public fetchSeries(): Observable<Set<string>> {
    return this.blogService.getSeriesTitles('guides');
  }
}
