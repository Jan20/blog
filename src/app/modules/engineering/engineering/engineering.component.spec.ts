import { CommonModule } from '@angular/common';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { MarkdownModule } from 'ngx-markdown';
import { of } from 'rxjs';
import { BlogService } from '../../shared/services/blog.service';
import { EngineeringComponent } from './engineering.component';
import { PageTitleComponent } from 'src/app/components/page-title/page-title.component';
import { PostListComponent } from 'src/app/components/post-list/post-list.component';
import { ENGINEERING_POSTS } from 'src/app/helpers/post-mocks';

let component: EngineeringComponent;
let fixture: ComponentFixture<EngineeringComponent>;

const blogService = jasmine.createSpyObj<BlogService>('BlogService', [
  'getSeriesTitles',
  'getPosts',
  'getPost',
]);
blogService.getSeriesTitles.and.returnValue(of(new Set(['Test Entry'])));
blogService.getPost.and.returnValue(of(ENGINEERING_POSTS[0]));
blogService.getPosts.and.returnValue(of(ENGINEERING_POSTS));

const compileComponent = (): void => {
  TestBed.configureTestingModule({
    teardown: { destroyAfterEach: false },
    imports: [
        CommonModule,
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
        MarkdownModule,
        EngineeringComponent,
    ],
    providers: [
        { provide: BlogService, useValue: blogService },
        provideHttpClient(withInterceptorsFromDi()),
    ],
}).compileComponents();
};

describe('EngineeringComponent', () => {
  beforeEach(async () => {
    compileComponent();
    fixture = TestBed.createComponent(EngineeringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
