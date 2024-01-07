import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostNavigationComponent } from './post-navigation.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';

let component: PostNavigationComponent;
let fixture: ComponentFixture<PostNavigationComponent>;

const activatedRoute = jasmine.createSpyObj('ActivatedRoute', ['paramMap', 'snapshot']);
activatedRoute.paramMap = of('test');

const compileComponent = (): void => {
  TestBed.configureTestingModule({
    declarations: [PostNavigationComponent],
    imports: [RouterModule],
    providers: [
      { provide: ActivatedRoute, useValue: activatedRoute }
    ],
  }).compileComponents();
};

fdescribe('PostNavigationComponent', () => {

  beforeEach(async () => {
    compileComponent()
    fixture = TestBed.createComponent(PostNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});