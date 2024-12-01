import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  PageTitle,
  PageTitleBackground,
} from '../../../components/models/page-title';
import { BlogService } from '../../shared/services/blog.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  standalone: false,
})
export class CourseComponent {
  public readonly pageTitle = new PageTitle(
    'Angular Guides',
    "Angular is an exceptional web application framework, particularly well-suited for large-scale applications. Below, I've curated a series of posts that delve into specific areas deserving a closer look.",
    PageTitleBackground.ANGULAR_COURSE
  );
  public seriesTitles: Observable<Set<string>>;

  constructor(private readonly blogService: BlogService) {
    this.seriesTitles = this.fetchSeries();
  }

  public fetchSeries(): Observable<Set<string>> {
    return this.blogService.getSeriesTitles('course');
  }
}
