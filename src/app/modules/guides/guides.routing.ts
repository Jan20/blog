import { Routes } from '@angular/router';
import { PostComponent } from '../shared/components/post/post.component';
import { GuidesComponent } from './guides/guides.component';

export const guidesRoutes: Routes = [
  {
    path: '',
    component: GuidesComponent,
    data: { title: 'Guides' },
  },
  {
    path: ':topic/:id',
    component: PostComponent,
    data: { title: 'Guides' },
  },
];
