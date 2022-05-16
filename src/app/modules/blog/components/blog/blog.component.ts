import { Component, HostListener, OnInit } from '@angular/core';
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
  public postsInRow: number = 3;

  constructor(
    private readonly blogService: BlogService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    if (window.innerWidth < 1000) {
      this.postsInRow = 1;
    }
  }


  @HostListener('window:resize', ['$event'])
  public onResize(event: { target: { innerWidth: number; }; }): void {
    if (event.target.innerWidth < 1000) {
      this.postsInRow = 1;
      return;
    }
    this.postsInRow = 3;
  }

  public changeView(link: string): void {
    this.router.navigate([`blog/${link}`]);
  }
}
