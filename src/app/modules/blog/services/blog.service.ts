import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { PostCollection } from '../models/postCollection';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private readonly postCollection: PostCollection) {}

  getPosts(category: string, topic?: string): Post[] {
    const posts: Post[] = this.postCollection.selectPosts(category);
    return topic !== 'All'
      ? posts.filter((post: Post) => post.topic === topic)
      : posts;
  }

  getTopics(category: string): Set<string> {
    const posts: Post[] = this.postCollection.selectPosts(category);
    const topics: string[] = posts.map(post => post.topic);
    return new Set(topics);
  }

  getSeriesTitles(): Set<string> {
    const posts: Post[] = this.postCollection.selectPosts('guides');
    const topics: string[] = posts
      .map(post => post.series)
      .filter(title => title != '');
    return new Set(topics);
  }

  getSeries(series: string): Post[] {
    const posts: Post[] = this.postCollection.selectPosts('guides');
    return posts.filter((post: Post) => post.series === series);
  }

  getSectionCount(series: string): number {
    return this.getSeries(series).length;
  }

  getPostBySeriesSection(series: string, section: number): Post {
    return this.getSeries(series).find(
      posts => posts.seriesSection === section
    )!;
  }
}
