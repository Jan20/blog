import { Routes } from '@angular/router';
import { PostComponent } from '../shared/components/post/post.component';
import { EngineeringComponent } from './engineering/engineering.component';

export const engineeringRoutes: Routes = [
  {
    path: '',
    component: EngineeringComponent,
    data: { title: 'Engineering' },
  },
  {
    path: ':topic/:id',
    component: PostComponent,
    data: { title: 'Engineering' },
  },
];