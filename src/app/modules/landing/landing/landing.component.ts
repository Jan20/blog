import { Component } from '@angular/core';
import { LandingTitleComponent } from '../landing-title/landing-title.component';
import { PostListComponent } from '../../../components/post-list/post-list.component';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    imports: [LandingTitleComponent, PostListComponent],
})
export class LandingComponent {}
