import { Routes } from '@angular/router';
import { PostComponent } from '../shared/components/post/post.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';

export const recommendationsRoutes: Routes = [
  {
    path: '',
    component: RecommendationsComponent,
    data: { title: 'Recommendations' },
  },
  {
    path: ':id',
    component: PostComponent,
    data: { title: 'Recommendation' },
  },
];
