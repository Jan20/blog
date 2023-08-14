import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { aboutRoutes } from './about.routing';
import { SharedModule } from '../shared/shared.module';
import { PageTitleComponent } from '../../components/page-title/page-title.component';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule.forChild(aboutRoutes),
    SharedModule,
    PageTitleComponent,
  ],
})
export class AboutModule { }
