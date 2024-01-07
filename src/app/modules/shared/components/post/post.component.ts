import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { Post } from '../../models/post';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  public post: Observable<Post> = this.fetchPost();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly blogservice: BlogService,
    private readonly router: Router
  ) {}

  private fetchPost(): Observable<Post> {
    return this.activatedRoute.paramMap.pipe(
      switchMap(() =>
        this.blogservice.getPost(
          this.router.url.split('/')[1],
          this.router.url.split('/')[3]
        )
      ),
      tap(console.log)
    );
  }
}
