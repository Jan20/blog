import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Background } from '../../shared/models/enums';
import { PageTitle } from '../../shared/models/pageTitle';

@Component({
  selector: 'app-landing-title',
  templateUrl: './landing-title.component.html',
  styleUrls: ['./landing-title.component.scss'],
})
export class LandingTitleComponent {
  public readonly pageTitle = new PageTitle(
    'Efficient Software Engineering',
    'Writing software requires passion, skill, and time. However, our time is limited, thus I like to share a insides craft great software quicker.',
    Background.LANDING,
  );

  constructor(private readonly router: Router) { }

  public scrollDown(): void {
    this.router.navigate([
      `efficient-software-engineering/Efficiency/task_management`,
    ]);
  }
}
