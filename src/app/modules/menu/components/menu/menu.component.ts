import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../../models/menu.item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  public items: MenuItem[] = [
    // new MenuItem('Reviews', '📚', '/blog/reviews'),
    // new MenuItem('Productivity', '⚙️', '/blog/productivity'),
    new MenuItem('Guides', '🧑🏼‍💻', '/blog/guides'),
  ];

  constructor(
    private readonly router: Router,
  ) {}

  public navigateToMenuEntry(item: MenuItem): void {
    this.router.navigate([item.link])
  }

  public switchToLandingPage(): void {
    this.router.navigate(['blog'])
  }
}