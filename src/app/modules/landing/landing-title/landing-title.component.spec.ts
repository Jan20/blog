import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { PostListComponent } from 'src/app/components/post-list/post-list.component';
import { LandingTitleComponent } from './landing-title.component';
import { MatButtonModule } from '@angular/material/button';

let component: LandingTitleComponent;
let fixture: ComponentFixture<LandingTitleComponent>;

const router = jasmine.createSpyObj<Router>('Router', ['navigate']);
router.navigate.and.returnValue(Promise.resolve(true));

const compileComponent = (): void => {
  TestBed.configureTestingModule({
    declarations: [LandingTitleComponent],
    imports: [
      NoopAnimationsModule,
      MatIconModule,
      MatMenuModule,
      MatButtonModule,
      MatCardModule,
      MatGridListModule,
      PostListComponent,
      RouterTestingModule,
    ],
    providers: [
      { provide: Router, useValue: router },
      { provide: ComponentFixtureAutoDetect, useValue: true },
    ],
    teardown: { destroyAfterEach: false },
  }).compileComponents();
};

describe('TitleComponent', () => {
  beforeEach(async () => {
    await compileComponent();
    fixture = TestBed.createComponent(LandingTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create landing title component', () => {
    expect(component).toBeTruthy();
  });

  it('should show the page title', fakeAsync(() => {
    tick(1);
    fixture.detectChanges();
    expect(screen.getByText("Jan's Engineering Blog").textContent).toBe(
      " Jan's Engineering Blog "
    );
  }));

  it('should navigate to embracing the terminal', fakeAsync(() => {
    userEvent.click(screen.getByRole('button', { name: 'Start Reading' }));
    tick(1);
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith([
      'engineering/embracing-the-terminal',
    ]);
  }));
});
