import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {APP_BASE_HREF} from '@angular/common';
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {MatSidenavModule} from '@angular/material/sidenav';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Router} from '@angular/router';
import {screen} from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import {Observable, of} from 'rxjs';
import {MenuItem, MenuState} from '../models/menu-item';
import {MenuComponent} from './menu.component';

class MockBreakpointObserver {
  observe(breakPoint: string): Observable<BreakpointState> {
    if (breakPoint === Breakpoints.Handset) {
      return of({ matches: true, breakpoints: { [Breakpoints.Handset]: true } });
    }
    return of({ matches: false, breakpoints: {} });
  }
}

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  const router = jasmine.createSpyObj<Router>('Router', ['navigate']);
  router.navigate.and.returnValue(Promise.resolve(true));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSidenavModule, NoopAnimationsModule, MenuComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: BreakpointObserver, useClass: MockBreakpointObserver },
        { provide: APP_BASE_HREF, useValue: '/' },
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

  it('should navigate to menu entry', () => {
    const selectedItem = new MenuItem('Angular Guides', 'school', 'course', false);
    component.navigateTo(selectedItem);

    expect(selectedItem.active).toBe(true);
    expect(router.navigate).toHaveBeenCalledWith([selectedItem.link]);
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