import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, TitleStrategy } from '@angular/router';
import { Observable, map, mergeMap, tap, timer } from 'rxjs';
import { Post } from '../../modules/shared/models/post';
import { BlogService } from '../../modules/shared/services/blog.service';
import { CommonModule } from '@angular/common';
import {
  MarkdownModule,
  MarkdownComponent,
  provideMarkdown,
} from 'ngx-markdown';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { PostNavigationComponent } from '../post-navigation/post-navigation.component';
import { SeriesNavigationComponent } from '../series-navigation/series-navigation.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MarkdownModule,
    PostNavigationComponent,
    SeriesNavigationComponent,
    MarkdownModule,
    CommonModule,
    MarkdownComponent,
  ],
  providers: [provideMarkdown()],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit {
  post: Observable<Post> = this.fetchPost();
  @ViewChild('targetElement') targetElement: ElementRef | undefined;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly blogservice: BlogService,
    private readonly router: Router,
    private readonly titleService: Title,
    private readonly metaService: Meta,
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event: Object) => {
      if (!this.targetElement) return;
      if (event instanceof NavigationEnd) {
        this.targetElement.nativeElement.scrollIntoView({ block: 'start' });
      }
    });
  }

  private fetchPost(): Observable<Post> {
    return this.activatedRoute.paramMap.pipe(
      map(() => this.router.url.split('/')),
      mergeMap((route: string[]) =>
        this.blogservice.getPost(route[1], route[2])
      ),
      tap((post: Post) => this.titleService.setTitle(post.headline)),
      tap((post: Post) => this.metaService.updateTag({ name: 'description', content: post.summary }) )
    );
  }
}
