import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  public markdownSource: string = './assets/posts/post_001.md'

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.markdownSource = `./assets/posts/${params['category']}/${params['id']}`
    })
  }

  ngOnInit() { }
}
