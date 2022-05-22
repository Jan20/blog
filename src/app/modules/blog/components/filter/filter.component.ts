import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { distinct, map, Observable, tap } from 'rxjs';
import { Post } from '../../models/post';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  public topics!: Observable<string[]>;
  @Input() public posts!: Observable<Post[]>;
  @Output() private topicSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.topics = this.extractTopics(this.posts);
  }

  public selectTopic(topic: string): void {
    this.topicSelected.emit(topic);
  }

  private extractTopics(posts: Observable<Post[]>): Observable<string[]> {
    return posts.pipe(
      map((posts: Post[]) => posts.map((post: Post) => post.topic)),
      map((topics: string[]) => [...new Set(topics)]),
    )
  }
}
