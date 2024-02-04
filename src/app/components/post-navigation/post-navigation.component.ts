import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, mergeMap } from 'rxjs';
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
  public adjacentPosts: Observable<Map<string, Post | undefined>>;

  constructor(
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute,
    private readonly blogService: BlogService
  ) {
    this.adjacentPosts = this.activateRoute.paramMap.pipe(
      map(() => this.getCategoryFromUrl()),
      mergeMap(category => this.blogService.getPosts(category, 'all')),
      map((posts: Post[]) => this.selectAdjacentPosts(posts))
    );
  }

  public navigateToPost(post: Post): void {
    this.router.navigate([`${post.route}`]);
  }

  private selectAdjacentPosts(posts: Post[]): Map<string, Post | undefined> {
    const post = posts.find(p => this.router.url.includes(p.route));
    const index = post ? posts.indexOf(post) : -1;
    return new Map([
      ['previousPost', index > 0 ? posts[index - 1] : undefined],
      ['upcomingPost', index < posts.length - 1 ? posts[index + 1] : undefined],
    ]);
  }

  private getCategoryFromUrl(): string {
    return this.router.url.split('/')[1];
  }
}
