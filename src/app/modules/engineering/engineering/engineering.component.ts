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
    selector: 'app-engineering',
    templateUrl: './engineering.component.html',
    imports: [PageTitleComponent, PostListComponent, AsyncPipe]
})
export class EngineeringComponent {
  private readonly blogService = inject(BlogService);

  public readonly pageTitle = new PageTitle(
    'Efficient Engineering',
    "While practical guides are excellent for addressing specific issues, I've come across some broader strategies that I'd like to share here.",
    PageTitleBackground.ENGINEERING
  );
    public seriesTitles: Observable<Set<string>>;

    constructor() {
        this.seriesTitles = this.fetchSeries();
    }

    public fetchSeries(): Observable<Set<string>> {
        return this.blogService.getSeriesTitles('engineering');
    }
}