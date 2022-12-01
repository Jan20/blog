import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../models/post';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss'],
})
export class SeriesComponent implements OnInit {
  public seriesTitles: Set<string> = new Set();
  public series: Map<string, Post[]> = new Map();

  constructor(
    private readonly blogService: BlogService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.seriesTitles = this.blogService.getSeriesTitles();
    this.seriesTitles.forEach((title: string) => this.fetchSeries(title));
  }

  public showPost(link: string): void {
    const filePath = link.replace('/assets/posts', '');
    this.router.navigate([`blog/${filePath}`]);
  }

  private fetchSeries(series: string): void {
    this.series.set(
      series,
      this.blogService
        .getSeries(series)
        .sort((post1, post2) => post1.seriesSection - post2.seriesSection)
    );
  }
}
