import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, mergeMap } from 'rxjs';
import { Post } from '../../models/post';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-post-navigation',
  templateUrl: './post-navigation.component.html',
  styleUrls: ['./post-navigation.component.scss'],
})
export class PostNavigationComponent {
  public adjacentPosts = this.fetchAdjacentPosts();

  constructor(
    private readonly router: Router,
    private readonly blogService: BlogService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  public navigateToPost(post: Post): void {
    const filePath = post.filePath.replace('/assets/posts', '');
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
      mergeMap((post: Post) =>
        this.blogService
          .getPosts(post.category, 'all')
          .pipe(map((posts: Post[]) => this.selectAdjacentPosts(post, posts)))
      )
    );
  }

  private selectAdjacentPosts(
    post: Post,
    posts: Post[]
  ): Map<string, Post | undefined> {
    const index = posts.indexOf(post);
    return new Map([
      [
        'previousPost',
        index > 0 && posts.length > index - 1 ? posts[index - 1] : undefined,
      ],
      ['upcomingPost', posts.length > index + 1 ? posts[index + 1] : undefined],
    ]);
  }
}
