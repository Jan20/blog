import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { screen } from '@testing-library/angular';
import { PageTitle, PageTitleBackground } from '../models/page-title';
import { PageTitleComponent } from './page-title.component';
import '@testing-library/jasmine-dom';

let component: PageTitleComponent;
let fixture: ComponentFixture<PageTitleComponent>;

const PAGE_TITLE = new PageTitle(
  'Guides',
  'Over the years, I have encountered a rather vast array of technical challenges. Thus, I would like to share some of them that have not yet been exclusively covered elsewhere or deserve further explanation.',
  PageTitleBackground.GUIDES
);

@Component({
  template: `<app-page-title [pageTitle]="pageTitle"></app-page-title>`,
  standalone: false,
})
class TestHostComponent {
  public readonly pageTitle = PAGE_TITLE;
}

const compileComponent = (): void => {
  TestBed.configureTestingModule({
    declarations: [TestHostComponent],
    imports: [
      CommonModule,
      MatCardModule,
      MatButtonModule,
      MatRippleModule,
      PageTitleComponent,
      NoopAnimationsModule,
    ],
    providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    teardown: { destroyAfterEach: false },
  }).compileComponents();
};

describe('PageTitleComponent:', () => {
  beforeEach(async () => {
    compileComponent();
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a page title component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct page title', () => {
    fixture.detectChanges();
    expect(screen.getByText('Guides').textContent).toBe('Guides');
  });

  it('should bind the input property correctly', () => {
    const pageTitleComponent: PageTitleComponent =
      fixture.debugElement.children[0].componentInstance;
    expect(pageTitleComponent.pageTitle).toEqual(PAGE_TITLE);
  });
});
