import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Post } from '../../models/post';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  public title: string = 'Guides';
  public posts: Observable<Post[]> = this.blogService.getPosts();

  constructor(
    private readonly blogService: BlogService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.posts);
  }

  public changeView(link: string): void {
    this.router.navigate([`blog/${link}`]);
  }
}
