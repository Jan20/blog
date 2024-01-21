import { Component } from '@angular/core';
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Post } from 'src/app/modules/shared/models/post';
import { PostListComponent } from './post-list.component';
import { of } from 'rxjs';
import { BlogService } from 'src/app/modules/shared/services/blog.service';

let component: PostListComponent;
let hostComponent: HostComponent;
let hostFixture: ComponentFixture<HostComponent>;

export const POSTS: Post[] = [
  new Post(
    '205-task-management',
    'Efficiency',
    'Efficient Task Management',
    'Describes an effective task management system for getting stuff done.',
    '/engineering/205-task-management/205-task-management.md',
    'assets/posts/engineering/205-task-management/thumbnail.svg',
    '2023-02-04',
    '/engineering/task-management'
  ),
  new Post(
    '204-staying-focus',
    'Focus',
    'Staying Focused',
    'This post will share five simple strategies to become less distracted and stay focused.',
    '/engineering/204-staying-focus/204-staying-focused.md',
    'assets/posts/engineering/204-staying-focus/thumbnail.svg',
    '2022-10-11',
    '/engineering/staying-focus'
  ),
];

const router = jasmine.createSpyObj<Router>('Router', ['navigate']);
router.navigate.and.returnValue(Promise.resolve(true));

const activatedRoute = jasmine.createSpyObj('ActivatedRoute', [
  'paramMap',
  'snapshot',
]);
activatedRoute.paramMap = of('/engineering');

const blogService = jasmine.createSpyObj('BlogService', [
  'getPost',
  'getPosts',
]);
blogService.getPost.and.returnValue(of(POSTS[0]));
blogService.getPosts.and.returnValue(of(POSTS));

@Component({
  selector: 'host-component',
  template:
    'asdf <app-post-list category="course" series="misc"></app-post-list>',
})
class HostComponent {}

const compileComponent = (): void => {
  TestBed.configureTestingModule({
    declarations: [HostComponent],
    imports: [
      NoopAnimationsModule,
      MatIconModule,
      MatMenuModule,
      MatCardModule,
      MatGridListModule,
      PostListComponent,
      RouterTestingModule,
    ],
    providers: [
      { provide: ActivatedRoute, useValue: activatedRoute },
      { provide: Router, useValue: router },
      { provide: BlogService, useValue: blogService },
      { provide: ComponentFixtureAutoDetect, useValue: true },
    ],
    teardown: { destroyAfterEach: false },
  }).compileComponents();
};

describe('PostListComponent:', () => {
  beforeEach(async () => {
    await compileComponent();
    hostFixture = TestBed.createComponent(HostComponent);
    hostComponent = hostFixture.componentInstance;
    component = TestBed.createComponent(PostListComponent).componentInstance;
    hostFixture.detectChanges();
  });

  it('should create a blog component', () => {
    expect(component).toBeTruthy();
  });

  it('should select the "task management" post', () => {
    component.showPost(POSTS[0]);
    expect(router.navigate).toHaveBeenCalledWith([
      `/engineering/task-management`,
    ]);
  });
});
