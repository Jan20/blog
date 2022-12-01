import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Post } from '../../models/post';
import { BlogService } from '../../services/blog.service';
import { WindowService } from '../../services/window.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  public numberOfColumns: number = this.windowService.getNumberOfColumns();
  public posts: Post[] = this.fetchPosts('guides');

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly blogService: BlogService,
    private readonly router: Router,
    private readonly windowService: WindowService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        map((paramMap: ParamMap) => [
          paramMap.get('category'),
          paramMap.get('topic'),
        ]),
        tap(params => (this.posts = this.fetchPosts(params[0], params[1])))
      )
      .subscribe();
  }

  public showPost(link: string): void {
    const filePath = link.replace('/assets/posts', '');
    this.router.navigate([`blog/${filePath}`]);
  }

  public selectTopic(topic: string): void {
    this.activatedRoute.paramMap
      .pipe(
        map((paramMap: ParamMap) => paramMap.get('category')),
        map(category => (!category ? 'guides' : category)),
        tap(category => this.router.navigate([`blog/${category}/${topic}`]))
      )
      .subscribe();
  }

  public selectCategory(): Observable<string> {
    return this.activatedRoute.paramMap.pipe(
      map((paramMap: ParamMap) => paramMap.get('category') ?? 'Guides'),
      map(category => category.charAt(0).toUpperCase() + category.slice(1))
    );
  }

  private fetchPosts(category: string | null, topic?: string | null): Post[] {
    category = category !== null ? category : 'guides';
    topic = topic !== null ? topic : 'All';
    return this.blogService.getPosts(category, topic).sort(this.sortByDate);
  }

  private sortByDate(post1: Post, post2: Post): number {
    return new Date(post2.date).getTime() - new Date(post1.date).getTime();
  }
}
