import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularCourseComponent } from './angular-course/angular-course.component';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { angularCourseRoutes } from './angular-course.routing';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { PageTitleComponent } from '../shared/components/page-title/page-title.component';

@NgModule({
  declarations: [AngularCourseComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    SharedModule,
    RouterModule.forChild(angularCourseRoutes),
    PageTitleComponent,
  ],
  exports: [],
})
export class AngularCourseModule { }