import {BreakpointObserver, Breakpoints, BreakpointState, LayoutModule,} from '@angular/cdk/layout';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {ComponentFixture, ComponentFixtureAutoDetect, TestBed,} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {MenuItem} from '../models/menu-item';
import {MobileMenuComponent} from './mobile-menu.component';

let component: MobileMenuComponent;
let fixture: ComponentFixture<MobileMenuComponent>;

const router = jasmine.createSpyObj<Router>('Router', ['navigate']);
router.navigate.and.returnValue(Promise.resolve(true));

export class MockBreakpointObserver {
  observe(breakPoint: string): Observable<BreakpointState> {
    if (breakPoint === 'small') {
      return of({ matches: true, breakpoints: { [Breakpoints.Small]: true } });
    }

    return of({ matches: false, breakpoints: {} });
  }
}

const compileComponent = (): void => {
  TestBed.configureTestingModule({
    declarations: [],
    imports: [
      FormsModule,
      LayoutModule,
      MatButtonModule,
      MatIconModule,
      MatSidenavModule,
      MatToolbarModule,
      MatListModule,
      MobileMenuComponent,
      CommonModule,
    ],
    providers: [
      { provide: Router, useValue: router },
      { provide: BreakpointObserver, useClass: MockBreakpointObserver },
      { provide: APP_BASE_HREF, useValue: '/' },
      { provide: ComponentFixtureAutoDetect, useValue: true },
    ],
    teardown: { destroyAfterEach: false },
  }).compileComponents();
};

describe('MobileMenuComponent', () => {
  beforeEach(() => {
    compileComponent();
    fixture = TestBed.createComponent(MobileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a menu component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to menu entry', () => {
    const selectedItem = new MenuItem(
      'Angular Guides',
      'school',
      'course',
      false
    );
    component.navigateToMenuEntry(selectedItem);

    expect(selectedItem.active).toBe(true);
    expect(router.navigate).toHaveBeenCalledWith([selectedItem.link]);
  });
});
