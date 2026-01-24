import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './modules/shared/services/theme.service';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-root',
  imports: [MenuComponent, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private readonly themeService = inject(ThemeService);

  isDarkMode: boolean = false;

  ngOnInit(): void {
    this.themeService.isLightTheme$.subscribe(
        (isDark: boolean) => (this.isDarkMode = isDark)
    );
  }
}
