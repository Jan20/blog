import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  constructor() { }

  getNumberOfColumns(): number {
    return window.innerWidth < 1000 ? 1 : 3;
  }
}
