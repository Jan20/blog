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
import { ENGINEERING_POSTS } from 'src/app/helpers/post-mocks';

let component: PostNavigationComponent;
let fixture: ComponentFixture<PostNavigationComponent>;

const activatedRoute = jasmine.createSpyObj('ActivatedRoute', [
  'paramMap',
  'snapshot',
]);
activatedRoute.paramMap = of('test/route/34');

const blogService = jasmine.createSpyObj<BlogService>('BlogService', [
  'getPost',
  'getPosts',
]);
blogService.getPost.and.returnValue(of(ENGINEERING_POSTS[0]));
blogService.getPosts.and.returnValue(of(ENGINEERING_POSTS));

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
