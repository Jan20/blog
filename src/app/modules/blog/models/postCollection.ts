import { Injectable } from '@angular/core';
import { guides } from 'src/assets/posts/guides/guides';
import { productivity } from 'src/assets/posts/productivity/productivity';
import { reviews } from 'src/assets/posts/reviews/reviews';
import { Post } from './post';

@Injectable({
  providedIn: 'root',
})
export class PostCollection {
  selectPosts(category: string): Post[] {
    switch (category) {
      case 'guides':
        return guides;
      case 'reviews':
        return reviews;
      case 'productivity':
        return productivity;
      default:
        return [];
    }
  }
}
