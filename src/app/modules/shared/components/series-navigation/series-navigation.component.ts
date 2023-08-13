import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, map, zip, tap, mergeMap } from 'rxjs';
import { Post } from '../../models/post';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-series-navigation',
  templateUrl: './series-navigation.component.html',
  styleUrls: ['./series-navigation.component.scss'],
})
export class SeriesNavigationComponent {
  public adjacentPosts = this.fetchAdjacentPosts();

  constructor(
    private readonly router: Router,
    private readonly blogService: BlogService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  public navigateToPost(post: Post): void {
    const filePath = post.link.replace('/assets/posts', '');
    const id = filePath.split('/')[2].substring(4);
    this.router.navigate([`${post.category}/${post.topic}/${id}`]);
  }

  private fetchAdjacentPosts(): Observable<Map<string, Post | undefined>> {
    return this.activatedRoute.paramMap.pipe(
      mergeMap(() =>
        this.blogService.getPost(
          this.router.url.split('/')[1],
          this.router.url.split('/')[3]
        )
      ),
      mergeMap((post: Post) => this.selectAdjacentPosts(post))
    );
  }

  private selectAdjacentPosts(
    post: Post
  ): Observable<Map<string, Post | undefined>> {
    return zip(
      this.blogService.getPostBySeriesSection(
        post.category,
        post.series,
        post.seriesSection - 1
      ),
      this.blogService.getPostBySeriesSection(
        post.category,
        post.series,
        post.seriesSection + 1
      )
    ).pipe(
      tap(console.log),
      map(
        ([previousPost, upcomingPost]) =>
          new Map<string, Post | undefined>([
            ['previousPost', previousPost],
            ['upcomingPost', upcomingPost],
          ])
      )
    );
  }
}
