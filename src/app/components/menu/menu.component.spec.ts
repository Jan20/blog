import {BreakpointObserver, Breakpoints, BreakpointState, LayoutModule,} from '@angular/cdk/layout';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {ComponentFixture, ComponentFixtureAutoDetect, fakeAsync, TestBed, tick,} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Router} from '@angular/router';
import {screen} from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import {Observable, of} from 'rxjs';
import {MenuItem, MenuState} from '../models/menu-item';
import {MenuComponent} from './menu.component';

let component: MenuComponent;
let fixture: ComponentFixture<MenuComponent>;

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
      MenuComponent,
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

describe('MenuComponent', () => {
  beforeEach(() => {
    compileComponent();
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a menu component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu state', () => {
    component.activeStates = new Set([MenuState.MAXIMIZED]);
    component.toggleMenu();
    expect(component.activeStates.has(MenuState.MAXIMIZED)).toBe(false);

    component.toggleMenu();
    expect(component.activeStates.has(MenuState.MAXIMIZED)).toBe(true);
  });

  it('should minimize menu', () => {
    component.activeStates = new Set([MenuState.MAXIMIZED]);
    component.minimize();
    expect(component.activeStates.has(MenuState.MINIMIZED)).toBe(true);

    component.minimize();
    expect(component.activeStates.has(MenuState.MINIMIZED)).toBe(false);
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

  it('should switch to landing page', () => {
    component.switchToLandingPage();

    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should navigate to the landing page', fakeAsync(() => {
    component.activeStates = new Set([MenuState.MOBILE]);
    fixture.detectChanges();
    userEvent.click(screen.getByRole('button', { name: /switch to landing page/i }));
    tick(1);
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  }));

  describe('Toggle menu tests', () => {
    it('should maximize the menu', fakeAsync(() => {
      component.activeStates = new Set([MenuState.MOBILE]);
      fixture.detectChanges();
      const maximizeButton = screen.getByRole('button', { name: /Toggle Navigation Bar in Mobile View/i });
      expect(maximizeButton).toBeTruthy();
      userEvent.click(maximizeButton);
      tick(1);
      fixture.detectChanges();
      expect(component.activeStates).toEqual(
          new Set([MenuState.MOBILE, MenuState.MAXIMIZED])
      );
    }));

    it('should minimize the menu', fakeAsync(() => {
      component.activeStates = new Set([MenuState.MAXIMIZED]);
      const toggleButton = screen.getByRole('button', { name: /Toggle Navigation Bar in Desktop View/i });
      expect(toggleButton).toBeTruthy();
      userEvent.click(toggleButton);
      tick(1);
      fixture.detectChanges();
      expect(component.activeStates).toEqual(new Set([MenuState.MINIMIZED]));
    }));
  });
});
