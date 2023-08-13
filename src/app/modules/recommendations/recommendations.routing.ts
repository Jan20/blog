import { Routes } from '@angular/router';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { PostComponent } from '../shared/components/post/post.component';

export const recommendationsRoutes: Routes = [
  {
    path: '',
    component: RecommendationsComponent,
    data: { title: 'Recommendations' },
  },
  {
    path: ':topic/:id',
    component: PostComponent,
    data: { title: 'Recommendation' },
  },
];
