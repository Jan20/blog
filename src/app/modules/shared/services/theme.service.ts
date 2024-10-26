import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private isDarkTheme = new BehaviorSubject<boolean>(false);
  isDarkTheme$ = this.isDarkTheme.asObservable();

  constructor() { }

  toggleDarkMode() {
    const newTheme = !this.isDarkTheme.value;
    this.isDarkTheme.next(newTheme);

    newTheme ? document.body.classList.add('dark-theme') : document.body.classList.remove('dark-theme')
  }
}
