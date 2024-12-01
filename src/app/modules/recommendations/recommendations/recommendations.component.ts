import { Component } from '@angular/core';
import {
  PageTitle,
  PageTitleBackground,
} from '../../../components/models/page-title';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss'],
  standalone: false,
})
export class RecommendationsComponent {
  public readonly pageTitle = new PageTitle(
    'Recommendations',
    "Over the years, I've discovered several books that have proven to be particularly valuable. Here are a few of them listed below.",
    PageTitleBackground.RECOMMENDATIONS
  );
}
