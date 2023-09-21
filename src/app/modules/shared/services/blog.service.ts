import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models/post';
import { PostCollection } from '../models/postCollection';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private readonly postCollection: PostCollection) {}

  public getPosts(category: string, series: string): Observable<Post[]> {
    if (series === 'all') {
      return this.postCollection
        .selectPosts(category)
        .pipe(map(posts => posts.sort(this.sortByDate)));
    }

    if (series === 'misc') {
      return this.postCollection.selectPosts(category).pipe(
        map(posts => posts.filter((post: Post) => post.series === '')),
        map(posts => posts.sort(this.sortByDate))
      );
    }

    return this.postCollection.selectPosts(category).pipe(
      map(posts => posts.filter((post: Post) => post.series === series)),
      map(posts => posts.sort(this.sortByDate))
    );
  }

  public getSeriesTitles(category: string): Observable<Set<string>> {
    return this.getPosts(category, 'all').pipe(
      map((posts: Post[]) => posts.map(post => post.series)),
      map(seriesTitle => seriesTitle.filter(seriesTitle => seriesTitle != '')),
      map(seriesTitle => new Set(seriesTitle))
    );
  }

  public getPostBySeriesSection(
    category: string,
    series: string,
    section: number
  ): Observable<Post> {
    return this.getPosts(category, series).pipe(
      map(posts => posts.filter(post => post.seriesSection === section)[0])
    );
  }

  public getPost(category: string, id: string): Observable<Post> {
    return this.postCollection
      .selectPosts(category)
      .pipe(
        map(
          (posts: Post[]) =>
            posts.filter((post: Post) => post.link.includes(id))[0]
        )
      );
  }

  private sortByDate(post1: Post, post2: Post): number {
    return new Date(post2.date).getTime() - new Date(post1.date).getTime();
  }
}
