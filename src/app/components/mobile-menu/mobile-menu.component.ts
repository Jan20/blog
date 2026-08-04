import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { MENU_ITEMS, MenuItem, Theme } from '../models/menu-item';
import { ThemeService } from '../../modules/shared/services/theme.service';

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
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
})
export class MobileMenuComponent {
  private readonly router: Router = inject(Router);
  private readonly themeService: ThemeService = inject(ThemeService);

  readonly theme$: Observable<Theme> = this.themeService.theme$;
  readonly menuItems: MenuItem[] = MENU_ITEMS;

  navigateToMenuEntry(selectedItem: MenuItem): void {
    const activeItem = this.menuItems.find(item => item.active);
    if (activeItem) activeItem.active = false;
    selectedItem.active = true;
    this.router.navigate([selectedItem.link]);
  }
}
