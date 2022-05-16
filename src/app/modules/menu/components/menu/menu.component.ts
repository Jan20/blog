import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../../models/menu.item';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public title: String = "Jan Schumann's Blog";
  public items: MenuItem[];

  constructor(
    private readonly router: Router,
    private readonly menuService: MenuService,
  ) {
    this.items = [
      new MenuItem('Reviews', '📚', '/blog/reviews'),
      new MenuItem('Productivity', '⚙️', '/blog/productivity'),
      new MenuItem('Guides', '🧑🏼‍💻', '/blog/guides'),
    ]
  }

  ngOnInit() {  }

  public navigateToMenuEntry(item: MenuItem): void {
    this.router.navigate([item.link])
  }

  public switchToLandingPage(): void {
    this.router.navigate(['blog'])
  }
}