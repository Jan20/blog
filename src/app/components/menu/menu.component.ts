import {BreakpointObserver, Breakpoints, LayoutModule,} from '@angular/cdk/layout';
import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Router, RouterModule} from '@angular/router';
import {MENU_ITEMS, MenuItem, MenuState} from '../models/menu-item';
import {ThemeService} from '../../modules/shared/services/theme.service';
import {map} from "rxjs/operators";

@Component({
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
export class MenuComponent implements OnInit {
    activeStates = new Set<MenuState>();
    isLightTheme: boolean = false;
    readonly title = "Jan's Engineering Blog";
    readonly MenuState = MenuState;
    readonly menuItems: MenuItem[] = MENU_ITEMS;

    constructor(
        private readonly breakpointObserver: BreakpointObserver,
        private readonly router: Router,
        private readonly themeService: ThemeService
    ) {
        this.breakpointObserver
            .observe([
                Breakpoints.Small,
                Breakpoints.Medium,
                Breakpoints.Large,
                Breakpoints.XLarge
            ])
            .pipe(
                map(state => {
                    if (state.breakpoints[Breakpoints.Small]) {
                        this.activeStates = new Set([MenuState.MOBILE])
                    } else if (state.breakpoints[Breakpoints.Medium]) {
                        this.activeStates = new Set([MenuState.MAXIMIZED])
                    } else if (state.breakpoints[Breakpoints.Large]) {
                        this.activeStates = new Set([MenuState.MAXIMIZED])
                    } else if (state.breakpoints[Breakpoints.XLarge]) {
                        this.activeStates = new Set([MenuState.MAXIMIZED])
                    }
                })
            ).subscribe();
    }

    ngOnInit() {
        this.themeService.isLightTheme$.subscribe(
            (isLight: boolean): boolean => (this.isLightTheme = isLight)
        );
    }

    hideMenu(): void {
        if (!this.activeStates.has(MenuState.MOBILE)) return;
        if (this.activeStates.has(MenuState.MAXIMIZED))
            this.activeStates.delete(MenuState.MAXIMIZED);
    }

    toggleMenu(): void {
        this.activeStates.has(MenuState.MAXIMIZED)
            ? this.activeStates.delete(MenuState.MAXIMIZED)
            : this.activeStates.add(MenuState.MAXIMIZED);
    }

    toggleTheme(): void {
        this.themeService.toggleDarkMode();
    }

    minimize(): void {
        this.activeStates = this.activeStates.has(MenuState.MOBILE)
            ? this.activeStates.has(MenuState.MAXIMIZED)
                ? new Set([MenuState.MOBILE, MenuState.MINIMIZED])
                : new Set([MenuState.MOBILE, MenuState.MAXIMIZED])
            : this.activeStates.has(MenuState.MAXIMIZED)
                ? new Set([MenuState.MINIMIZED])
                : new Set([MenuState.MAXIMIZED]);
    }

    navigateToMenuEntry(selectedItem: MenuItem): void {
        const activeItem = this.menuItems.find(item => item.active);
        if (activeItem) activeItem.active = false;
        selectedItem.active = true;
        this.router.navigate([selectedItem.link]);
    }

    switchToLandingPage(): void {
        this.router.navigate(['']);
    }
}
