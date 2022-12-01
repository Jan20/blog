import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Post } from '../../models/post';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  styles: ['h2 { color: red !important; }'],
})
export class PostComponent {
  public post: Observable<Post> = this.fetchPost();
  public sectionCount: number = 0;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly blogservice: BlogService,
    private readonly router: Router
  ) {}

  public navigateToPost(series: string, section: number): void {
    if (section === 0) return;
    const post = this.blogservice.getPostBySeriesSection(series, section);
    this.router.navigate([`blog${post.link.replace('/assets/posts', '')}`]);
  }

  private fetchPost(): Observable<Post> {
    return this.activatedRoute.params.pipe(
      map((params: Params) => this.filterPosts(params))
    );
  }

  private filterPosts(params: Params): Post {
    const posts = this.blogservice.getPosts(params['category'], 'All');
    const filteredPost = posts.filter((post: Post) =>
      post.link.includes(params['number'])
    )[0];
    if (filteredPost.seriesSection)
      this.sectionCount = this.blogservice.getSectionCount(filteredPost.series);
    return filteredPost;
  }
}
