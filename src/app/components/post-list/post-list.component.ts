import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatRippleModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Observable, switchMap} from 'rxjs';
import {Post} from '../../modules/shared/models/post';
import {BlogService} from '../../modules/shared/services/blog.service';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDividerModule} from "@angular/material/divider";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs/operators";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
    imports: [
        CommonModule,
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatRippleModule,
        MatGridListModule,
        MatDividerModule,
        NgOptimizedImage,
    ],
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent {
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly blogService = inject(BlogService);
    private readonly router = inject(Router);
    private breakpointObserver = inject(BreakpointObserver);

    public readonly posts: Observable<Post[]>;
    @Input() public category!: string;
    @Input() public series: string = 'misc';
    public readonly cols$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

    constructor() {
        this.posts = this.activatedRoute.paramMap.pipe(
            switchMap(() => this.blogService.getPosts(this.category, this.series))
        );

        this.breakpointObserver
            .observe([
                Breakpoints.Small,
                Breakpoints.Medium,
                Breakpoints.Large,
                Breakpoints.XLarge
            ])
            .pipe(
                map(state => {
                    if (state.breakpoints[Breakpoints.Small]) {
                        this.cols$.next(1);
                    } else if (state.breakpoints[Breakpoints.Medium]) {
                        this.cols$.next(2);
                    } else if (state.breakpoints[Breakpoints.Large]) {
                        this.cols$.next(2);
                    } else if (state.breakpoints[Breakpoints.XLarge]) {
                        this.cols$.next(3);
                    }
                }),
                takeUntilDestroyed()
            ).subscribe();
    }

    public showPost(post: Post): void {
        this.router.navigate([`${post.route}`]);
    }
}
