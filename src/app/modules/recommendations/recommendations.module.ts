import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { recommendationsRoutes } from './recommendations.routing';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [RecommendationsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    RouterModule.forChild(recommendationsRoutes),
    SharedModule,
  ],
})
export class RecommendationsModule {}
