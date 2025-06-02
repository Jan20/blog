import { TestBed } from '@angular/core/testing';
import { BlogService } from './blog.service';
import {
  ENGINEERING_POSTS,
  MISCELLANEOUS_GUIDES,
  DOCKER_GUIDES,
} from 'src/app/helpers/post-mocks';

let service: BlogService;

const compileComponent = (): void => {
  TestBed.configureTestingModule({
    teardown: { destroyAfterEach: false },
  }).compileComponents();
};

describe('BlogService:', () => {
  beforeEach(() => {
    compileComponent();
    service = TestBed.inject(BlogService);
  });

  describe('create:', () => {
    it('should create an BlogService instance', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('getPosts:', () => {
    it('should retrieve miscellaneous guide posts', () => {
      service
        .getPosts('guides', 'misc')
        .subscribe(result => expect(result).toEqual(MISCELLANEOUS_GUIDES));
    });

    it('should retrieve Docker-related guide posts', () => {
      service
        .getPosts('guides', 'Docker')
        .subscribe(result => expect(result).toEqual(DOCKER_GUIDES));
    });
  });

  describe('getSeriesTitles:', () => {
    it('should return all series titles in the guides category', () => {
      service
        .getSeriesTitles('guides')
        .subscribe(result => expect(result).toEqual(new Set(['Docker'])));
    });
  });

  describe('getPostBySeriesSection:', () => {
    it('should select a post by its position in a series', () => {
      service
        .getPostBySeriesSection('guides', 'Docker', 2)
        .subscribe(result => expect(result).toEqual(DOCKER_GUIDES[3]));
    });
  });

  describe('getPost:', () => {
    it('should select the task managment post', () => {
      service
        .getPost('engineering', 'task-management')
        .subscribe(result => expect(result).toEqual(ENGINEERING_POSTS[1]));
    });
  });
});
