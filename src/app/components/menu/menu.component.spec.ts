import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {APP_BASE_HREF} from '@angular/common';
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ActivatedRoute, Router} from '@angular/router';
import {screen} from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import {Observable, of} from 'rxjs';
import {ThemeService} from '../../modules/shared/services/theme.service';
import {MenuState} from '../models/menu-item';
import {MenuComponent} from './menu.component';

class MockBreakpointObserver {
  observe(breakPoint: string): Observable<BreakpointState> {
    if (breakPoint === Breakpoints.Handset) {
      return of({ matches: true, breakpoints: { [Breakpoints.Handset]: true } });
    }
    return of({ matches: false, breakpoints: {} });
  }
}

const activatedRoute = jasmine.createSpyObj('ActivatedRoute', [
  'paramMap',
  'snapshot',
]);
activatedRoute.paramMap = of('/engineering');

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  const router = jasmine.createSpyObj<Router>('Router', ['navigate'], {
    events: of(), // Add the events property here
  });
  router.navigate.and.returnValue(Promise.resolve(true));

  const mockThemeService = {
    theme$: of('light-theme'),
    toggleTheme: jasmine.createSpy('toggleTheme')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSidenavModule, MenuComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: BreakpointObserver, useClass: MockBreakpointObserver },
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: ThemeService, useValue: mockThemeService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a menu component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu state', () => {
    component.menuState = MenuState.MAXIMIZED;
    component.toggleMenu();
    expect(component.menuState).toBe(MenuState.MINIMIZED);

    component.toggleMenu();
    expect(component.menuState).toBe(MenuState.MAXIMIZED);
  });

  it('should toggle the menu when button is clicked', fakeAsync(() => {
    component.menuState = MenuState.MINIMIZED;
    tick();
    fixture.detectChanges();
    expect(component.menuState).toBe(MenuState.MINIMIZED);

    const toggleButton = screen.getByRole('button', { name: /Toggle Navigation Bar in Desktop View/i });
    userEvent.click(toggleButton);
    tick();
    fixture.detectChanges();

    expect(component.menuState).toBe(MenuState.MAXIMIZED);
  }));
});