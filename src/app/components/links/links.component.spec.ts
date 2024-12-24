import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LinksComponent } from './links.component';
import { screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { NavigationService } from 'src/app/modules/shared/services/navigation.service';

let component: LinksComponent;
let fixture: ComponentFixture<LinksComponent>;

const navigationService = jasmine.createSpyObj<NavigationService>(
  'NavigationService',
  ['openUrl']
);
navigationService.openUrl.and.returnValue();

const compileComponent = (): void => {
  TestBed.configureTestingModule({
    declarations: [],
    imports: [LinksComponent, MatCardModule, MatIconModule],
    providers: [
      { provide: NavigationService, useValue: navigationService },
      { provide: ComponentFixtureAutoDetect, useValue: true },
    ],
    teardown: { destroyAfterEach: false },
  }).compileComponents();
};

describe('LinksComponent', () => {
  beforeEach(async () => {
    navigationService.openUrl.calls.reset();
    compileComponent();
    fixture = TestBed.createComponent(LinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a link component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to Github', fakeAsync(() => {
    userEvent.click(
      screen.getByRole('heading', {
        name: 'Link to assets/images/links/github.png Github',
      })
    );
    tick(1);
    fixture.detectChanges();
    expect(navigationService.openUrl).toHaveBeenCalledOnceWith(
      'https://github.com/Jan20'
    );
    tick(1);
    fixture.detectChanges();
    flush();
  }));
});
