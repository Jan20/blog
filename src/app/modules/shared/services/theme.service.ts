import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private IsLightTheme = new BehaviorSubject<boolean>(false);
  isLightTheme$ = this.IsLightTheme.asObservable();

  constructor() { }

  toggleDarkMode() {
    const newTheme = !this.IsLightTheme.value;
    this.IsLightTheme.next(newTheme);

    newTheme ? document.body.classList.add('light-theme') : document.body.classList.remove('light-theme')
  }
}
