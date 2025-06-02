import { CommonModule } from '@angular/common';
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MarkdownComponent, MarkdownModule } from 'ngx-markdown';
import { BehaviorSubject, of } from 'rxjs';
import { ENGINEERING_POSTS } from '../../helpers/post-mocks';
import { BlogService } from '../../modules/shared/services/blog.service';
import { PostNavigationComponent } from '../post-navigation/post-navigation.component';
import { SeriesNavigationComponent } from '../series-navigation/series-navigation.component';
import { PostComponent } from './post.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

let component: PostComponent;
let fixture: ComponentFixture<PostComponent>;

const activatedRoute = jasmine.createSpyObj('ActivatedRoute', [
  'paramMap',
  'snapshot',
]);
activatedRoute.paramMap = of('/engineering/task-management');

const router = jasmine.createSpyObj('Router', ['navigate', 'parseUrl']);
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
router.navigate.and.returnValue(Promise.resolve(true));
router.url = '/engineering/task-management';
router.events = new BehaviorSubject(new NavigationEnd(0, '', ''));

const blogService = jasmine.createSpyObj<BlogService>('BlogService', [
  'getPost',
  'getPosts',
]);
blogService.getPost.and.returnValue(of(ENGINEERING_POSTS[0]));
blogService.getPosts.and.returnValue(of(ENGINEERING_POSTS));

const compileComponent = (): void => {
  TestBed.configureTestingModule({
    declarations: [],
    teardown: { destroyAfterEach: false },
    imports: [
      PostComponent,
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
    providers: [
      { provide: ActivatedRoute, useValue: activatedRoute },
      { provide: BlogService, useValue: blogService },
      { provide: Router, useValue: router },
      { provide: ComponentFixtureAutoDetect, useValue: true },
      provideHttpClient(withInterceptorsFromDi()),
    ],
  }).compileComponents();
};

describe('PostComponent:', () => {
  beforeEach(async () => {
    blogService.getPost.calls.reset();
    compileComponent();
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a post component', () => {
    expect(component).toBeTruthy();
  });

  it("should call the blog service a post's category and id extracted from the router's URL", () => {
    expect(blogService.getPost).toHaveBeenCalledOnceWith(
      'engineering',
      'task-management'
    );
  });
});
