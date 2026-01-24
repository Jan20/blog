import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { PageTitleComponent } from '../../components/page-title/page-title.component';
import { SharedModule } from '../shared/shared.module';
import { guidesRoutes } from './guides.routing';
import { GuidesComponent } from './guides/guides.component';
import { PostListComponent } from '../../components/post-list/post-list.component';

@NgModule({
  declarations: [GuidesComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    RouterModule.forChild(guidesRoutes),
    SharedModule,
    PageTitleComponent,
    PostListComponent,
  ],
  exports: [],
})
export class GuidesModule {}
