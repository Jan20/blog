import { Component } from '@angular/core';
import { PageTitle, PageTitleBackground } from '../../../components/models/page-title';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss'],
})
export class RecommendationsComponent {
  public readonly pageTitle = new PageTitle(
    'Recommendations',
    'I want to share a few ideas around coding and productivity. Please, grab a coffee and feel free to go through some of my posts.',
    PageTitleBackground.RECOMMENDATIONS,
  );
}
