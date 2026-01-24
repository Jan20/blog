import { Component } from '@angular/core';
import {
  PageTitle,
  PageTitleBackground,
} from '../../../components/models/page-title';
import { PageTitleComponent } from '../../../components/page-title/page-title.component';
import { MatCard } from '@angular/material/card';
import { LinksComponent } from '../../../components/links/links.component';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    imports: [
        PageTitleComponent,
        MatCard,
        LinksComponent,
    ],
})
export class AboutComponent {
  public readonly pageTitle = new PageTitle(
    'About Me',
    "If you're interested in learning more about me, please feel free to read through this page.",
    PageTitleBackground.ABOUT
  );

  constructor() {}
}
