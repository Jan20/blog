import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, mergeMap } from 'rxjs';
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
      map(() => this.router.url.split('/')),
      mergeMap((route: string[]) =>
        this.blogservice.getPost(route[1], route[2])
      )
    );
  }
}
