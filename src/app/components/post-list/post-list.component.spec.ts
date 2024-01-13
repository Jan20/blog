import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Post } from 'src/app/modules/shared/models/post';
import { PostListComponent } from './post-list.component';

let component: PostListComponent;
let hostComponent: HostComponent;
let hostFixture: ComponentFixture<HostComponent>;

export const engineering: Post[] = [
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
      RouterTestingModule,
      NoopAnimationsModule,
      MatIconModule,
      MatMenuModule,
      MatCardModule,
      MatGridListModule,
      PostListComponent,
      RouterTestingModule,
    ],
    teardown: { destroyAfterEach: false },
  }).compileComponents();
};

describe('PostListComponent:', () => {
  let router: Router;

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

  // it('should set the number of columns being displayed to 4', fakeAsync(() => {
  //   Object.defineProperty(window, 'innerWidth', { value: 1800 });
  //   window.dispatchEvent(new Event('resize'));
  //   tick(1);
  // }));

  // it('should decrease the number of columns being displayed to 3', fakeAsync(() => {
  //   Object.defineProperty(window, 'innerWidth', { value: 1799 });
  //   window.dispatchEvent(new Event('resize'));
  //   tick(1);
  // }));

  // it('should decrease the number of columns being displayed to 2', fakeAsync(() => {
  //   Object.defineProperty(window, 'innerWidth', { value: 1199 });
  //   window.dispatchEvent(new Event('resize'));
  //   tick(1);
  // }));

  // it('should decrease the number of columns being displayed to 1', fakeAsync(() => {
  //   Object.defineProperty(window, 'innerWidth', { value: 799 });
  //   window.dispatchEvent(new Event('resize'));
  //   tick(1);
  // }));

  // it('should select the RxJS topic', () => {
  //   component.selectTopic('RxJS');
  //   expect(router.navigate).toHaveBeenCalledWith([`blog/guides/RxJS`]);
  // });
});
