import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Background, Logo } from '../../shared/models/enums';
import { PageTitle } from '../../../components/models/page-title';
import { BlogService } from '../../shared/services/blog.service';

@Component({
  selector: 'app-angular-course',
  templateUrl: './angular-course.component.html',
  styleUrls: ['./angular-course.component.scss'],
})
export class AngularCourseComponent {
  public readonly pageTitle = new PageTitle(
    'Angular Guides',
    'I want to share a few ideas around coding and productivity. Please, grab a coffee and feel free to go through some of my posts.',
    Background.ANGULAR_COURSE,
  );

  public seriesTitles: Observable<Set<string>> = this.fetchSeries();

  constructor(private readonly blogService: BlogService) { }

  public fetchSeries(): Observable<Set<string>> {
    return this.blogService.getSeriesTitles('angular-course');
  }
}
