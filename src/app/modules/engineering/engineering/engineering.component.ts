import { Component } from '@angular/core';
import { Background, Logo } from '../../shared/models/enums';
import { PageTitle } from '../../shared/models/pageTitle';

@Component({
  selector: 'app-engineering',
  templateUrl: './engineering.component.html',
})
export class EngineeringComponent {
  public readonly pageTitle = new PageTitle(
    'Effective Engineering',
    'I want to share a few ideas around coding and productivity. Please, grab a coffee and feel free to go through some of my posts.',
    Background.ENGINEERING,
  );
}
