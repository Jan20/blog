import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
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
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent {
  public readonly posts: Observable<Post[]> = this.fetchPosts();

  @Input() public category!: string;
  @Input() public series: string = 'misc';

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly blogService: BlogService,
    private readonly router: Router
  ) { }

  public showPost(post: Post): void {
    const filePath = post.link.replace('/assets/posts', '');
    const id = filePath.split('/')[2].substring(4);
    this.router.navigate([`${this.category}/${post.topic}/${id}`]);
  }

  private fetchPosts(): Observable<Post[]> {
    return this.activatedRoute.paramMap.pipe(
      switchMap(() => this.blogService.getPosts(this.category, this.series))
    );
  }
}
