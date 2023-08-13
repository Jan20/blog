import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';

export const aboutRoutes: Routes = [
  {
    path: '',
    component: AboutComponent,
    data: { title: 'About' },
  },
];
