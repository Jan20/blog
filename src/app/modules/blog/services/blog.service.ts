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
    let posts: Post[] = [];
    switch (category) {
      case 'guides': posts = guides; break;
      case 'reviews': posts = reviews; break;
      case 'productivity': posts = productivity; break;
      default: posts = guides;
    }
    return topic ? posts.filter((post: Post) => post.topic === topic) : posts;
  }
}
