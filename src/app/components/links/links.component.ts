import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NavigationService } from 'src/app/modules/shared/services/navigation.service';
import { Link } from '../models/link';

@Component({
  imports: [
    CommonModule,
    LayoutModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
})
export class LinksComponent {
  readonly links = [
    new Link(
      'Github',
      'https://github.com/Jan20',
      'assets/images/links/github.png'
    ),
    new Link(
      'LinkedIn',
      'https://www.linkedin.com/in/jan-schumann-b5740213b/',
      'assets/images/links/linkedin.png'
    ),
  ];

  constructor(private readonly navigationService: NavigationService) {}

  openLink(url: string): void {
    this.navigationService.openUrl(url);
  }
}
