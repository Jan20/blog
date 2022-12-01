import { Injectable } from '@angular/core';
import { guides } from 'src/assets/posts/guides/guides';
import { productivity } from 'src/assets/posts/productivity/productivity';
import { Post } from './post';

@Injectable({
  providedIn: 'root',
})
export class PostCollection {
  selectPosts(category: string): Post[] {
    switch (category) {
      case 'guides':
        return guides;
      case 'productivity':
        return productivity;
      default:
        return [];
    }
  }
}
