import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationsComponent } from './recommendations.component';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { MarkdownModule } from 'ngx-markdown';
import { of } from 'rxjs';
import { PageTitleComponent } from 'src/app/components/page-title/page-title.component';
import { PostListComponent } from 'src/app/components/post-list/post-list.component';
import { Post } from '../../shared/models/post';
import { BlogService } from '../../shared/services/blog.service';

let component: RecommendationsComponent;
let fixture: ComponentFixture<RecommendationsComponent>;

const POSTS: Post[] = [
  new Post(
    '205-task-management',
    'Efficiency',
    'Efficient Task Management',
    'Describes an effective task management system for getting stuff done.',
    '/engineering/205-task-management/205-task-management.md',
    'assets/posts/engineering/205-task-management/thumbnail.svg',
    '2023-02-04',
    '/Users/jan/Developer/blog/src/assets/posts/engineering/205-task-management/205-task-management.md'
  ),
  new Post(
    '204-staying-focus',
    'Focus',
    'Staying Focused',
    'This post will share five simple strategies to become less distracted and stay focused.',
    '/engineering/204-staying-focus/204-staying-focused.md',
    'assets/posts/engineering/204-staying-focus/thumbnail.svg',
    '2022-10-11',
    '/Users/jan/Developer/blog/src/assets/posts/engineering/204-staying-focus/204-staying-focused.md'
  ),
];

const blogService = jasmine.createSpyObj<BlogService>('BlogService', [
  'getSeriesTitles',
  'getPosts',
  'getPost',
]);
blogService.getSeriesTitles.and.returnValue(of(new Set(['Test Entry'])));
blogService.getPost.and.returnValue(of(POSTS[0]));
blogService.getPosts.and.returnValue(of(POSTS));

const compileComponent = (): void => {
  TestBed.configureTestingModule({
    declarations: [RecommendationsComponent],
    teardown: { destroyAfterEach: false },
    imports: [CommonModule,
        PostListComponent,
        PageTitleComponent,
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatCardModule,
        MatGridListModule,
        PostListComponent,
        MatIconModule,
        MatRippleModule,
        RouterTestingModule,
        MarkdownModule],
    providers: [{ provide: BlogService, useValue: blogService }, provideHttpClient(withInterceptorsFromDi())]
}).compileComponents();
};

describe('RecommendationsComponent', () => {
  beforeEach(async () => {
    compileComponent();

    fixture = TestBed.createComponent(RecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
