import { TestBed } from '@angular/core/testing';
import { GUIDES, PRODUCTIVITY, RXJS_RELATED_POSTS } from 'src/app/helpers/post-mocks';
import { Post } from '../models/post';
import { PostCollection } from '../models/postCollection';
import { BlogService } from './blog.service';


const postCollection = jasmine.createSpyObj('PostCollection', ['selectPosts']);
postCollection.selectPosts.withArgs('guides').and.returnValue(GUIDES)
postCollection.selectPosts.withArgs('productivity').and.returnValue(PRODUCTIVITY)

const compileComponent = () => {
  TestBed.configureTestingModule({
      providers: [
        { provide: PostCollection, useValue: postCollection }
      ],
      teardown: { destroyAfterEach: false }
  }).compileComponents();
}

describe('BlogService', () => {
  let service: BlogService;

  beforeEach(() => {
    compileComponent();
    service = TestBed.inject(BlogService);
  });

  it('should create an BlogService instance', () => {
    expect(service).toBeTruthy();
  });

  fit('should retrieve all posts belonging to the productivity category', () => {
    const result: Post[] = service.getPosts('productivity')
    expect(result).toEqual(PRODUCTIVITY)
  });

  it('should only retrieve posts about RxJS', () => {
    const result: Post[] = service.getPosts('guides', 'RxJS')
    expect(result).toEqual(RXJS_RELATED_POSTS)
  });

  it('should return all topics belonging to "guides" category', () => {
    const result: Set<string> = service.getTopics('guides');
    const topcis: string[] = ['Git', 'Docker', 'RxJS', 'Python', 'Angular'];
    expect(result).toEqual(new Set<string>(topcis));
  });
});
