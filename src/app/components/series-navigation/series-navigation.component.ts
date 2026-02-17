import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, mergeMap } from 'rxjs';
import { Post } from '../../modules/shared/models/post';
import { BlogService } from '../../modules/shared/services/blog.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  imports: [
    CommonModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
  ],
  selector: 'app-series-navigation',
  templateUrl: './series-navigation.component.html',
  styleUrls: ['./series-navigation.component.scss'],
})
export class SeriesNavigationComponent {
  private readonly router: Router = inject(Router);
  private readonly activateRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly blogService: BlogService = inject(BlogService);

  public adjacentPosts: Observable<Map<string, Post | undefined>>;

  constructor() {
    this.adjacentPosts = this.activateRoute.paramMap.pipe(
      map(() => this.router.url.split('/')[1]),
      mergeMap(category => this.blogService.getPosts(category, 'all')),
      map((posts: Post[]) => this.selectAdjacentPosts(posts))
    );
  }

  public navigateToPost(post: Post): void {
    this.router.navigate([`${post.route}`]);
  }

  private selectAdjacentPosts(posts: Post[]): Map<string, Post | undefined> {
    const post = posts.filter(p => this.router.url.includes(p.route))[0];
    return new Map<string, Post | undefined>([
      [
        'previousPost',
        posts.filter(p => p.seriesSection === post.seriesSection - 1)[0],
      ],
      [
        'upcomingPost',
        posts.filter(p => p.seriesSection === post.seriesSection + 1)[0],
      ],
    ]);
  }
}
