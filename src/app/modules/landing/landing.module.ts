import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { LandingTitleComponent } from './landing-title/landing-title.component';
import { LinksComponent } from './links/links.component';
import { LandingComponent } from './landing/landing.component';
import { EngineeringModule } from '../engineering/engineering.module';
import { AngularCourseModule } from '../angular-course/angular-course.module';
import { GuidesModule } from '../guides/guides.module';
import { SharedModule } from '../shared/shared.module';
import { FooterModule } from '../footer/footer.module';

@NgModule({
  declarations: [LandingComponent, LandingTitleComponent, LinksComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    EngineeringModule,
    GuidesModule,
    AngularCourseModule,
    MatCardModule,
    SharedModule,
    FooterModule,
  ],
})
export class LandingModule {}
