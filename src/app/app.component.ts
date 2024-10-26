import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './modules/shared/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isDarkMode: boolean = false;

  constructor(private readonly themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.isDarkTheme$.subscribe((isDark) => this.isDarkMode = isDark);
  }
}
