import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isLightTheme = new BehaviorSubject<boolean>(false);
  isLightTheme$ = this.isLightTheme.asObservable();

  constructor() {}

  toggleDarkMode() {
    const newTheme = !this.isLightTheme.value;
    this.isLightTheme.next(newTheme);

    if (newTheme) {
      document.body.classList.add('light-theme')
      return;
    }

    document.body.classList.remove('light-theme');
  }
}
