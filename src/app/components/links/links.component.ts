import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Link } from '../models/link';

@Component({
  standalone: true,
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
  public readonly links = [
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

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  public openLink(url: string): void {
    if (isPlatformBrowser(this.platformId)) {
      window.open(url, '_blank');
    }
  }
}
