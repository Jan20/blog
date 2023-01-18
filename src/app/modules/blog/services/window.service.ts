import { HostListener, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WindowService {
  private numberOfColumns: number = 3;

  @HostListener('window:resize', ['$event'])
  public onResize(event: { target: { innerWidth: number } }): void {
    this.numberOfColumns = this.onWidthChange(event.target.innerWidth);
  }

  public getNumberOfColumns(): number {
    return window.innerWidth < 1000 ? 1 : 3;
  }

  private onWidthChange(width: number): number {
    if (width < 800) return 1;
    if (width < 1200) return 3;
    return 3;
  }
}
