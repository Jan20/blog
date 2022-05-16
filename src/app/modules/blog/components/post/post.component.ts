import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  public markdownSource: string = ''

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe(params => {
      const url = `./assets/posts/${params['category']}/${params['number']}/${params['id']}`;
      this.markdownSource = url;
    })
  }

  ngOnInit() { }
}
