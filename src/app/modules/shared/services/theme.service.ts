import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkTheme = new BehaviorSubject<boolean>(false);
  isDarkTheme$ = this.isDarkTheme.asObservable();

  constructor() {}

  public setTheme(isDarkMode: boolean): void {
    this.isDarkTheme.next(isDarkMode);
    this.updateBodyClass(isDarkMode);
  }

  public toggleDarkMode(): void {
    const newThemeIsDark = !this.isDarkTheme.value;
    this.setTheme(newThemeIsDark);
  }

  private updateBodyClass(isDarkMode: boolean): void {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      return;
    }
    document.body.classList.remove('dark-theme');
  }
}
