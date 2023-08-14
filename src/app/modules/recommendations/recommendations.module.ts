import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { PostListComponent } from 'src/app/components/post-list/post-list.component';
import { PageTitleComponent } from '../../components/page-title/page-title.component';
import { SharedModule } from '../shared/shared.module';
import { recommendationsRoutes } from './recommendations.routing';
import { RecommendationsComponent } from './recommendations/recommendations.component';

@NgModule({
  declarations: [RecommendationsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    RouterModule.forChild(recommendationsRoutes),
    PageTitleComponent,
    SharedModule,
    PostListComponent,
  ],
})
export class RecommendationsModule { }
