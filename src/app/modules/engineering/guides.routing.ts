import { Routes } from '@angular/router';
import { PostComponent } from '../../components/post/post.component';
import { EngineeringComponent } from './engineering/engineering.component';

export const engineeringRoutes: Routes = [
  {
    path: '',
    component: EngineeringComponent,
    data: { title: 'Engineering' },
  },
  {
    path: ':id',
    component: PostComponent,
    data: { title: 'Engineering' },
  },
];
