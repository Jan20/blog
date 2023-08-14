import { Component } from '@angular/core';
import { PageTitle, PageTitleBackground } from '../../../components/models/page-title';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  public readonly pageTitle = new PageTitle(
    'About Me',
    '',
    PageTitleBackground.ANGULAR_COURSE,
  );

  constructor() { }
}
