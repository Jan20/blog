import { CommonModule } from '@angular/common';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
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
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { MarkdownModule } from 'ngx-markdown';
import { BehaviorSubject, of } from 'rxjs';
import { DOCKER_GUIDES } from 'src/app/helpers/post-mocks';
import { BlogService } from '../../modules/shared/services/blog.service';
import { SeriesNavigationComponent } from './series-navigation.component';

let component: SeriesNavigationComponent;
let fixture: ComponentFixture<SeriesNavigationComponent>;

const router = jasmine.createSpyObj('Router', ['navigate']);
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
router.navigate.and.returnValue(Promise.resolve(true));
router.url = '/guides/containerize_flask_applications';
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
blogService.getPost.and.returnValue(of(DOCKER_GUIDES[0]));
blogService.getPosts.and.returnValue(of(DOCKER_GUIDES));

const compileComponent = (): void => {
  TestBed.configureTestingModule({
    declarations: [],
    teardown: { destroyAfterEach: false },
    imports: [
      CommonModule,
      SeriesNavigationComponent,
      MatCardModule,
      MatMenuModule,
      MatButtonModule,
      MatIconModule,
      MatRippleModule,
      MarkdownModule,
      NoopAnimationsModule,
      MatGridListModule,
      RouterTestingModule,
    ],
    providers: [
      { provide: Router, useValue: router },
      { provide: ActivatedRoute, useValue: activatedRoute },
      { provide: BlogService, useValue: blogService },
      { provide: ComponentFixtureAutoDetect, useValue: true },
      provideHttpClient(withInterceptorsFromDi()),
    ],
  }).compileComponents();
};

describe('SeriesNavigationComponent', () => {
  beforeEach(async () => {
    compileComponent();
    fixture = TestBed.createComponent(SeriesNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a series navigation component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the containerize Angular application', fakeAsync(() => {
    expect(
      screen.getByRole('heading', { name: 'Introduction to Docker' })
        .textContent
    ).toBe('Introduction to Docker');
    expect(
      screen.getByRole('heading', { name: 'Containerize Angular Apps' })
        .textContent
    ).toBe('Containerize Angular Apps');
    userEvent.click(
      screen.getByRole('heading', { name: 'Containerize Angular Apps' })
    );
    tick(1);
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith([
      '/guides/containerize_Angular_applications',
    ]);
  }));
});
