import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { Post } from '../../modules/shared/models/post';
import { BlogService } from '../../modules/shared/services/blog.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
  ],
  selector: 'app-post-navigation',
  templateUrl: './post-navigation.component.html',
  styleUrls: ['./post-navigation.component.scss'],
})
export class PostNavigationComponent {
  public adjacentPosts: Observable<Map<string, Post | undefined>> | undefined;
  private post: Post = new Post();

  constructor(
    private readonly router: Router,
    private readonly blogService: BlogService
  ) {
    this.router.events
      .pipe(takeUntilDestroyed())
      .subscribe(() => (this.adjacentPosts = this.fetchAdjacentPosts()));
  }

  public navigateToPost(post: Post): void {
    this.router.navigate([`${post.route}`]);
  }

  private fetchAdjacentPosts(): Observable<Map<string, Post | undefined>> {
    return this.blogService.getPosts(this.router.url.split('/')[1], 'all').pipe(
      tap(
        (posts: Post[]) =>
          (this.post = posts.filter(post =>
            this.router.url.includes(post.route)
          )[0])
      ),
      map((posts: Post[]) => this.selectAdjacentPosts(this.post, posts))
    );
  }

  private selectAdjacentPosts(
    post: Post,
    posts: Post[]
  ): Map<string, Post | undefined> {
    const index = posts.findIndex(
      currentPost => currentPost.filePath === post.filePath
    );
    return new Map([
      [
        'previousPost',
        index > 0 && posts.length > index - 1 ? posts[index - 1] : undefined,
      ],
      ['upcomingPost', posts.length > index + 1 ? posts[index + 1] : undefined],
    ]);
  }
}
