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
import {MENU_ITEMS, MenuItem, MenuState, Theme} from '../models/menu-item';
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
    public theme: Theme = Theme.DARK;
    public menuState: MenuState = MenuState.MAXIMIZED;

    private readonly router: Router = inject(Router);
    private readonly themeService: ThemeService = inject(ThemeService);

    readonly MenuState: typeof MenuState = MenuState;
    readonly menuItems: MenuItem[] = MENU_ITEMS;

    ngOnInit(): void {
        this.themeService.theme$.subscribe(
            (theme: Theme): Theme => (this.theme = theme)
        );
    }

    toggleTheme(): void {
        this.themeService.toggleTheme()
    }

    toggleMenu(): void {
        this.menuState = (this.menuState === MenuState.MAXIMIZED)
            ? MenuState.MINIMIZED
            : MenuState.MAXIMIZED;
    }

    navigateTo(selectedItem: MenuItem): void {
        const activeItem = this.menuItems.find(item => item.active);
        if (activeItem) activeItem.active = false;
        selectedItem.active = true;
        this.router.navigate([selectedItem.link]);
    }

    protected readonly Theme = Theme;
}
