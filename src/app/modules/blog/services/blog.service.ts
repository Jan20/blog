import { Injectable } from '@angular/core';
import { guides } from 'src/assets/posts/guides/guides';
import { productivity } from 'src/assets/posts/productivity/productivity';
import { reviews } from 'src/assets/posts/reviews/reviews';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  public getPosts(category: string, topic?: string): Post[] {
    const posts: Post[] = this.fetchPosts(category);
    return topic ? posts.filter((post: Post) => post.topic === topic) : posts;
  }

  public getTopics(category: string): string[] {
    const posts: Post[] = this.fetchPosts(category);
    return posts.map((post) => post.topic);
  }

  private fetchPosts(category: string): Post[] {
    switch (category) {
      case 'guides': return guides;
      case 'reviews': return reviews;
      case 'productivity': return productivity;
      default: return [];
    }
  }
}
