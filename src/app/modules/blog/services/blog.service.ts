import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { PostCollection } from '../models/postCollection';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private readonly postCollection: PostCollection) {}

  public getPosts(category: string, topic?: string): Post[] {
    const posts: Post[] = this.postCollection.selectPosts(category);
    return topic !== 'All'
      ? posts.filter((post: Post) => post.topic === topic)
      : posts;
  }

  public getTopics(category: string): Set<string> {
    const posts: Post[] = this.postCollection.selectPosts(category);
    const topics: string[] = posts.map(post => post.topic);
    return new Set(topics);
  }

  public getSeriesTitles(): Set<string> {
    const posts: Post[] = this.postCollection.selectPosts('guides');
    const topics: string[] = posts
      .map(post => post.series)
      .filter(title => title != '');
    return new Set(topics);
  }

  public getSeries(series: string): Post[] {
    const posts: Post[] = this.postCollection.selectPosts('guides');
    return posts.filter((post: Post) => post.series === series);
  }

  public getSectionCount(series: string): number {
    return this.getSeries(series).length;
  }

  public getPostBySeriesSection(series: string, section: number): Post {
    return this.getSeries(series).find(
      posts => posts.seriesSection === section
    )!;
  }
}
