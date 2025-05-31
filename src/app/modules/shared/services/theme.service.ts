import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

    newTheme
      ? document.body.classList.add('light-theme')
      : document.body.classList.remove('light-theme');
  }
}
