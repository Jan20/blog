import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent {
  constructor(private readonly router: Router) {}

  public navigateToTopic(topic: string): void {
    this.router.navigate([`blog/${topic}`]);
  }
}
