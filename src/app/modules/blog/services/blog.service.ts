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
    topic = topic !== 'All' ? topic : undefined;
    return topic ? posts.filter((post: Post) => post.topic === topic) : posts;
  }

  getTopics(category: string): Set<string> {
    const posts: Post[] = this.postCollection.selectPosts(category);
    const topics: string[] = posts.map((post) => post.topic);
    return new Set(topics);
  }
}
