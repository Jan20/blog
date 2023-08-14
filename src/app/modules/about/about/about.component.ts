import { Component } from '@angular/core';
import { Background, Logo } from '../../shared/models/enums';
import { PageTitle } from '../../../components/models/page-title';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  public readonly pageTitle = new PageTitle(
    'About Me',
    '',
    Background.ANGULAR_COURSE,
  );

  constructor() { }
}
