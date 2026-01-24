import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { PageTitleComponent } from '../../components/page-title/page-title.component';
import { SharedModule } from '../shared/shared.module';
import { aboutRoutes } from './about.routing';
import { AboutComponent } from './about/about.component';
import { LinksComponent } from '../../components/links/links.component';
import {PostListComponent} from "../../components/post-list/post-list.component";

@NgModule({
  declarations: [AboutComponent],
    imports: [
        CommonModule,
        MatCardModule,
        RouterModule.forChild(aboutRoutes),
        SharedModule,
        PageTitleComponent,
        LinksComponent,
        PostListComponent,
    ],
})
export class AboutModule {}
