import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PostListComponent } from 'src/app/components/post-list/post-list.component';
import { CourseModule } from '../course/course.module';
import { EngineeringModule } from '../engineering/engineering.module';
import { FooterModule } from '../footer/footer.module';
import { GuidesModule } from '../guides/guides.module';
import { SharedModule } from '../shared/shared.module';
import { LandingTitleComponent } from './landing-title/landing-title.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [LandingComponent, LandingTitleComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    EngineeringModule,
    GuidesModule,
    CourseModule,
    MatCardModule,
    SharedModule,
    FooterModule,
    PostListComponent,
  ],
})
export class LandingModule {}
