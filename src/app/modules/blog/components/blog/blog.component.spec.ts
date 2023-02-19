import { WindowService } from '../../services/window.service';
import { FilterComponent } from './filter/filter.component';
import { BlogComponent } from './blog.component';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { GUIDES } from 'src/app/helpers/post-mocks';
import { MatMenuModule } from '@angular/material/menu';

const windowService = jasmine.createSpyObj('WindowService', [
  'getNumberOfColumns',
]);
windowService.getNumberOfColumns.and.returnValue(1000);

const compileComponent = (): void => {
  TestBed.configureTestingModule({
    declarations: [BlogComponent, FilterComponent],
    imports: [
      RouterTestingModule,
      MatIconModule,
      MatMenuModule,
      MatCardModule,
      MatGridListModule,
    ],
    providers: [{ provide: WindowService, useValue: windowService }],
  }).compileComponents();
};

describe('BlogComponent:', () => {
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

  it('should create a blog component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the number of columns being displayed to 4', fakeAsync(() => {
    Object.defineProperty(window, 'innerWidth', { value: 1800 });
    window.dispatchEvent(new Event('resize'));
    tick(1);
  }));

  it('should decrease the number of columns being displayed to 3', fakeAsync(() => {
    Object.defineProperty(window, 'innerWidth', { value: 1799 });
    window.dispatchEvent(new Event('resize'));
    tick(1);
  }));

  it('should decrease the number of columns being displayed to 2', fakeAsync(() => {
    Object.defineProperty(window, 'innerWidth', { value: 1199 });
    window.dispatchEvent(new Event('resize'));
    tick(1);
  }));

  it('should decrease the number of columns being displayed to 1', fakeAsync(() => {
    Object.defineProperty(window, 'innerWidth', { value: 799 });
    window.dispatchEvent(new Event('resize'));
    tick(1);
  }));

  it('should change the view to "blog/Git/git_history"', () => {
    component.showPost(GUIDES[0]);
    expect(router.navigate).toHaveBeenCalledWith(['blog/Git/git_history']);
  });

  it('should select the RxJS topic', () => {
    component.selectTopic('RxJS');
    expect(router.navigate).toHaveBeenCalledWith([`blog/guides/RxJS`]);
  });
});
