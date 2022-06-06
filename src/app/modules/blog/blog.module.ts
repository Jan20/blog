import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatCommonModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { BlogComponent } from './components/blog/blog.component';
import { FilterComponent } from './components/filter/filter.component';
import { PostComponent } from './components/post/post.component';
import { BlogService } from './services/blog.service';

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.code = (text: string) => {
    return '<code class="language-css">' + text + '</code>';
  };

  return {
    renderer: renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
    smartLists: true,
    smartypants: false,
  };
}

@NgModule({
  declarations: [
    BlogComponent,
    PostComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MatCommonModule,
    HttpClientModule,
    MatCardModule,
    MatChipsModule,
    MatGridListModule,
    MatButtonModule,
    RouterModule.forChild([
      { path: '', component: BlogComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'blog/:category', component: BlogComponent },
      { path: 'blog/:category/:number/:id', component: PostComponent, pathMatch: 'full' }
    ]),
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory,
      },
    }),
  ],
  providers: [
    BlogService
  ],
  exports: [
    BlogComponent
  ]
})
export class BlogModule { }
