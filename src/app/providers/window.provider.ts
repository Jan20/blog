import { InjectionToken } from '@angular/core';

export const Window = new InjectionToken<Window>('Window', {
  providedIn: 'root',
  factory(): Window {
    return window;
  },
});
