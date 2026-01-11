import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { PageTitleComponent } from '../../components/page-title/page-title.component';
import { SharedModule } from '../shared/shared.module';
import { courseRoutes } from './course.routing';
import { CourseComponent } from './course/course.component';

@NgModule({
  declarations: [CourseComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    SharedModule,
    RouterModule.forChild(courseRoutes),
    PageTitleComponent,
    PostListComponent,
  ],
  exports: [],
})
export class CourseModule {}
