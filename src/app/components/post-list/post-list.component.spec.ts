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
import { of } from 'rxjs';
import { ENGINEERING_POSTS } from 'src/app/helpers/post-mocks';
import { BlogService } from 'src/app/modules/shared/services/blog.service';
import { PostListComponent } from './post-list.component';

let component: PostListComponent;
let hostComponent: HostComponent;
let hostFixture: ComponentFixture<HostComponent>;

const router = jasmine.createSpyObj<Router>('Router', ['navigate']);
router.navigate.and.returnValue(Promise.resolve(true));

const activatedRoute = jasmine.createSpyObj('ActivatedRoute', [
  'paramMap',
  'snapshot',
]);
activatedRoute.paramMap = of('/engineering');

const blogService = jasmine.createSpyObj<BlogService>('BlogService', [
  'getPost',
  'getPosts',
]);
blogService.getPost.and.returnValue(of(ENGINEERING_POSTS[0]));
blogService.getPosts.and.returnValue(of(ENGINEERING_POSTS));

@Component({
  selector: 'app-host-component',
  template: '<app-post-list category="course" series="misc"></app-post-list>',
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
    component.showPost(ENGINEERING_POSTS[0]);
    expect(router.navigate).toHaveBeenCalledWith([
      `/engineering/task-management`,
    ]);
  });
});
