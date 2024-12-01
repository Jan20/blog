import { Component } from '@angular/core';
import {
  PageTitle,
  PageTitleBackground,
} from '../../../components/models/page-title';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: false,
})
export class AboutComponent {
  public readonly pageTitle = new PageTitle(
    'About Me',
    "If you're interested in learning more about me, please feel free to read through this page.",
    PageTitleBackground.ABOUT
  );

  constructor() {}
}
