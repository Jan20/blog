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
export class BlogComponent implements OnInit, OnDestroy {

  public title: string = 'Guides';
  public posts: Post[] = [];
  public postsInRow: number = 3;
  private destroyed: Subject<boolean> = new Subject();

  constructor(
    private readonly blogService: BlogService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) { 
    this.activatedRoute.paramMap.pipe(
      takeUntil(this.destroyed),
      map((paramMap) => paramMap.get('category') as string),
      tap((category) => this.title = category.charAt(0).toUpperCase() + category.slice(1)),
      tap((category) => this.posts = this.blogService.getPosts(category))
    )
    .subscribe();
  }

  ngOnInit(): void {
    if (window.innerWidth < 1000) {
      this.postsInRow = 1;
    }
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
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
    console.log(link);
    this.router.navigate([`blog/${link}`]);
  }
}
