import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './modules/shared/services/theme.service';
import { MenuComponent } from './components/menu/menu.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { MobileMenuComponent } from './components/mobile-menu/mobile-menu.component';

@Component({
  selector: 'app-root',
  imports: [MenuComponent, MobileMenuComponent, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  isMobileMenu: boolean = false;
  private readonly themeService = inject(ThemeService);
  private readonly breakpointObserver: BreakpointObserver =
    inject(BreakpointObserver);

  isDarkMode: boolean = false;

  constructor() {
    this.breakpointObserver
      .observe([
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(
        map(state => {
          if (state.breakpoints[Breakpoints.Small]) {
            this.isMobileMenu = true;
          } else if (state.breakpoints[Breakpoints.Medium]) {
            this.isMobileMenu = false;
          } else if (state.breakpoints[Breakpoints.Large]) {
            this.isMobileMenu = false;
          } else if (state.breakpoints[Breakpoints.XLarge]) {
            this.isMobileMenu = false;
          }
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.themeService.isLightTheme$.subscribe(
      (isDark: boolean) => (this.isDarkMode = isDark)
    );
  }
}
