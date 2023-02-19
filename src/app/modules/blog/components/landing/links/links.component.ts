import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Link } from '../../../models/link';

@Component({
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
    new Link('About', '/about', ''),
  ];

  constructor(private readonly router: Router) {}

  public openLink(url: string): void {
    url === '/about'
      ? this.router.navigate(['/about'])
      : window.open(url, '_blank');
  }
}
