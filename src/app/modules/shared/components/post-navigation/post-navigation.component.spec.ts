import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { Post } from '../../models/post';
import { BlogService } from '../../services/blog.service';
import { PostNavigationComponent } from './post-navigation.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MarkdownModule } from 'ngx-markdown';

let component: PostNavigationComponent;
let fixture: ComponentFixture<PostNavigationComponent>;

const posts: Post[] = [
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

const activatedRoute = jasmine.createSpyObj('ActivatedRoute', [
  'paramMap',
  'snapshot',
]);
activatedRoute.paramMap = of('test/route/34');

const blogService = jasmine.createSpyObj('BlogService', [
  'getPost',
  'getPosts',
]);
blogService.getPost.and.returnValue(of(posts[0]));
blogService.getPosts.and.returnValue(of(posts));

const compileComponent = (): void => {
  TestBed.configureTestingModule({
    declarations: [PostNavigationComponent],
    imports: [
      CommonModule,
      HttpClientModule,
      MatCardModule,
      MatMenuModule,
      MatButtonModule,
      MatIconModule,
      MatRippleModule,
      MarkdownModule,
    ],
    providers: [
      { provide: ActivatedRoute, useValue: activatedRoute },
      { provide: BlogService, useValue: blogService },
    ],
    teardown: { destroyAfterEach: false },
  }).compileComponents();
};

describe('PostNavigationComponent', () => {
  beforeEach(async () => {
    compileComponent();
    fixture = TestBed.createComponent(PostNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
