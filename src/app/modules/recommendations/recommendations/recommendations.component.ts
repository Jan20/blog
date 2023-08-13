import { Component } from '@angular/core';
import { Background, Logo } from '../../shared/models/enums';
import { PageTitle } from '../../shared/models/pageTitle';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss'],
})
export class RecommendationsComponent {
  public readonly pageTitle = new PageTitle(
    'Recommendations',
    'I want to share a few ideas around coding and productivity. Please, grab a coffee and feel free to go through some of my posts.',
    Background.RECOMMENDATIONS,
  );
}
