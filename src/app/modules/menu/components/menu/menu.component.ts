import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../../models/menu.item';

export type MenuState = 'narrow' | 'minimized' | 'hidden';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  public items: MenuItem[] = [
    new MenuItem('Home', 'home', '/', false),
    new MenuItem('Guides', 'auto_stories', 'guides', false),
    new MenuItem('Angular Guides', 'school', 'angular-course', false),
    new MenuItem(
      'Efficient Engineering',
      'settings_suggest',
      'efficient-software-engineering',
      false
    ),
    new MenuItem('Recommendations', 'assistant', 'recommendations', false),
    new MenuItem('About', 'person_pin', 'about', false),
  ];

  public menuState: MenuState = 'hidden';
  public isNarrow: boolean = false;
  public isVisible: boolean = true;

  constructor(private readonly router: Router) { }

  @HostListener('window:resize', ['$event'])
  public onResize(event: Event): void {
    this.isVisible = (event.target as Window).innerWidth >= 960;
    this.isNarrow = !this.isVisible;
  }

  public toggleMenu(): void {
    this.isNarrow = true;
    this.isVisible = !this.isVisible;
  }

  public minimize(): void {
    this.menuState = this.menuState === 'minimized' ? 'narrow' : 'minimized';
  }

  public navigateToMenuEntry(item: MenuItem): void {
    this.items
      .filter(item => item.active)
      .forEach(item => (item.active = false));
    item.active = true;
    this.router.navigate([item.link]);
  }

  public switchToLandingPage(): void {
    this.router.navigate(['']);
  }
}
