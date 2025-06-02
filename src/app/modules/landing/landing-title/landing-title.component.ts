import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  PageTitle,
  PageTitleBackground,
} from '../../../components/models/page-title';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';

@Component({
  imports: [CommonModule, MatCardModule, MatButtonModule, MatRippleModule],
  selector: 'app-landing-title',
  templateUrl: './landing-title.component.html',
  styleUrls: ['./landing-title.component.scss'],
  standalone: true,
})
export class LandingTitleComponent {
  readonly pageTitle = new PageTitle(
    "Jan's Engineering Blog",
    "Writing software requires passion, skill, and a considerable amount of time. However, time is our most limited resource, so let's explore techniques helping us to craft great software faster.",
    PageTitleBackground.LANDING
  );

  constructor(private readonly router: Router) {}

  startReading(): void {
    this.router.navigate([`engineering/efficient-terminal-setup`]);
  }
}
