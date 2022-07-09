import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  public topics: Observable<string[]> = this.fetchTopics();

  @Output() private topicSelected = new EventEmitter<string>();

  constructor(
    private readonly blogService: BlogService,
    private readonly activatedRoute: ActivatedRoute,
  ) {}

  public selectTopic(topic: string): void {
    this.topicSelected.emit(topic);
  }

  public fetchTopics(): Observable<string[]> {
    return this.activatedRoute.url.pipe(
      map((url) => url[1].path),
      map((category) => this.blogService.getTopics(category)),
      map((topics: string[]) => [...new Set(topics)]),
    );
  }
}
