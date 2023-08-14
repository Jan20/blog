import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { recommendationsRoutes } from './recommendations.routing';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { PageTitleComponent } from '../shared/components/page-title/page-title.component';

@NgModule({
  declarations: [RecommendationsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    RouterModule.forChild(recommendationsRoutes),
    PageTitleComponent,
    SharedModule,
  ],
})
export class RecommendationsModule { }
