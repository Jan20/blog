import { Component } from '@angular/core';
import {
  PageTitle,
  PageTitleBackground,
} from '../../../components/models/page-title';

@Component({
  selector: 'app-engineering',
  templateUrl: './engineering.component.html',
})
export class EngineeringComponent {
  public readonly pageTitle = new PageTitle(
    'Efficient Engineering',
    "While practical guides are excellent for addressing specific issues, I've come across some broader strategies that I'd like to share here.",
    PageTitleBackground.ENGINEERING
  );
}
