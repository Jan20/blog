import { Component, Input } from '@angular/core';
import { PageTitle } from '../../models/pageTitle';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss'],
})
export class PageTitleComponent {
  @Input() public pageTitle!: PageTitle;
}
