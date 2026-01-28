import {LayoutModule,} from '@angular/cdk/layout';
import {CommonModule} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Router, RouterModule} from '@angular/router';
import {MENU_ITEMS, MenuItem, MenuState} from '../models/menu-item';
import {ThemeService} from '../../modules/shared/services/theme.service';

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
    public inDarkMode: boolean = false;
    public activeStates: Set<MenuState> = new Set([MenuState.MAXIMIZED]);

    private readonly router: Router = inject(Router);
    private readonly themeService: ThemeService = inject(ThemeService);

    readonly MenuState: typeof MenuState = MenuState;
    readonly menuItems: MenuItem[] = MENU_ITEMS;

    ngOnInit() {
        this.themeService.isDarkTheme$.subscribe(
            (inDarkMode: boolean): boolean => (this.inDarkMode = inDarkMode)
        );
    }

    toggleTheme(): void {
        this.themeService.toggleDarkMode();
    }

    minimize(): void {
        this.activeStates = this.activeStates.has(MenuState.MAXIMIZED)
            ? new Set([MenuState.MINIMIZED])
            : new Set([MenuState.MAXIMIZED]);
    }

    navigateToMenuEntry(selectedItem: MenuItem): void {
        const activeItem = this.menuItems.find(item => item.active);
        if (activeItem) activeItem.active = false;
        selectedItem.active = true;
        this.router.navigate([selectedItem.link]);
    }
}
