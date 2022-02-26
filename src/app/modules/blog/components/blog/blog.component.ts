import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../models/post';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  title: string = 'Guides'
  posts: Post[] = []

  constructor(
    private blogService: BlogService,
    private router: Router
  ) { }

  ngOnInit() {
    this.blogService.fetchPosts()
    this.blogService.postsSubject.subscribe((posts: Post[]) => {
      this.posts = posts
      this.posts.forEach((post, index) => {
        this.posts[index].firstParagraph = post.firstParagraph.replace('**.', '.').replace('**', '')
      })
    })
  }

  public changeView(link: string): void {
    console.log(link)
    this.router.navigate([link]);
  }
}
