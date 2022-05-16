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
  private _items: MenuItem[];
  private _user: MenuItem;

  constructor(
    private readonly router: Router,
    private readonly menuService: MenuService,
  ) {

    this._items = []
    this._user = new MenuItem('User', 'account_circle', '/user')

  }

  ngOnInit() {

    // this.languageService.fetchLanguages()
    // this.languageService.languagesSubject.subscribe(languages => {

    this.items = []

    //   languages.forEach(language => {

    //     this.items.push(new MenuItem(language.name, 'grain', '/languages/' + language.languageId))

    //   })
    // })
  }

  public get items(): MenuItem[] {

    return this._items;

  }

  public set items(value: MenuItem[]) {

    this._items = value;

  }

  public get user(): MenuItem {

    return this._user;

  }

  public set user(value: MenuItem) {

    this._user = value;

  }

  public navigateToMenuEntry(item: MenuItem): void {
    this.router.navigate([item.link])
  }

  public addLanguage(): void {
    this.router.navigate(['/languages/add'])
  }

  public switchToLandingPage(): void {
    this.router.navigate(['blog'])
  }
}