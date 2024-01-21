import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Link } from '../models/link';
import { MatCardModule } from '@angular/material/card';
import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

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
    new Link('About me', '/about', ''),
  ];

  constructor(private readonly router: Router) {}

  public openLink(url: string): void {
    url === '/about'
      ? this.router.navigate(['/about'])
      : window.open(url, '_blank');
  }
}
