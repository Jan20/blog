import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LinksComponent } from './links.component';

let component: LinksComponent;
let fixture: ComponentFixture<LinksComponent>;

const compileComponent = (): void => {
  TestBed.configureTestingModule({
    declarations: [],
    imports: [LinksComponent, MatCardModule, MatIconModule],
    providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
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
});
