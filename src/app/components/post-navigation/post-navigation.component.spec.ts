import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { MarkdownModule } from 'ngx-markdown';
import { BehaviorSubject, of } from 'rxjs';
import { ENGINEERING_POSTS } from 'src/app/helpers/post-mocks';
import { BlogService } from '../../modules/shared/services/blog.service';
import { PostNavigationComponent } from './post-navigation.component';

import '@testing-library/jasmine-dom';

let component: PostNavigationComponent;
let fixture: ComponentFixture<PostNavigationComponent>;

const router = jasmine.createSpyObj('Router', ['navigate']);
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
router.navigate.and.returnValue(Promise.resolve(true));
router.url = '/engineering/task-management';
router.events = new BehaviorSubject(new NavigationEnd(0, '', ''));

const activatedRoute = jasmine.createSpyObj('ActivatedRoute', [
  'paramMap',
  'snapshot',
]);
activatedRoute.paramMap = of('/engineering/task-management');

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
    imports: [CommonModule,
        RouterModule,
        PostNavigationComponent,
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatRippleModule,
        MarkdownModule,
        NoopAnimationsModule,
        MatGridListModule],
    providers: [
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: BlogService, useValue: blogService },
        { provide: ComponentFixtureAutoDetect, useValue: true },
        provideHttpClient(withInterceptorsFromDi()),
    ]
}).compileComponents();
};

describe('PostNavigationComponent', () => {
  beforeEach(async () => {
    compileComponent();
    fixture = TestBed.createComponent(PostNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a post navigation component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the staying focused post', fakeAsync(() => {
    userEvent.click(screen.getByRole('heading', { name: 'Staying Focused' }));
    tick(1);
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith([
      '/engineering/staying-focused',
    ]);
  }));
});
