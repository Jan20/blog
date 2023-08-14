import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { MENU_ITEMS, MenuItem, MenuState } from '../../models/menu.item';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    LayoutModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
  ],
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  public activeStates: Set<MenuState> = new Set();
  public readonly MenuState = MenuState;
  public readonly menuItems: MenuItem[] = MENU_ITEMS;

  constructor(private readonly breakpointObserver: BreakpointObserver, private readonly router: Router) {
    this.breakpointObserver.observe(Breakpoints.Web).pipe(takeUntilDestroyed()).subscribe((result) =>
      this.activeStates = result.matches ? new Set([MenuState.MAXIMIZED]) : new Set([MenuState.MOBILE])
    )
  };

  public toggleMenu(): void {
    this.activeStates.has(MenuState.MAXIMIZED) ? this.activeStates.delete(MenuState.MAXIMIZED) : this.activeStates.add(MenuState.MAXIMIZED);
  }

  public minimize(): void {
    this.activeStates = this.activeStates.has(MenuState.MOBILE)
      ? this.activeStates.has(MenuState.MAXIMIZED)
        ? new Set([MenuState.MOBILE, MenuState.MINIMIZED])
        : new Set([MenuState.MOBILE, MenuState.MAXIMIZED])
      : this.activeStates.has(MenuState.MAXIMIZED)
        ? new Set([MenuState.MINIMIZED])
        : new Set([MenuState.MAXIMIZED]);
  }

  public navigateToMenuEntry(selectedItem: MenuItem): void {
    const activeItem = this.menuItems.find(item => item.active);
    if (activeItem) activeItem.active = false;
    selectedItem.active = true;
    this.router.navigate([selectedItem.link]);
  }

  public switchToLandingPage(): void {
    this.router.navigate(['']);
  }
}
