import { Routes } from '@angular/router';
import { PostComponent } from '../shared/components/post/post.component';
import { AngularCourseComponent } from './angular-course/angular-course.component';

export const angularCourseRoutes: Routes = [
  {
    path: '',
    component: AngularCourseComponent,
    data: { title: 'Angular Course' },
  },
  {
    path: ':id',
    component: PostComponent,
    data: { title: 'Angular Course' },
  },
];
