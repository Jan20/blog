import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LinksComponent } from './links.component';
import { screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { Window } from 'src/app/providers/window.provider';

let component: LinksComponent;
let fixture: ComponentFixture<LinksComponent>;

const windowSpy = jasmine.createSpyObj('Window', ['open']);
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
windowSpy.open.and.returnValue(undefined);

const compileComponent = (): void => {
  TestBed.configureTestingModule({
    declarations: [],
    imports: [LinksComponent, MatCardModule, MatIconModule],
    providers: [
      { provide: Window, useValue: windowSpy },
      { provide: ComponentFixtureAutoDetect, useValue: true },
    ],
    teardown: { destroyAfterEach: false },
  }).compileComponents();
};

describe('LinksComponent', () => {
  beforeEach(async () => {
    compileComponent();

    fixture = TestBed.createComponent(LinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a link component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to LinkedIn', fakeAsync(() => {
    userEvent.click(
      screen.getByRole('button', {
        name: 'Link to assets/images/links/github.png Github',
      })
    );
    tick(1);
    fixture.detectChanges();
    expect(windowSpy.open).toHaveBeenCalledOnceWith(
      'https://github.com/Jan20',
      '_blank'
    );
  }));
});
