import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { PageTitleComponent } from '../../components/page-title/page-title.component';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { SharedModule } from '../shared/shared.module';
import { EngineeringComponent } from './engineering/engineering.component';
import { engineeringRoutes } from './guides.routing';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        RouterModule.forChild(engineeringRoutes),
        SharedModule,
        PageTitleComponent,
        PostListComponent,
        EngineeringComponent,
    ],
    exports: [],
})
export class EngineeringModule {}
