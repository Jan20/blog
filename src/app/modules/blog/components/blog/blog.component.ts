import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { Post } from '../../models/post';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  public title: string = 'Guides';
  public postsInRow: number = 3;
  public posts: Observable<Post[]>;

  constructor(
    private readonly blogService: BlogService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.posts = this.fetchPosts();
  }

  ngOnInit(): void {
    if (window.innerWidth < 1000) {
      this.postsInRow = 1;
    }
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: { target: { innerWidth: number; }; }): void {
    if (event.target.innerWidth < 1000) {
      this.postsInRow = 1;
      return;
    }
    this.postsInRow = 3;
  }

  public changeView(link: string): void {
    const filePath = link.replace('./src/assets/posts', '')
    this.router.navigate([`blog/${filePath}`]);
  }

  private fetchPosts(): Observable<Post[]> {
    return this.activatedRoute.paramMap.pipe(
      map((paramMap) => paramMap.get('category')),
      map((category) => category ? category : this.title),
      tap((category) => this.title = category.charAt(0).toUpperCase() + category.slice(1)),
      map((category) => this.blogService.getPosts(category))
    )
  }
}
