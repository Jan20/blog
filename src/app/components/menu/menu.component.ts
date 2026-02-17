import {LayoutModule,} from '@angular/cdk/layout';
import {CommonModule} from '@angular/common';
import {Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterModule} from '@angular/router';
import {MENU_ITEMS, MenuItem, MenuState, Theme} from '../models/menu-item';
import {ThemeService} from '../../modules/shared/services/theme.service';
import {Observable} from "rxjs";

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
export class MenuComponent {
    public menuState: MenuState = MenuState.MAXIMIZED;

    private readonly themeService: ThemeService = inject(ThemeService);

    readonly theme$: Observable<Theme> = this.themeService.theme$;
    readonly MenuState: typeof MenuState = MenuState;
    readonly Theme: typeof Theme = Theme;
    readonly menuItems: MenuItem[] = MENU_ITEMS;

    toggleTheme(): void {
        this.themeService.toggleTheme()
    }

    toggleMenu(): void {
        this.menuState = (this.menuState === MenuState.MAXIMIZED)
            ? MenuState.MINIMIZED
            : MenuState.MAXIMIZED;
    }
}
