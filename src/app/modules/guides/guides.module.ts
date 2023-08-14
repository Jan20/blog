import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuidesComponent } from './guides/guides.component';
import { guidesRoutes } from './guides.routing';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { PageTitleComponent } from '../../components/page-title/page-title.component';

@NgModule({
  declarations: [GuidesComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule.forChild(guidesRoutes),
    SharedModule,
    PageTitleComponent,
  ],
  exports: [],
})
export class GuidesModule { }
