import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Background } from '../../shared/models/enums';
import { PageTitle } from '../../shared/models/pageTitle';
import { BlogService } from '../../shared/services/blog.service';

@Component({
  selector: 'app-guides',
  templateUrl: './guides.component.html',
  styleUrls: ['./guides.component.scss'],
})
export class GuidesComponent {
  public readonly pageTitle = new PageTitle(
    'Guides',
    'This sections provides a range of guides covering topics ar',
    Background.GUIDES,
  );

  public seriesTitles: Observable<Set<string>> = this.fetchSeries();

  constructor(private readonly blogService: BlogService) { }

  public fetchSeries(): Observable<Set<string>> {
    return this.blogService.getSeriesTitles('guides');
  }
}
