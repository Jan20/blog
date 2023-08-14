import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { PostListComponent } from 'src/app/components/post-list/post-list.component';
import { PageTitleComponent } from '../../components/page-title/page-title.component';
import { SharedModule } from '../shared/shared.module';
import { angularCourseRoutes } from './angular-course.routing';
import { AngularCourseComponent } from './angular-course/angular-course.component';

@NgModule({
  declarations: [AngularCourseComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    SharedModule,
    RouterModule.forChild(angularCourseRoutes),
    PageTitleComponent,
    PostListComponent,
  ],
  exports: [],
})
export class AngularCourseModule { }
