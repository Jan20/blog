import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { Post } from '../../models/post';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  public postsInRow: number = 3;
  public posts: Observable<Post[]> = this.fetchPosts('guides')

  constructor(
    private readonly blogService: BlogService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    if (window.innerWidth < 1000) this.postsInRow = 1;
    this.activatedRoute.url.pipe(
      switchMap((url) => this.posts = this.fetchPosts(url[1].path, url[2].path)),
    ).subscribe();
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: { target: { innerWidth: number; }; }): void {
    this.postsInRow = this.onWidthChange(event.target.innerWidth)
  }

  private onWidthChange(width: number): number {
    if (width < 800) return 1;
    if (width < 1200) return 2;
    if (width < 1800) return 3;
    return 4;
  }

  public changeView(link: string): void {
    const filePath = link.replace('./src/assets/posts', '')
    this.router.navigate([`blog/${filePath}`]);
  }

  public selectTopic(topic: string): void {
    this.router.navigate([`blog/guides/${topic}`]);
  }

  fetchPosts(category: string, topic?: string): Observable<Post[]> {
    topic = topic !== 'All' ? topic : undefined
    return of(this.blogService.getPosts(category, topic));
  }

  selectCategory(): Observable<string> {
    return this.activatedRoute.paramMap.pipe(
      map((paramMap) => paramMap.get('category') ?? 'Guides'),
      map((category) => category.charAt(0).toUpperCase() + category.slice(1)),
    );
  }
}
