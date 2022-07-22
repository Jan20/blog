import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { WindowService } from '../../services/window.service';
import { FilterComponent } from '../filter/filter.component';
import { BlogComponent } from './blog.component';

const windowService = jasmine.createSpyObj('WindowService', ['getNumberOfColumns']);
windowService.getNumberOfColumns.and.returnValue(1000);

const compileComponent = () => {
  TestBed.configureTestingModule({
    declarations: [
      BlogComponent,
      FilterComponent,
    ],
    imports: [
      RouterTestingModule,
      MatCardModule,
      MatGridListModule,
    ],
    providers: [
      { provide: WindowService, useValue: windowService }
    ],
  })
  .compileComponents();
}

fdescribe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;
  let router: Router;

  beforeEach(async () => {
    await compileComponent();
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should set the number of columns being displayed to 4', fakeAsync(() => {
    Object.defineProperty(window, 'innerWidth', { value: 1800 });
    window.dispatchEvent(new Event('resize'));
    tick(1);
    expect(component.numberOfColumns).toBe(4);
  }));

  fit('should decrease the number of columns being displayed to 3', fakeAsync(() => {
    Object.defineProperty(window, 'innerWidth', { value: 1799 });
    window.dispatchEvent(new Event('resize'));
    tick(1);
    expect(component.numberOfColumns).toBe(3);
  }));

  fit('should decrease the number of columns being displayed to 2', fakeAsync(() => {
    Object.defineProperty(window, 'innerWidth', { value: 1199 });
    window.dispatchEvent(new Event('resize'));
    tick(1);
    expect(component.numberOfColumns).toBe(2);
  }));

  fit('should decrease the number of columns being displayed to 1', fakeAsync(() => {
    Object.defineProperty(window, 'innerWidth', { value: 799 });
    window.dispatchEvent(new Event('resize'));
    tick(1);
    expect(component.numberOfColumns).toBe(1);
  }));

  fit('should change the view to "blog/001_introduction"', () => {
    component.showPost('001_introduction');
    expect(router.navigate).toHaveBeenCalledWith(['blog/001_introduction']);
  });

  fit('should select the RxJS topic', () => {
    component.selectTopic('RxJS');
    expect(router.navigate).toHaveBeenCalledWith([`blog/guides/RxJS`]);
  });
  
});
