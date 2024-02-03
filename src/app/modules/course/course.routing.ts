import { PostComponent } from '../../components/post/post.component';
import { CourseComponent } from './course/course.component';

export const courseRoutes = [
  {
    path: '',
    component: CourseComponent,
    data: { title: 'Angular Course' },
  },
  {
    path: ':id',
    component: PostComponent,
    data: { title: 'Angular Course' },
  },
];
