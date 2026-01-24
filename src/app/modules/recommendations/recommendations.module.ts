import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { PageTitleComponent } from '../../components/page-title/page-title.component';
import { SharedModule } from '../shared/shared.module';
import { recommendationsRoutes } from './recommendations.routing';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { PostListComponent } from '../../components/post-list/post-list.component';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        RouterModule.forChild(recommendationsRoutes),
        PageTitleComponent,
        SharedModule,
        PostListComponent,
        RecommendationsComponent,
    ],
})
export class RecommendationsModule {}
