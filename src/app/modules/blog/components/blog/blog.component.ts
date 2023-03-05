import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { Post } from '../../models/post';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  public posts: Post[] = this.fetchPosts('guides');
  private readonly destroyed = new Subject();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly blogService: BlogService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        map((paramMap: ParamMap) => [
          paramMap.get('category'),
          paramMap.get('topic'),
        ]),
        tap(params => (this.posts = this.fetchPosts(params[0], params[1]))),
        takeUntil(this.destroyed)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete;
  }

  public showPost(post: Post): void {
    const filePath = post.link.replace('/assets/posts', '');
    const category = filePath.split('/')[1];
    const id = filePath.split('/')[2].substring(4);
    this.router.navigate([`blog/${category}/${post.topic}/${id}`]);
  }

  public selectTopic(topic: string): void {
    this.activatedRoute.paramMap
      .pipe(
        map((paramMap: ParamMap) => paramMap.get('category')),
        map(category => (!category ? 'guides' : category)),
        tap(category => this.router.navigate([`blog/${category}/${topic}`])),
        takeUntil(this.destroyed)
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
