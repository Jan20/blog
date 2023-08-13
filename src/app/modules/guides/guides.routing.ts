import { Routes } from '@angular/router';
import { GuidesComponent } from './guides/guides.component';
import { PostComponent } from '../shared/components/post/post.component';

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
