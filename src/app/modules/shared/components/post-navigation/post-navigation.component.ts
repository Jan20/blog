import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Post } from '../../models/post';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-post-navigation',
  templateUrl: './post-navigation.component.html',
  styleUrls: ['./post-navigation.component.scss'],
})
export class PostNavigationComponent {
  @Input() public post: Post = new Post();
  public adjacentPosts = this.fetchAdjacentPosts();

  constructor(
    private readonly router: Router,
    private readonly blogService: BlogService
  ) {}

  public navigateToPost(post: Post): void {
    this.router.navigate([`${post.route}`]);
  }

  private fetchAdjacentPosts(): Observable<Map<string, Post | undefined>> {
    return this.blogService
      .getPosts(this.post.category, 'all')
      .pipe(map((posts: Post[]) => this.selectAdjacentPosts(this.post, posts)));
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
