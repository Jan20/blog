import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularCourseComponent } from './angular-course.component';

describe('AngularCourseComponent', () => {
  let component: AngularCourseComponent;
  let fixture: ComponentFixture<AngularCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
