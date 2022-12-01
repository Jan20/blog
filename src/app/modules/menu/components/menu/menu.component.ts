import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../../models/menu.item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  public items: MenuItem[] = [
    new MenuItem('Guides', '🧑🏼‍💻', '/blog/guides'),
    new MenuItem('Series', '☕️', '/blog/series'),
    new MenuItem('Productivity', '⚙️', '/blog/productivity'),
  ];

  constructor(private readonly router: Router) {}

  public navigateToMenuEntry(item: MenuItem): void {
    this.router.navigate([item.link]);
  }

  public switchToLandingPage(): void {
    this.router.navigate(['']);
  }
}
