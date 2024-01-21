import { TestBed } from '@angular/core/testing';
import {
  ENGINEERING_POSTS,
  RXJS_RELATED_POSTS,
} from 'src/app/helpers/post-mocks';
import { BlogService } from './blog.service';

const compileComponent = (): void => {
  TestBed.configureTestingModule({
    teardown: { destroyAfterEach: false },
  }).compileComponents();
};

describe('BlogService', () => {
  let service: BlogService;

  beforeEach(() => {
    compileComponent();
    service = TestBed.inject(BlogService);
  });

  it('should create an BlogService instance', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all posts belonging to the productivity category', () => {
    service
      .getPosts('engineering', 'all')
      .subscribe(result => expect(result).toEqual(ENGINEERING_POSTS));
  });

  it('should only retrieve posts about RxJS', () => {
    service
      .getPosts('course', 'RxJS')
      .subscribe(result => expect(result).toEqual(RXJS_RELATED_POSTS));
  });
});
