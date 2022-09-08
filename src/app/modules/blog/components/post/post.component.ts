import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  public markdownSource = this.fetchPost();

  constructor(private readonly activatedRoute: ActivatedRoute) {}

  private fetchPost(): Observable<string> {
    return this.activatedRoute.params.pipe(
      map(
        params =>
          `./assets/posts/${params['category']}/${params['number']}/${params['id']}`
      )
    );
  }
}
