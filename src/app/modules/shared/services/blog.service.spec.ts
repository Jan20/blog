import { TestBed } from '@angular/core/testing';
import { PRODUCTIVITY, RXJS_RELATED_POSTS } from 'src/app/helpers/post-mocks';
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
      .getPosts('productivity', '')
      .subscribe(result => expect(result).toEqual(PRODUCTIVITY));
  });

  it('should only retrieve posts about RxJS', () => {
    service
      .getPosts('guides', 'RxJS')
      .subscribe(result => expect(result).toEqual(RXJS_RELATED_POSTS));
  });
});
