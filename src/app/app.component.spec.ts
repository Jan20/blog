import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';

const compileComponent = (): void => {
  TestBed.configureTestingModule({
    declarations: [],
    imports: [AppComponent, RouterTestingModule, CommonModule],
    providers: [],
    teardown: { destroyAfterEach: false },
  }).compileComponents();
};

describe('AppComponent', () => {
  beforeEach(async () => {
    await compileComponent();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
