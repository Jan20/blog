import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, map, of, tap } from 'rxjs';
import { Post } from '../../models/post';
import { BlogService } from '../../services/blog.service';
import { WindowService } from '../../services/window.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  numberOfColumns: number = this.windowService.getNumberOfColumns();
  posts: Observable<Post[]> = this.fetchPosts('guides');

  constructor(
    private readonly blogService: BlogService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly windowService: WindowService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        tap(console.log),
        map((paramMap: ParamMap) => [
          paramMap.get('category'),
          paramMap.get('topic'),
        ]),
        tap(console.log),
        tap(params => (this.posts = this.fetchPosts(params[0], params[1])))
      )
      .subscribe();
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: { target: { innerWidth: number } }): void {
    this.numberOfColumns = this.onWidthChange(event.target.innerWidth);
  }

  private onWidthChange(width: number): number {
    if (width < 800) return 1;
    if (width < 1200) return 2;
    if (width < 1800) return 3;
    return 4;
  }

  public showPost(link: string): void {
    const filePath = link.replace('./src/assets/posts', '');
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

  private fetchPosts(
    category: string | null,
    topic?: string | null
  ): Observable<Post[]> {
    category = category !== null ? category : 'guides';
    topic = topic !== null ? topic : 'All';
    return of(this.blogService.getPosts(category, topic));
  }

  selectCategory(): Observable<string> {
    return this.activatedRoute.paramMap.pipe(
      map((paramMap: ParamMap) => paramMap.get('category') ?? 'Guides'),
      map(
        (category: string) =>
          category.charAt(0).toUpperCase() + category.slice(1)
      )
    );
  }
}
