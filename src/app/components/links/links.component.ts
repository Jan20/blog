import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Window } from 'src/app/providers/window.provider';
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

  constructor(@Inject(Window) private window: Window) {}

  public openLink(url: string): void {
    this.window.open(url, '_blank');
  }
}
