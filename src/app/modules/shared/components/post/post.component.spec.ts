import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { of } from 'rxjs';
import { ENGINEERING_POSTS } from 'src/app/helpers/post-mocks';
import { BlogService } from '../../services/blog.service';
import { PostNavigationComponent } from '../post-navigation/post-navigation.component';
import { PostComponent } from './post.component';

let component: PostComponent;
let fixture: ComponentFixture<PostComponent>;

const activatedRoute = jasmine.createSpyObj('ActivatedRoute', [
  'paramMap',
  'snapshot',
]);
activatedRoute.paramMap = of('/engineering/task-management');

const router = jasmine.createSpyObj('Router', ['navigate']);
router.navigate.and.returnValue(Promise.resolve(true));
router.url = '/engineering/task-management';

const blogService = jasmine.createSpyObj('BlogService', [
  'getPost',
  'getPosts',
]);
blogService.getPost.and.returnValue(of(ENGINEERING_POSTS[0]));
blogService.getPosts.and.returnValue(of(ENGINEERING_POSTS));

const compileComponent = (): void => {
  TestBed.configureTestingModule({
    declarations: [PostComponent, PostNavigationComponent],
    imports: [
      HttpClientModule,
      MatIconModule,
      MatMenuModule,
      MatCardModule,
      MatButtonModule,
      MarkdownModule.forRoot({
        markedOptions: {
          provide: MarkedOptions,
          useValue: {
            gfm: true,
            breaks: false,
            pedantic: false,
            smartLists: true,
            smartypants: false,
          },
        },
      }),
    ],
    providers: [
      { provide: ActivatedRoute, useValue: activatedRoute },
      { provide: BlogService, useValue: blogService },
      { provide: Router, useValue: router },
      { provide: ComponentFixtureAutoDetect, useValue: true },
    ],
    teardown: { destroyAfterEach: false },
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
