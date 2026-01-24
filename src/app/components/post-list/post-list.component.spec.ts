import {Component} from '@angular/core';
import {ComponentFixture, ComponentFixtureAutoDetect, TestBed,} from '@angular/core/testing';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {ActivatedRoute, Router} from '@angular/router';
import {of} from 'rxjs';
import {ENGINEERING_POSTS} from '../../helpers/post-mocks';
import {BlogService} from '../../modules/shared/services/blog.service';
import {PostListComponent} from './post-list.component';

let component: PostListComponent;
let hostFixture: ComponentFixture<HostComponent>;

const router = jasmine.createSpyObj<Router>('Router', ['navigate']);
router.navigate.and.returnValue(Promise.resolve(true));

const activatedRoute = jasmine.createSpyObj('ActivatedRoute', [
    'paramMap',
    'snapshot',
]);
activatedRoute.paramMap = of('/engineering');

const blogService = jasmine.createSpyObj<BlogService>('BlogService', [
    'getPost',
    'getPosts',
]);
blogService.getPost.and.returnValue(of(ENGINEERING_POSTS[0]));
blogService.getPosts.and.returnValue(of(ENGINEERING_POSTS));

@Component({
    selector: 'app-host-component',
    template: '<app-post-list category="course" series="misc"></app-post-list>',
    imports: [
        MatIconModule,
        MatMenuModule,
        MatCardModule,
        MatGridListModule,
        PostListComponent,
    ],
})
class HostComponent {
}

const compileComponent = (): void => {
    TestBed.configureTestingModule({
        imports: [
            MatIconModule,
            MatMenuModule,
            MatCardModule,
            MatGridListModule,
            PostListComponent,
            HostComponent,
        ],
        providers: [
            {provide: ActivatedRoute, useValue: activatedRoute},
            {provide: Router, useValue: router},
            {provide: BlogService, useValue: blogService},
            {provide: ComponentFixtureAutoDetect, useValue: true},
        ],
        teardown: {destroyAfterEach: false},
    }).compileComponents();
};

describe('PostListComponent:', () => {
    beforeEach(async () => {
        await compileComponent();
        hostFixture = TestBed.createComponent(HostComponent);
        component = TestBed.createComponent(PostListComponent).componentInstance;
        hostFixture.detectChanges();
    });

    it('should create a post list component', () => {
        expect(component).toBeTruthy();
    });

    it('should select the "Staying Focused" post', () => {
        component.showPost(ENGINEERING_POSTS[2]);
        expect(router.navigate).toHaveBeenCalledWith([
            `/engineering/staying-focused`,
        ]);
    });
});
